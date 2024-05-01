import { GoogleAuth } from 'google-auth-library';

/**
 * Creates and returns a GoogleAuth instance configured with environment-specific credentials.
 * This instance can be used to authenticate requests to Google APIs.
 *
 * @return {GoogleAuth} An instance of GoogleAuth configured with service account credentials.
 */
export const getGoogleAuth = (): GoogleAuth => {
	const auth = new GoogleAuth({
		credentials: {
			client_email: process.env.GOOGLE_SERVICE_CLIENT_EMAIL,
			private_key: process.env.GOOGLE_SERVICE_PRIVATE_KEY.replace(/\\n/g, '\n'), // Correctly format newlines for private key
		},
		scopes: ['https://www.googleapis.com/auth/spreadsheets', 'https://www.googleapis.com/auth/drive'],
	});

	return auth;
};
