import { Hono } from 'hono';
import { productsRoute, cartRoute, favoriteRoute, checkoutRoute, ordersRoute } from './routes';
import { logger } from 'hono/logger';

export const api = new Hono()
	.basePath('/api')
	.use(logger())
	.get('/', (c) => c.text('Hello World!'))
	.route('/products', productsRoute)
	.route('/cart', cartRoute)
	.route('/favorite', favoriteRoute)
	.route('/checkout', checkoutRoute)
	.route('/orders', ordersRoute);

export type Api = typeof api;
