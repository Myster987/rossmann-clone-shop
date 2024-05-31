import { PUBLIC_SHOP_URL } from '$env/static/public';
import { Hono } from 'hono';
import { generateId } from 'lucia';
import { z } from 'zod';
import { zValidator } from '@hono/zod-validator';
import { insertMultipleOrderProducts, insertOrder } from '@/db/queries';
import { stripe } from '@/stripe';
import type { Stripe } from 'stripe';
import { db } from '@/db';
import { inArray } from 'drizzle-orm';
import * as schema from '@/db/schema';

const postCheckoutSchema = z.object({
	userId: z.string(),
	productIds: z.string().array()
});

export const checkoutRoute = new Hono().post(
	'/',
	zValidator('json', postCheckoutSchema, (result, c) => {
		if (!result.success) {
			return c.json(
				{
					success: false,
					url: null
				},
				400
			);
		}
	}),
	async (c) => {
		try {
			const { productIds, userId } = c.req.valid('json');

			const products = await db.query.products.findMany({
				where: inArray(schema.products.id, productIds)
			});
			console.log(products);

			const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

			products.forEach((product) => {
				line_items.push({
					quantity: 1,
					price_data: {
						currency: 'PLN',
						product_data: {
							name: product.name
						},
						unit_amount: product.price * 100
					}
				});
			});

			console.log(line_items);

			const orderId = generateId(20);
			const orderInsertion = await insertOrder.get({ id: orderId, userId });
			if (!orderInsertion) {
				throw Error(`Something went wrong when inserting order`);
			}

			const res = await insertMultipleOrderProducts(
				products.map((val) => ({
					id: generateId(20),
					orderId,
					productId: val.id,
					companyId: val.companyId
				}))
			);
			if (!res) {
				throw Error(`Something went wrong when inserting order products`);
			}

			const session = await stripe.checkout.sessions.create({
				line_items,
				mode: 'payment',
				billing_address_collection: 'required',
				phone_number_collection: {
					enabled: true
				},
				success_url: `${PUBLIC_SHOP_URL}/user/${userId}/cart?success=1`,
				cancel_url: `${PUBLIC_SHOP_URL}/user/${userId}/cart?canceled=1&orderId=${orderId}`,
				metadata: {
					orderId
				}
			});

			return c.json({ url: session.url, success: true });
		} catch (error) {
			console.log(c.req.path, error);
			return c.json(
				{
					success: false,
					url: null
				},
				500
			);
		}
	}
);
