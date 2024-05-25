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

<main class="flex flex-col items-stretch gap-4 p-4">
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
</main>

<div
	class="sticky bottom-0 left-0 z-50 grid w-full border-t border-border/70 bg-background/95 py-4 backdrop-blur supports-[backdrop-filter]:bg-background/60"
>
	<div class="flex justify-center gap-2 text-3xl font-semibold">
		Razem:
		{#if $cartStore.isLoading || typeof products == 'undefined'}
			<p>Ładuję...</p>
		{:else}
			<Currency amount={products.map((val) => val.price).reduce((a, b) => a + b, 0)} />
		{/if}
	</div>
</div>
