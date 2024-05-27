import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals: { honoClient } }) => {
	const res = await honoClient.api.products.categories.$get();
	const { data } = (await res.json()) || [];

	return {
		categories: data
	};
};
