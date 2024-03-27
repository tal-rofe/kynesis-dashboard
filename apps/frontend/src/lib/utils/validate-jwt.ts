import jwt from 'jsonwebtoken';

/**
 * Validates a JWT (JSON Web Token).
 *
 * This function decodes the provided JWT and checks if it is valid. A JWT is considered valid if:
 * 1. It is not null.
 * 2. It contains an 'exp' (expiration time) field which is a number.
 * 3. The expiration time is in the future (i.e., it has not expired).
 *
 * @param {string | null} token - The JWT to be validated. Can be a string or null.
 * @returns {boolean} - Returns `true` if the JWT is valid, `false` otherwise.
 */
export const validateJWT = (token: string | null): boolean => {
	if (!token) return false;

	const decodedToken = jwt.decode(token);

	if (typeof decodedToken === 'object' && decodedToken !== null && 'exp' in decodedToken) {
		const exp = decodedToken['exp'];

		if (typeof exp === 'number') {
			const currentUnixTime = Math.floor(Date.now() / 1000);

			return exp > currentUnixTime;
		}
	}

	return false;
};
