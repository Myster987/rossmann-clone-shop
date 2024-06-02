<script lang="ts">
	import { Skeleton } from '@/components/ui/skeleton';
	import ProductCard from './CartProductCard.svelte';
	import type { InferQueryModel } from '@/db/types';
	import type { Writable } from 'svelte/store';

	type Products = InferQueryModel<'cart', { with: { product: { with: { images: true } } } }>;

	export let placholderCount = 20;
	export let isLoading: boolean;
	export let isError: boolean;
	export let cartProducts: Products[] | undefined = undefined;
</script>

{#if isLoading}
	{#each Array(placholderCount) as skeleton}
		<Skeleton class="h-64 rounded-xl" />
	{/each}
{:else if isError || !cartProducts}
	<div class="col-span-full flex h-80 items-center justify-center text-2xl font-medium">
		Coś poszło nie tak.
	</div>
{:else}
	{#each cartProducts as cartProduct, index}
		{#if cartProduct.product}
			<ProductCard product={cartProduct.product} cartId={cartProduct.id} />
		{/if}
	{/each}
{/if}
