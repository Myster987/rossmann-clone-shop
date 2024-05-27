import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import {
	queryAllCompanyProducts,
	queryCategories,
	queryFeaturedProductsWithImages,
	queryProductById,
	queryProductsByName
} from '@/db/queries';
import { getFeaturedProductQuerySchema } from '../validation';
import { withImagesProductsRoute } from './withImagesProducts';

export const productsRoute = new Hono()
	.route('/withImages', withImagesProductsRoute)
	.get('/company/:companyId', async (c) => {
		try {
			const { companyId } = c.req.param();
			const data = await queryAllCompanyProducts.all({ companyId });
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
	.get('/categories', async (c) => {
		try {
			const data = await queryCategories.all();
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
	.get(
		'/byName/:name',
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
				const { name } = c.req.param();
				const { limit, offset } = c.req.valid('query');

				const data = await queryProductsByName(name, limit, offset);
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
	.get('/:productId', async (c) => {
		try {
			const { productId } = c.req.param();
			const data = await queryProductById.get({ id: productId });

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
