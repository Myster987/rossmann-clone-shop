import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { honoClient }, params: { userId } }) => {
	const fetchFavoriteProducts = async () => {
		const res = await honoClient.api.favorite[':userId'].$get({
			param: {
				userId
			}
		});
		const { data } = await res.json();
		return data || [];
	};

	return {
		streamed: {
			favoriteProducts: fetchFavoriteProducts()
		}
	};
};

export const actions: Actions = {
	deleteProductFromFavorite: async ({ locals: { honoClient }, request }) => {
		const formData = Object.fromEntries(await request.formData()) as unknown as {
			favoriteId: string;
		};

		const res = await honoClient.api.favorite[':favoriteId'].$delete({ param: formData });
		const { success } = await res.json();

		if (!success) {
			return fail(res.status, { success });
		}

		return {
			success
		};
	}
};
