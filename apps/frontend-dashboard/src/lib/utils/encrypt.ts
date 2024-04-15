import crypto from 'node:crypto';
import { promisify } from 'node:util';

const scryptAsync = promisify(crypto.scrypt);

export const encrypt = async (text: string, secretKey: string) => {
	// Generate key using scrypt asynchronously
	const key = (await scryptAsync(secretKey, 'salt', 32)) as Buffer;
	const iv = crypto.randomBytes(16);

	// Create a cipher instance with the algorithm, key, and iv
	const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);

	// Encrypt the text
	let encrypted = cipher.update(text, 'utf8', 'hex');

	encrypted += cipher.final('hex');

	// Return the iv along with the encrypted data for decryption purposes
	return { iv: iv.toString('hex'), encryptedData: encrypted };
};
