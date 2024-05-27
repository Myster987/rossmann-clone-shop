import { Hono } from 'hono';
import { z } from 'zod';
import { zValidator } from '@hono/zod-validator';
import { basicQueryParams } from '../validation';
import {
	checkIfProductExistsInFavorite,
	deleteProductFromFavorite,
	insertProductToFavorite,
	queryUserFavoriteProducts
} from '@/db/queries';

const postFavoriteProduct = z.object({
	userId: z.string().min(1).trim(),
	productId: z.string().min(1).trim()
});

export const favoriteRoute = new Hono()
	.get(
		'/:userId',
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
				const { userId } = c.req.param();
				const { limit, offset } = c.req.valid('query');
				const data = await queryUserFavoriteProducts.all({ userId, limit, offset });
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
	.post(
		'/',
		zValidator('form', postFavoriteProduct, (result, c) => {
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
				const { userId, productId } = c.req.valid('form');

				const exists = await checkIfProductExistsInFavorite.get({ userId, productId });
				if (exists?.id) {
					return c.json({ success: false, message: 'Produkt już jest w ulubionych.' }, 409);
				}

				const res = await insertProductToFavorite.get({ userId, productId });
				if (!res) {
					throw Error(
						`Something went wrong when inserting product (id: ${productId}) to user's favorite (id: ${userId})`
					);
				}

				return c.json({
					success: true,
					message: 'Dodano produkt do ulubionych.'
				});
			} catch (error) {
				console.log(c.req.path, error);
				return c.json(
					{
						success: false,
						message: 'Coś poszło nie tak.'
					},
					500
				);
			}
		}
	)
	.delete('/:favoriteId', async (c) => {
		try {
			const { favoriteId } = c.req.param();

			const res = await deleteProductFromFavorite.get({ id: favoriteId });

			if (!res) {
				throw Error(
					`Something went wrong when deleting product from favorite (favoriteId: ${favoriteId})`
				);
			}

			return c.json({
				success: true
			});
		} catch (error) {
			console.log(c.req.path, error);
			return c.json(
				{
					success: false
				},
				500
			);
		}
	});
