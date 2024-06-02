import { Hono } from 'hono';
import { deleteOrder } from '@/db/queries';

export const ordersRoute = new Hono().delete('/:orderId', async (c) => {
	try {
		const { orderId } = c.req.param();

		await deleteOrder.get({ orderId });

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
