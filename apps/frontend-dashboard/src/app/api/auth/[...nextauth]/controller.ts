import type { NextAuthOptions, Session } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import type { JWT } from 'next-auth/jwt';

import type { ExtendedJwt, ExtendedSession } from '@/lib/types/api/auth';
import { encrypt } from '@/lib/utils/encrypt';
import { OAUTH_GOOGLE_URL } from '@/lib/data/consts/auth';

/**
 * Refreshes the Google OAuth access token using a provided refresh token.
 *
 * This function attempts to refresh the Google OAuth access token by making
 * a POST request to Google's token refresh endpoint. It requires the current
 * token details, including the refresh token, to make the request. If the
 * refresh is successful, it returns an object containing the new access token,
 * its expiration timestamp, and the refresh token (either a new one or the
 * original, if a new one isn't provided by Google)
 *
 * @param {ExtendedJwt} currentTokenDetails - The current token details object, which must include a refresh token.
 * @returns {Promise<ExtendedJwt>} A promise that resolves to an object containing the new access token details,
 * or an error if the refresh attempt fails or if a refresh token is not provided.
 */
async function refreshGoogleAuthAccessToken(currentToken: ExtendedJwt): Promise<ExtendedJwt> {
	try {
		if (!currentToken.refreshToken) {
			return {
				...currentToken,
				error: 'RefreshTokenMissingError',
			};
		}

		const googleOAuthEndpoint =
			OAUTH_GOOGLE_URL +
			new URLSearchParams({
				client_id: process.env.GOOGLE_CLIENT_ID,
				client_secret: process.env.GOOGLE_CLIENT_SECRET,
				grant_type: 'refresh_token',
				refresh_token: currentToken.refreshToken,
			});

		const googleOAuthResponse = await fetch(googleOAuthEndpoint, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
		});

		const refreshedTokens = await googleOAuthResponse.json();

		if (!googleOAuthResponse.ok) throw refreshedTokens;

		return {
			...currentToken,
			accessToken: refreshedTokens.access_token,
			accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
			refreshToken: refreshedTokens.refresh_token ?? currentToken.refreshToken,
		};
	} catch (_error) {
		return {
			...currentToken,
			error: 'RefreshAccessTokenError',
		};
	}
}

export const authOptions: NextAuthOptions = {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			authorization: { params: { access_type: 'offline', prompt: 'consent' } },
		}),
	],
	secret: process.env.NEXTAUTH_SECRET,
	callbacks: {
		async jwt({ token, account, user }) {
			const isSignedIn = !!user;
			const newToken = token as ExtendedJwt;

			if (isSignedIn) {
				newToken.accessToken = account?.access_token;
				newToken.accessTokenExpires = Date.now() + (account?.expires_at || 0) * 1000;
				newToken.refreshToken = account?.refresh_token;
				newToken.user = user;

				if (user.id) {
					const encryptionKey = process.env.ENCRYPTION_KEY;

					try {
						const encryptedUserId = await encrypt(user.id.toString(), encryptionKey);

						const encryptedUserIdBase64 = Buffer.from(`${encryptedUserId.iv}:${encryptedUserId.encryptedData}`).toString('base64');

						newToken.userIdEncryptionHeader = encryptedUserIdBase64;
					} catch (error) {
						newToken.userIdEncryptionHeader = 'EncryptionError';
					}
				}
			}

			// Return previous token if the access token has not expired yet
			if (Date.now() < (newToken.accessTokenExpires || 0)) return newToken;

			// Access token has expired, try to update it
			return refreshGoogleAuthAccessToken(newToken);
		},
		session({ session, token }: { session: Session; token: JWT }): ExtendedSession {
			const extendedToken = token as ExtendedJwt;
			const extendedSession = session as ExtendedSession;

			extendedSession.user = extendedToken.user;
			extendedSession.accessToken = extendedToken.accessToken;

			if (extendedToken.userIdEncryptionHeader) {
				extendedSession.userIdEncryptionHeader = extendedToken.userIdEncryptionHeader;
			}

			return extendedSession;
		},
	},
};
