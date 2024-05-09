import { DynamoDBClient, ScanCommand } from '@aws-sdk/client-dynamodb';

import type { SheetUpdateData } from '../types/spreadsheet';
import { DYNAMODB_MAX_ATTEMPTS } from '../constants/dynamodb';

const dynamoDbClient = new DynamoDBClient({ region: process.env.AWS_REGION, maxAttempts: DYNAMODB_MAX_ATTEMPTS });

export const fetchVisitorsFromDB = async (): Promise<SheetUpdateData[]> => {
	const command = new ScanCommand({
		TableName: process.env.DYNAMODB_TABLE_NAME,
	});

	const data = await dynamoDbClient.send(command);
	const items = data.Items || [];

	const values: (string | number)[][] = items.map((item) => [
		item['originDomain']?.S || '',
		item['email']?.S || '',
		item['md5Email']?.S || '',
		item['firstName']?.S || '',
		item['lastName']?.S || '',
	]);

	return [
		{
			range: 'Sheet1', // * Update the entire sheet starting from the first row
			values: values,
		},
	];
};
