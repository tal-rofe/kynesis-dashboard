// lib/middleware/validateMiddleware.ts
import type { NextRequest } from 'next/server';
import { type AnyObject, type ObjectSchema, ValidationError } from 'yup';

import { HttpError } from '../utils/http-error';

export const validateMiddleware = (schema: ObjectSchema<AnyObject>) => {
	return async (req: NextRequest) => {
		const body = await req.json();

		try {
			await schema.validate(body, {
				abortEarly: false, // Collect all errors, not just the first one
				stripUnknown: true, // Remove unknown keys from the validated data
			});
		} catch (error) {
			if (error instanceof ValidationError) {
				throw new HttpError(400, { status: 'error', errors: error.errors });
			} else {
				throw new HttpError(500, { status: 'error', message: 'Something went wrong during the validation process.' });
			}
		}
	};
};
