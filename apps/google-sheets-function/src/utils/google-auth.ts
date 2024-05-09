import { GoogleAuth } from 'google-auth-library';

/**
 * Creates and returns a GoogleAuth instance configured with environment-specific credentials.
 * This instance can be used to authenticate requests to Google APIs.
 *
 * Environment Variables:
 * - GOOGLE_SERVICE_CLIENT_EMAIL: This is the email address associated with the Google Service Account.
 *   It is used to identify the service account to Google's OAuth 2.0 server.
 *   Service accounts are special types of Google accounts that belong to your application or a virtual machine,
 *   rather than to an individual end user. Your application assumes the identity of the service account
 *   to call Google APIs, so that the users aren't directly involved.
 *
 * - GOOGLE_SERVICE_PRIVATE_KEY: The private key generated for the Google Service Account.
 *   This key is essential for creating a secure connection between your application and Google's services.
 *   It must be kept secure and should not be shared.
 *
 * @return {GoogleAuth} An instance of GoogleAuth configured with service account credentials.
 */
export const getGoogleAuth = (): GoogleAuth => {
	const auth = new GoogleAuth({
		credentials: {
			client_email: process.env.GOOGLE_SERVICE_CLIENT_EMAIL,
			private_key: process.env.GOOGLE_SERVICE_PRIVATE_KEY.replace(/\\n/g, '\n'),
		},
		scopes: ['https://www.googleapis.com/auth/spreadsheets', 'https://www.googleapis.com/auth/drive'],
	});

	return auth;
};
