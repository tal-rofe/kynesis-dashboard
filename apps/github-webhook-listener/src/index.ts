import crypto from 'node:crypto';

import type { APIGatewayProxyHandler } from 'aws-lambda';
import { parse } from 'node-html-parser';

import LoggerService from '@kynesis/lambda-logger';
import ErrorCode from '@kynesis/error-codes';

import { StarDataSchema } from './schemas/star-data';
import { getInstalledRepositoryWebsiteDomain, getStargazerData } from './helpers/github';
import { upsertStarringStargazer, upsertVisitorDomain } from './services/database';

// * Valid request will be fired from GitHub and not from arbitrary user, so status code will be arbitrary as well
export const handler: APIGatewayProxyHandler = async (event, context) => {
	const logger = new LoggerService(context.awsRequestId);

	// * Catch runtime errors only, so function code won't be exposed to end user (as AWS does for runtime errors)
	try {
		const githubSignatureHeader = event.headers['x-hub-signature-256'];

		if (!githubSignatureHeader) {
			logger.error('Missing signature header', { errorCode: ErrorCode.GITHUB_WEBHOOK_LISTENER_MISSING_SIGNATURE_HEADER });

			return {
				statusCode: 500,
				body: JSON.stringify({ message: 'Failure' }),
				headers: {
					'Content-Type': 'application/json',
				},
			};
		}

		const requestBody = event.body;

		logger.info('Start processing request', { requestBody });

		if (!requestBody) {
			logger.error('Missing request body, abort', { errorCode: ErrorCode.GITHUB_WEBHOOK_LISTENER_MISSING_BODY });

			return {
				statusCode: 500,
				body: JSON.stringify({ message: 'Failure' }),
				headers: {
					'Content-Type': 'application/json',
				},
			};
		}

		const signature = crypto.createHmac('sha256', process.env.GH_APP_WEBHOOK_SECRET).update(requestBody).digest('hex');
		const trusted = Buffer.from(`sha256=${signature}`, 'ascii');
		const untrusted = Buffer.from(githubSignatureHeader, 'ascii');
		const isFiredByGithub = crypto.timingSafeEqual(trusted, untrusted);

		if (!isFiredByGithub) {
			logger.error('Failed to trust signature', { errorCode: ErrorCode.GITHUB_WEBHOOK_LISTENER_INVALID_SIGNATURE });

			return {
				statusCode: 500,
				body: JSON.stringify({ message: 'Failure' }),
				headers: {
					'Content-Type': 'application/json',
				},
			};
		}

		const parsedRequestBody = JSON.parse(requestBody);

		const validatedRequestBody = await StarDataSchema.safeParseAsync(parsedRequestBody);

		if (!validatedRequestBody.success) {
			logger.error('Failed to parse request body', {
				errorCode: ErrorCode.GITHUB_WEBHOOK_LISTENER_INCOMING_DATA_INVALID,
				error: validatedRequestBody.error.message,
			});

			return {
				statusCode: 500,
				body: JSON.stringify({ message: 'Failure' }),
				headers: {
					'Content-Type': 'application/json',
				},
			};
		}

		const webhookPayload = validatedRequestBody.data;

		let stargazerData: Awaited<ReturnType<typeof getStargazerData>>;

		try {
			stargazerData = await getStargazerData(webhookPayload.installation.id, webhookPayload.sender.login);
		} catch (error) {
			logger.error('Failed to get user data', { errorCode: ErrorCode.GITHUB_API_STARGAZER_DATA, error });

			return {
				statusCode: 500,
				body: JSON.stringify({ message: 'Failure' }),
				headers: {
					'Content-Type': 'application/json',
				},
			};
		}

		if (!stargazerData.email) {
			logger.error('Missing email of stargazer', { errorCode: ErrorCode.GITHUB_WEBHOOK_LISTENER_MISSING_STARGAZER_EMAIL });

			return {
				statusCode: 500,
				body: JSON.stringify({ message: 'Failure' }),
				headers: {
					'Content-Type': 'application/json',
				},
			};
		}

		let linkedinUrl: string | null;

		try {
			const userPageHtmlResponse = await fetch(`https://github.com/${stargazerData.githubUsername}`);
			const userPageHtmlString = await userPageHtmlResponse.text();
			const dom = parse(userPageHtmlString);
			const linkedinUrlElement = dom.querySelector('a[href*="https://www.linkedin.com/in/"]');

			linkedinUrl = linkedinUrlElement?.getAttribute('href') ?? null;
		} catch (error) {
			logger.warn('Failed to get stargazer HTML page because of an error', {
				githubUsername: stargazerData.githubUsername,
				error,
				errorCode: ErrorCode.GITHUB_SCRAPE_USER_PAGE,
			});

			linkedinUrl = null;
		}

		let visitorId: string;

		try {
			const upsertResult = await upsertStarringStargazer(stargazerData.email, stargazerData, linkedinUrl);

			visitorId = upsertResult.id;
		} catch (error) {
			logger.error('Failed to upsert starring stargazer in database', { errorCode: ErrorCode.UPSERT_DB, error });

			return {
				statusCode: 500,
				body: JSON.stringify({ message: 'Failure' }),
				headers: {
					'Content-Type': 'application/json',
				},
			};
		}

		let installedRepositoryWebsiteDomain: Awaited<ReturnType<typeof getInstalledRepositoryWebsiteDomain>>;

		try {
			installedRepositoryWebsiteDomain = await getInstalledRepositoryWebsiteDomain(
				webhookPayload.installation.id,
				webhookPayload.organization.login,
			);
		} catch (error) {
			logger.warn('Failed to get repository owner website domain', {
				errorCode: ErrorCode.GITHUB_WEBHOOK_LISTENER_GET_ORGANIZATION_DOMAIN,
				error,
			});

			return {
				statusCode: 500,
				body: JSON.stringify({ message: 'Failure' }),
				headers: {
					'Content-Type': 'application/json',
				},
			};
		}

		if (!installedRepositoryWebsiteDomain) {
			logger.warn('Missing repository website domain, cannot upsert to VisitorDomain', {
				errorCode: ErrorCode.GITHUB_WEBHOOK_LISTENER_GET_ORGANIZATION_DOMAIN,
			});

			return {
				statusCode: 500,
				body: JSON.stringify({ message: 'Failure' }),
				headers: {
					'Content-Type': 'application/json',
				},
			};
		}

		try {
			await upsertVisitorDomain(installedRepositoryWebsiteDomain, visitorId, webhookPayload.repository.full_name, webhookPayload.starred_at);
		} catch (error) {
			logger.warn('Failed to upsert to VisitorDomain', { errorCode: ErrorCode.UPSERT_DB, error });

			return {
				statusCode: 500,
				body: JSON.stringify({ message: 'Failure' }),
				headers: {
					'Content-Type': 'application/json',
				},
			};
		}

		return {
			statusCode: 200,
			body: JSON.stringify({ message: 'Success' }),
			headers: {
				'Content-Type': 'application/json',
			},
		};
	} catch (error: unknown) {
		logger.error('Run time error', { errorCode: ErrorCode.GITHUB_WEBHOOK_LISTENER_RUNTIME, error });

		return {
			statusCode: 500,
			body: JSON.stringify({ message: 'Failure' }),
			headers: {
				'Content-Type': 'application/json',
			},
		};
	}
};
