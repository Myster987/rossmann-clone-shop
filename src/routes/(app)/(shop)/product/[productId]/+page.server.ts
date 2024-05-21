import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params: { productId }, locals: { honoClient } }) => {
	const res = await honoClient.api.products.withImages[':productId'].$get({ param: { productId } });
	const { data } = await res.json();

	if (!data) {
		return error(404);
	}

	const fetchRelatedProducts = async () => {
		const res = await honoClient.api.products.withImages.related[':productId'][':category'].$get({
			param: {
				productId: data.id,
				category: data.category
			}
		});
		const { data: relatedData } = await res.json();
		return relatedData || [];
	};

	return {
		product: data,
		streamed: {
			relatedProducts: fetchRelatedProducts()
		}
	};
};
