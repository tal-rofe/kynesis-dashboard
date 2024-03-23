import { z } from 'zod';

const RequestBodySchema = z.object({
	email: z
		.string({ required_error: '"email" key is missing', invalid_type_error: '"email" key must be "string"' })
		.email({ message: '"email" key must be valid email' }),
});

export default RequestBodySchema;
