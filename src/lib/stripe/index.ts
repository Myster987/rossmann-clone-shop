import Stripe from 'stripe';
import { SECRET_STRIPE_API_KEY } from '$env/static/private';

export const stripe = new Stripe(SECRET_STRIPE_API_KEY, {
	apiVersion: '2024-04-10',
	typescript: true
});
