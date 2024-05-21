import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals: { honoClient } }) => {
	const fetchFeaturedProducts = async () => {
		const res = await honoClient.api.products.featured.$get();
		const data = await res.json();
		return data?.data || [];
	};

	return {
		streamed: {
			products: fetchFeaturedProducts()
		}
	};
};
