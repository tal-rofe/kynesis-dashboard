/**
 * Validates a JWT (JSON Web Token).
 *
 * This function checks if JWT token is valid. A JWT is considered valid if
 * the expiration time is in the future (i.e., it has not expired).
 *
 * @param {number} tokenExpiration - The token expiration time.
 * @returns {boolean} - Returns `true` if the JWT is valid, `false` otherwise.
 */
export const validateJwt = (tokenExpiration: number) => {
	if (Date.now() >= tokenExpiration * 1000) return false;

	return true;
};
