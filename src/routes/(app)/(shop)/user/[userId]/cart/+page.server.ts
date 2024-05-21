import type { PageServerLoad } from './$types';

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
