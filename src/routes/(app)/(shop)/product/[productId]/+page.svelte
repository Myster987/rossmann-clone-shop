<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { Heart, ShoppingCart } from 'lucide-svelte';
	import { createAsyncStore } from '@/stores/async_stores';
	import { userStore } from '@/stores';
	import { handleClientLoginRedirect } from '@/utils';
	import { ProductsList } from '@/components/custom/product_card';
	import { Gallery } from '@/components/custom/gallery';
	import { Currency } from '@/components/custom/other';
	import { Separator } from '@/components/ui/separator';
	import { Button } from '@/components/ui/button';
	import { AddToCart } from '@/components/custom/buttons';
	import type { PageData } from './$types';

	export let data: PageData;
	$: ({ product } = data);
	const relatedProductsStore = createAsyncStore(data.streamed.relatedProducts);
	$: relatedProductsStore.updateAsync(data.streamed.relatedProducts);

	const handleRedirectIfNotLogged = () => {
		if (!$userStore) {
			goto(handleClientLoginRedirect($page.url));
		}
	};
</script>

<main class="px-4 py-12 sm:py-10">
	<div class="grid gap-5">
		<div class="grid grid-cols-1 items-start justify-center gap-x-8 gap-y-4 sm:grid-cols-2">
			<Gallery images={product.images} />
			<div>
				<h1 class="text-4xl font-bold">{product.name}</h1>
				<Currency amount={product.price} class="mt-3 text-2xl font-medium" />
				<div>
					<p>Kategoria: <b>{product.category}</b></p>
					<p class="mt-3 break-all"><b>Opis:</b> {product.description}</p>
					<p class="mt-3 break-all"><b>Skład:</b> {product.ingredients}</p>
				</div>
				<div class="mt-2 flex flex-wrap gap-2">
					<AddToCart productId={product.id}>
						<Button
							type="submit"
							class="flex gap-1 rounded-full text-lg"
							on:click={handleRedirectIfNotLogged}
							>Dodaj do koszyka <ShoppingCart size="22" /></Button
						>
					</AddToCart>
					<Button class="group flex gap-1 rounded-full text-lg" on:click={handleRedirectIfNotLogged}
						>Dodaj do ulubionych <Heart
							size="22"
							class="group-hover:fill-primary-foreground"
						/></Button
					>
				</div>
			</div>
		</div>
		<Separator />
		<h2 class="text-3xl font-semibold">Podobne produkty</h2>
		<div class="grid grid-cols-1 gap-5 py-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
			<ProductsList products={relatedProductsStore} placholderCount={5} />
		</div>
	</div>
</main>
