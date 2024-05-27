<script lang="ts">
	import { createAsyncStore } from '@/stores/async_stores';
	import { Separator } from '@/components/ui/separator';
	import { FavoriteCardList } from '@/components/custom/favorite_card';
	import type { PageData } from './$types';

	export let data: PageData;

	const favoriteStore = createAsyncStore(data.streamed.favoriteProducts);
	$: favoriteStore.updateAsync(data.streamed.favoriteProducts);
</script>

<main class="flex h-full flex-col items-stretch gap-4 p-4">
	<h1 class="text-4xl font-bold">Ulubione</h1>

	<Separator />

	<div class="grid h-full grid-cols-1 gap-4">
		{#if $favoriteStore.data?.length == 0}
			<div
				class="absolute left-1/2 top-1/2 col-span-full -translate-x-1/2 -translate-y-1/2 text-center text-2xl"
			>
				Nie dodano jeszcze ulubionych produktów
			</div>
		{/if}
		<FavoriteCardList
			placholderCount={5}
			cartProducts={$favoriteStore.data}
			isLoading={$favoriteStore.isLoading}
			isError={$favoriteStore.isError}
		/>
	</div>
</main>
