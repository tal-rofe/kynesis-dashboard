import { PrismaClient } from '@prisma/client';
import type { SheetUpdateData } from 'src/types/spreadsheet';

const prismaClient = new PrismaClient();

export const fetchVisitorsFromDB = async (): Promise<SheetUpdateData[]> => {
	const visitors = await prismaClient.visitor.findMany({
		select: {
			email: true,
			firstName: true,
			lastName: true,
		},
	});

	const values: (string | number)[][] = visitors.map((visitor) => [visitor.email || '', visitor.firstName || '', visitor.lastName || '']);

	return [
		{
			range: 'Sheet1', // * Update the entire sheet starting from the first row
			values: values,
		},
	];
};
