<script lang="ts">
	import { Skeleton } from '@/components/ui/skeleton';
	import ProductCard from './ProductCard.svelte';
	import type { productsStore } from '@/stores';

	export let placholderCount = 20;
	export let products: typeof productsStore;
</script>

{#if $products.isLoading || !$products.data}
	{#each Array(placholderCount) as skeleton}
		<Skeleton class="h-96 rounded-xl" />
	{/each}
{:else if $products.data.length == 0}
	<div class="flexh-80 col-span-full items-center justify-center text-2xl font-medium">
		Nie znaleziono produktów.
	</div>
{:else}
	{#each $products.data as product}
		<ProductCard {product} image={product.images[0]} />
	{/each}
{/if}
