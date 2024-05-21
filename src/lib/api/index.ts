import { Hono } from 'hono';
import { productsRoute, cartRoute } from './routes';
import { logger } from 'hono/logger';

export const api = new Hono()
	.basePath('/api')
	.use(logger())
	.get('/', (c) => c.text('Hello World!'))
	.route('/products', productsRoute)
	.route('/cart', cartRoute);

export type Api = typeof api;