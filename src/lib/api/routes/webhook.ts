import { SECRET_STRIPE_WEBHOOK } from '$env/static/private';
import Stripe from 'stripe';
import { stripe } from '@/stripe';
import { Hono } from 'hono';
import { eq } from 'drizzle-orm';
import { db } from '@/db';
import { orders, products } from '@/db/schema';
import { queryOrderProductsByOrderId } from '@/db/queries';
import { formatedTimestamp } from '@/utils';

export const webhookRoute = new Hono().post('/', async (c) => {
	try {
		const body = await c.req.text();
		const signature = c.req.header('Stripe-Signature') as string;

		let event: Stripe.Event;

		try {
			event = stripe.webhooks.constructEvent(body, signature, SECRET_STRIPE_WEBHOOK);
		} catch (error) {
			// @ts-expect-error It's fine but JS errors are not the best to deal with
			return c.text(`Webhook Error: ${error?.message}`, 400);
		}

		const session = event.data.object as Stripe.Checkout.Session;
		const address = session?.customer_details?.address;

		const adressComponents = [
			address?.line1,
			address?.line2,
			address?.city,
			address?.state,
			address?.postal_code,
			address?.country
		];

		const addressString = adressComponents.filter((c) => c !== null).join(', ');

		if (event.type == 'checkout.session.completed') {
			const orderId = session?.metadata?.orderId as string;
			await db
				.update(orders)
				.set({
					status: 'paid',
					address: addressString,
					phone: session.customer_details?.phone || '',
					fulfilledAt: formatedTimestamp()
				})
				.where(eq(orders.id, orderId));

			const productsToUpdate = await queryOrderProductsByOrderId.all({ orderId });

			await Promise.all(
				productsToUpdate.map((val) => {
					const newProduct: { quantity: number; archived?: number; featured?: number } = {
						quantity: val.product.quantity - val.quantity
					};
					console.log(newProduct);

					if (newProduct.quantity == 0) {
						newProduct.featured = 0;
						newProduct.archived = 1;
					}
					return db
						.update(products)
						.set({ ...newProduct })
						.where(eq(products.id, val.productId));
				})
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
