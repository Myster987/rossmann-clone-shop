<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { Heart, ShoppingCart } from 'lucide-svelte';
	import { Currency } from '../other';
	import { AddToCart, AddToFavorite } from '../buttons';
	import { userStore } from '@/stores';
	import { handleClientLoginRedirect } from '@/utils';
	import { Button } from '@/components/ui/button';
	import * as Card from '@/components/ui/card';
	import type { SelectImages, SelectProduct } from '@/db/schema';

	export let product: SelectProduct;
	export let image: SelectImages;

	const handleRedirectIfNotLogged = () => {
		if (!$userStore) {
			goto(handleClientLoginRedirect($page.url));
		}
	};
</script>

<Card.Root class="relative h-full">
	<div class="absolute right-5 top-5 flex">
		<AddToCart productId={product.id}
			><Button
				type="submit"
				size="icon"
				variant="ghost"
				class="rounded-full"
				on:click={handleRedirectIfNotLogged}><ShoppingCart class="text-primary" /></Button
			></AddToCart
		>

		<AddToFavorite productId={product.id}>
			<Button
				type="submit"
				variant="ghost"
				size="icon"
				class="group rounded-full"
				on:click={handleRedirectIfNotLogged}
				><Heart class="text-primary group-hover:fill-primary" /></Button
			>
		</AddToFavorite>
	</div>
	<a href="/product/{product.id}">
		<Card.Content class="p-3 pb-0">
			<div
				class="flex aspect-square max-w-[600px] justify-center overflow-hidden rounded-md bg-gray-300 p-2"
			>
				<img
					src={image.imageUrl}
					alt="Image of {product.name}"
					class="pointer-events-none aspect-square object-contain"
				/>
			</div>
		</Card.Content>
		<Card.Footer class="grid gap-1 p-3">
			<Card.Title>{product.name}</Card.Title>
			<Card.Description>
				{product.category}
			</Card.Description>
			<Currency amount={product.price} class="text-2xl font-semibold" />
		</Card.Footer>
	</a>
</Card.Root>
