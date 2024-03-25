import type { SQSHandler } from 'aws-lambda';
import { SQSClient, SendMessageCommand } from '@aws-sdk/client-sqs';

import type { SqsBody } from './interfaces/sqs-body';
import { apisData } from './data/apis';
import { getEnrichedData } from './apis/vetric/vetric';

export const handler: SQSHandler = async (event) => {
	// * As the ownership of the SQS is Kynesis, it will have valid message body
	const messageBody = event.Records[0]!.body;
	const parsedMessageBody = JSON.parse(messageBody) as SqsBody;

	console.log(`Start processing SQS message with body: ${JSON.stringify(parsedMessageBody)}`);

	if (parsedMessageBody.apiIndex >= apisData.length) {
		console.log('Got invalid index to process, abort process');

		return;
	}

	const apiHandler = apisData[parsedMessageBody.apiIndex]!;
	let linkedinUrl: string;

	try {
		linkedinUrl = await apiHandler.getLinkedinUrl(parsedMessageBody);
	} catch (error: unknown) {
		console.log(`Failed to match Linkedin profile URL with pixel data, with an error: ${error}`);

		if (parsedMessageBody.apiIndex === apisData.length - 1) {
			console.log('Failed to match Linkedin profile URL using all APIs providers');

			return;
		}

		const sqsClient = new SQSClient({ region: process.env.AWS_REGION, maxAttempts: 2 });

		const sendMessageSqsCommand = new SendMessageCommand({
			QueueUrl: process.env.SQS_URL,
			MessageBody: JSON.stringify({ ...parsedMessageBody, apiIndex: parsedMessageBody.apiIndex + 1 }),
			MessageGroupId: parsedMessageBody.email,
		});

		try {
			await sqsClient.send(sendMessageSqsCommand);
		} catch (error: unknown) {
			console.log(`Failed to send SQS message with an error: ${error}`);

			return;
		}

		console.log('Successfully pushed message to SQS to be handled');

		return;
	}

	let enrichedData: Record<string, unknown>;

	try {
		enrichedData = await getEnrichedData(linkedinUrl);
	} catch (error) {
		console.log(`Failed to enrich data with an error: ${error}`);

		return;
	}

	console.log('Successfully enriched data for Linkedin Profile');

	// TODO: Remove it when using Zapier..
	void enrichedData;
};
