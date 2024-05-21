<script lang="ts" generics="T extends SelectProduct & { images: SelectImages[]}">
	import { Skeleton } from '@/components/ui/skeleton';
	import ProductCard from './CartProductCard.svelte';
	import type { SelectImages, SelectProduct } from '@/db/schema';

	export let placholderCount = 20;
	export let isLoading: boolean;
	export let isError: boolean;
	export let products: T[] | undefined = undefined;
</script>

{#if isLoading}
	{#each Array(placholderCount) as skeleton}
		<Skeleton class="h-96 rounded-xl" />
	{/each}
{:else if isError || !products}
	<div class="flexh-80 col-span-full items-center justify-center text-2xl font-medium">
		Coś poszło nie tak.
	</div>
{:else}
	{#each products as product}
		<ProductCard {product} image={product.images[0]} />
	{/each}
{/if}
