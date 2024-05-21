import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { getFeaturedProductQuerySchema } from '../validation';
import {
	queryAllCompanyProductsWithImages,
	queryFeaturedProductsWithImages,
	queryProductByIdWithImages,
	queryRelatedProductsWithImages
} from '@/db/queries';

export const withImagesProductsRoute = new Hono()
	.get(
		'/featured',
		zValidator('query', getFeaturedProductQuerySchema, (result, c) => {
			if (!result.success) {
				return c.json(
					{
						success: false
					},
					400
				);
			}
		}),
		async (c) => {
			try {
				const { limit, offset } = c.req.valid('query');
				const data = await queryFeaturedProductsWithImages.all({ limit, offset });
				return c.json({
					success: true,
					data
				});
			} catch (error) {
				console.log(c.req.path, error);
				return c.json(
					{
						success: false,
						data: null
					},
					500
				);
			}
		}
	)
	.get('/company/:companyId', async (c) => {
		try {
			const { companyId } = c.req.param();
			const data = await queryAllCompanyProductsWithImages.all({ companyId });
			return c.json({
				sucess: true,
				data
			});
		} catch (error) {
			console.log(c.req.path, error);
			return c.json(
				{
					success: false,
					data: null
				},
				500
			);
		}
	})
	.get('/related/:productId/:category', async (c) => {
		try {
			const { category, productId } = c.req.param();
			const data = await queryRelatedProductsWithImages.all({ category, productId });
			return c.json({
				success: true,
				data
			});
		} catch (error) {
			console.log(c.req.path, error);
			return c.json(
				{
					success: false,
					data: null
				},
				500
			);
		}
	})
	.get('/:productId', async (c) => {
		try {
			const { productId } = c.req.param();
			const data = await queryProductByIdWithImages.all({ id: productId });
			return c.json({
				success: true,
				data
			});
		} catch (error) {
			console.log(c.req.path, error);
			return c.json(
				{
					success: false,
					data: null
				},
				500
			);
		}
	});
