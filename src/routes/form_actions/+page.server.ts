import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	addProductToCart: async ({ locals: { honoClient }, request }) => {
		const formData = Object.fromEntries(await request.formData()) as unknown as {
			userId: string;
			productId: string;
		};

		const res = await honoClient.api.cart.$post({
			form: formData
		});

		const data = await res.json();

		if (!data.success) {
			return fail(res.status, data);
		}
		return data;
	}
};
