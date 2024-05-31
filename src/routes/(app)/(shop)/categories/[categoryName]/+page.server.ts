import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({
	locals: { honoClient },
	params: { categoryName }
}) => {
	const fetchCategoryProdcts = async () => {
		const res = await honoClient.api.products.withImages.category[':categoryName'].$get({
			param: { categoryName }
		});
		const { data } = await res.json();
		return data || [];
	};

	return {
		streamed: {
			categoryProducts: fetchCategoryProdcts()
		}
	};
};
