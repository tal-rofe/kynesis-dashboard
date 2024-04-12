import fs from 'node:fs';
import readline from 'node:readline';

export const readByLine = (filePath: string, handler: (line: string) => Promise<void>) => {
	const fileStream = fs.createReadStream(filePath);

	const lineReader = readline.createInterface({
		input: fileStream,
		crlfDelay: Infinity,
	});

	return new Promise((resolve) => {
		lineReader.on('line', handler);
		lineReader.on('close', resolve);
	});
};
