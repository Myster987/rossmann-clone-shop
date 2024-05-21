<script lang="ts">
	import { createAsyncStore } from '@/stores/async_stores';
	import { CartProductsList } from '@/components/custom/cart_product_card';
	import { Currency } from '@/components/custom/other';
	import { Separator } from '@/components/ui/separator';
	import type { PageData } from './$types';

	export let data: PageData;

	const cartStore = createAsyncStore(data.streamed.productsInCart);
	$: cartStore.updateAsync(data.streamed.productsInCart);
	$: products = $cartStore.data?.map((val) => val.product);
</script>

<main class="flex h-[calc(100%-56px)] min-h-0 flex-col items-stretch gap-4 p-4">
	<h1 class="text-4xl font-bold">Koszyk</h1>

	<Separator />

	<div class="grid grid-cols-1 gap-4">
		<CartProductsList
			placholderCount={5}
			{products}
			isLoading={$cartStore.isLoading}
			isError={$cartStore.isError}
		/>
	</div>

	<div class="mt-auto flex gap-2 self-center p-2 py-4 text-3xl font-semibold">
		Razem:
		{#if $cartStore.isLoading || typeof products == 'undefined'}
			<p>asd</p>
		{:else}
			<Currency amount={products.map((val) => val.price).reduce((a, b) => a + b, 0)} />
		{/if}
	</div>
</main>
