import type { PixelApiRequestBodySchema } from '@kynesis/common-functions-types';

export type SqsBody = PixelApiRequestBodySchema & { apiIndex: number; originDomain: string };
