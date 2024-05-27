import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params: { userId }, locals: { honoClient } }) => {
	const fetchUsersCart = async () => {
		const res = await honoClient.api.cart[':userId'].$get({
			param: {
				userId
			}
		});
		const { data } = await res.json();
		return data || [];
	};

	return {
		streamed: {
			productsInCart: fetchUsersCart()
		}
	};
};

export const actions: Actions = {
	deleteProductFromCart: async ({ locals: { honoClient }, request }) => {
		const formData = Object.fromEntries(await request.formData()) as unknown as { cartId: string };

		const res = await honoClient.api.cart[':cartId'].$delete({ param: formData });
		const { success } = await res.json();

		if (!success) {
			return fail(res.status, { success });
		}

		return {
			success
		};
	}
};
