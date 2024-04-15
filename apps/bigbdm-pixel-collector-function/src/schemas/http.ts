import { z } from 'zod';

export const AccessTokenApiResponseSchema = z.object({
	access_token: z.string().min(1),
});

export const PixelDataItemSchema = z.object({
	pageData: z.tuple([z.object({ email: z.string().email() })]),
});

export const PixelDataResponseSchema = z
	.array(z.unknown())
	.transform((pixelItems) => pixelItems.filter((item) => PixelDataItemSchema.safeParse(item).success));
