import { createAppAuth } from '@octokit/auth-app';
import { Octokit } from '@octokit/rest';

export const getStargazerData = async (githubAppInstallationId: number, username: string) => {
	const octokit = new Octokit({
		authStrategy: createAppAuth,
		auth: {
			appId: process.env.GITHUB_APP_ID,
			privateKey: process.env.GITHUB_APP_PRIVATE_KEY,
			installationId: githubAppInstallationId,
		},
	});

	const stargazerDataResponse = await octokit.users.getByUsername({
		username,
	});

	let firstName: string | null = null;
	let lastName: string | null = null;

	if (stargazerDataResponse.data.name) {
		const splittedName = stargazerDataResponse.data.name.split(' ');

		if (splittedName.length > 1) {
			firstName = splittedName[0]!;
			lastName = splittedName.slice(1).join(' ');
		} else {
			firstName = stargazerDataResponse.data.name;
		}
	}

	let companyName: string | null = null;

	if (stargazerDataResponse.data.company) {
		companyName = stargazerDataResponse.data.company.replace('@', '');
	}

	return {
		email: stargazerDataResponse.data.email,
		firstName,
		lastName,
		companyName,
		location: stargazerDataResponse.data.location,
		githubUsername: username,
	};
};

export const getInstalledRepositoryWebsiteDomain = async (githubAppInstallationId: number, organizationName: string) => {
	const octokit = new Octokit({
		authStrategy: createAppAuth,
		auth: {
			appId: process.env.GITHUB_APP_ID,
			privateKey: process.env.GITHUB_APP_PRIVATE_KEY,
			installationId: githubAppInstallationId,
		},
	});

	const organizationDataResponse = await octokit.orgs.get({
		org: organizationName,
	});

	let organizationUrl = organizationDataResponse.data.blog;

	if (!organizationUrl) {
		return null;
	}

	if (!organizationUrl.startsWith('https://') || !organizationUrl.startsWith('http://')) {
		organizationUrl = `https://${organizationUrl}`;
	}

	try {
		const organizationUrlObject = new URL(organizationUrl);

		return organizationUrlObject.hostname.replace('www.', '');
	} catch {
		return null;
	}
};
