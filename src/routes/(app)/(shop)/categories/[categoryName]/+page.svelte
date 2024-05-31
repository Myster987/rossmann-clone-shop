<script lang="ts">
	import { createAsyncStore } from '@/stores/async_stores';
	import { ProductsList } from '@/components/custom/product_card';
	import type { PageData } from './$types';

	export let data: PageData;

	const categoryProductsStore = createAsyncStore(data.streamed.categoryProducts);
	$: categoryProductsStore.updateAsync(data.streamed.categoryProducts);
</script>

<div class="grid grid-cols-1 gap-3 p-4 sm:grid-cols-2 lg:grid-cols-4">
	<ProductsList placholderCount={10} products={categoryProductsStore} />
</div>
