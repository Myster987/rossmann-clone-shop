<script lang="ts">
	import { quantitiesStore } from '@/stores';
	import { createAsyncStore } from '@/stores/async_stores';
	import { CartProductsList } from '@/components/custom/cart_product_card';
	import { Separator } from '@/components/ui/separator';
	import { Summary } from '@/components/custom/other';
	import type { PageData } from './$types';

	export let data: PageData;

	const cartStore = createAsyncStore(data.streamed.productsInCart);
	$: cartStore.updateAsync(data.streamed.productsInCart);
	$: $quantitiesStore = new Map(
		$cartStore.data?.map((val) => [val.productId!, { count: 1, price: val.product?.price! }])
	);
</script>

<main class="flex flex-col items-stretch gap-4 p-4">
	<h1 class="text-4xl font-bold">Koszyk</h1>

	<Separator />

	<div class="flex flex-wrap gap-5 md:flex-nowrap">
		<div class="grid w-full grid-cols-1 gap-4 md:w-3/5">
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
		{#if $cartStore.data?.length != 0}
			<Summary isLoading={$cartStore.isLoading} />
		{/if}
	</div>
</main>
