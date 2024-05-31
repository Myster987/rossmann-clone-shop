import { z } from 'zod';

export const basicQueryParams = z
	.object({
		limit: z.coerce.number().int().positive().default(100),
		offset: z.coerce.number().int().nonnegative().default(0)
	})
	.optional()
	.default({ limit: 100, offset: 0 });

export const customQueryParams = (limit = 100, offset = 0) =>
	z
		.object({
			limit: z.coerce.number().int().positive().default(limit),
			offset: z.coerce.number().int().nonnegative().default(offset)
		})
		.optional()
		.default({ limit, offset });

export const getFeaturedProductQuerySchema = z
	.object({
		limit: z.coerce.number().int().positive().default(100),
		offset: z.coerce.number().int().nonnegative().default(0)
	})
	.optional()
	.default({ limit: 100, offset: 0 });

export const getProductsByNameBodySchema = z.object({
	name: z.string().min(1).max(400).trim()
});
