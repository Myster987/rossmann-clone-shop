import { Hono } from 'hono';
import { z } from 'zod';
import { zValidator } from '@hono/zod-validator';
import { basicQueryParams } from '../validation';
import {
	checkIfProductExistsInCart,
	deleteAllUsersProductsFromCart,
	deleteProductFromUserCart,
	insertProductToUserCart,
	queryUserProductsInCart
} from '@/db/queries';

const postCartProduct = z.object({
	userId: z.string().min(1).trim(),
	productId: z.string().min(1).trim()
});

export const cartRoute = new Hono()
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
				const data = await queryUserProductsInCart.all({ userId, limit, offset });
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
		zValidator('form', postCartProduct, (result, c) => {
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

				const exists = await checkIfProductExistsInCart.get({ userId, productId });
				if (exists?.id) {
					return c.json({ success: false, message: 'Produkt już jest w koszyku.' }, 409);
				}

				const res = await insertProductToUserCart.get({ userId, productId });
				if (!res) {
					throw Error(
						`Something went wrong when inserting product (id: ${productId}) to user's car (id: ${userId})`
					);
				}

				return c.json({
					success: true,
					message: 'Dodano produkt do koszyka.'
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
	.delete('/all/:userId', async (c) => {
		try {
			const { userId } = c.req.param();

			const res = await deleteAllUsersProductsFromCart.all({ userId });

			if (!res) {
				throw Error(
					`Something went wrong when deleteing products form user's cart (userId: ${userId})`
				);
			}

			return c.json({ success: true });
		} catch (error) {
			console.log(c.req.path, error);
			return c.json(
				{
					success: false
				},
				500
			);
		}
	})
	.delete('/:cartId', async (c) => {
		try {
			const { cartId } = c.req.param();

			const res = await deleteProductFromUserCart.get({ id: cartId });

			if (!res) {
				throw Error(`Something went wrong when deleting product from cart (cartId: ${cartId})`);
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
