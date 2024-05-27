<script lang="ts">
	import { createAsyncStore } from '@/stores/async_stores';
	import { CartProductsList } from '@/components/custom/cart_product_card';
	import { Currency } from '@/components/custom/other';
	import { Separator } from '@/components/ui/separator';
	import type { PageData } from './$types';

	export let data: PageData;

	const cartStore = createAsyncStore(data.streamed.productsInCart);
	$: cartStore.updateAsync(data.streamed.productsInCart);
</script>

<main class="flex h-full flex-col items-stretch gap-4 p-4">
	<h1 class="text-4xl font-bold">Koszyk</h1>

	<Separator />

	<div class="grid grid-cols-1 gap-4">
		{#if $cartStore.data?.length == 0}
			<div
				class="absolute left-1/2 top-1/2 col-span-full -translate-x-1/2 -translate-y-1/2 text-center text-2xl"
			>
				Nie dodano jeszcze produktów do koszyka
			</div>
		{/if}
		<CartProductsList
			placholderCount={5}
			cartProducts={$cartStore.data}
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
		{#if $cartStore.isLoading || typeof $cartStore.data == 'undefined'}
			<p>Ładuję...</p>
		{:else}
			<Currency
				amount={$cartStore.data.map((val) => val.product.price).reduce((a, b) => a + b, 0)}
			/>
		{/if}
	</div>
</div>
