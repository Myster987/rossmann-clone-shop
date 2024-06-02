<script lang="ts">
	import { Skeleton } from '@/components/ui/skeleton';
	import FavoriteCard from './FavoriteCard.svelte';
	import type { InferQueryModel } from '@/db/types';

	type Products = InferQueryModel<'favorite', { with: { product: { with: { images: true } } } }>;

	export let placholderCount = 20;
	export let isLoading: boolean;
	export let isError: boolean;
	export let cartProducts: Products[] | undefined = undefined;
</script>

{#if isLoading}
	{#each Array(placholderCount) as skeleton}
		<Skeleton class="h-96 rounded-xl" />
	{/each}
{:else if isError || !cartProducts}
	<div class="flexh-80 col-span-full items-center justify-center text-2xl font-medium">
		Coś poszło nie tak.
	</div>
{:else}
	{#each cartProducts as cartProduct}
		{#if cartProduct.product}
			<FavoriteCard product={cartProduct.product} favoriteId={cartProduct.id} />
		{/if}
	{/each}
{/if}
