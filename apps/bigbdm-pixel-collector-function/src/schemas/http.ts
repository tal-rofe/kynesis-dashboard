import { z } from 'zod';

const PixelDataItemSchema = z.object({
	pageData: z.array(z.object({ email: z.string().email() })).min(1),
	path: z.string().optional(),
});

export const AccessTokenApiResponseSchema = z.object({
	access_token: z.string().min(1),
});

export const PixelDataResponseSchema = z
	.array(z.unknown())
	.transform((pixelItems) => pixelItems.filter((item): item is z.infer<typeof PixelDataItemSchema> => PixelDataItemSchema.safeParse(item).success));
