import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { basicQueryParams, customQueryParams } from '../validation';
import {
	queryAllCompanyProductsWithImages,
	queryFeaturedProductsWithImages,
	queryProductByIdWithImages,
	queryProductsByCategoryWithImages,
	queryRelatedProductsWithImages
} from '@/db/queries';

export const withImagesProductsRoute = new Hono()
	.get(
		'/category/:categoryName',
		zValidator('query', customQueryParams(150, 0), (result, c) => {
			if (!result.success) {
				return c.json({ success: false }, 400);
			}
		}),
		async (c) => {
			try {
				const { categoryName } = c.req.param();
				const { limit, offset } = c.req.valid('query');

				const data = (await queryProductsByCategoryWithImages).all({
					category: categoryName,
					limit,
					offset
				});
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
	.get(
		'/featured',
		zValidator('query', basicQueryParams, (result, c) => {
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
