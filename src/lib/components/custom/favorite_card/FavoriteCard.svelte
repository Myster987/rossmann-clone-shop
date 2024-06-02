<script lang="ts">
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { toast } from 'svelte-sonner';
	import { ShoppingCart, Trash2 } from 'lucide-svelte';
	import { Currency } from '../other';
	import { AddToCart } from '../buttons';
	import { Button } from '@/components/ui/button';
	import * as Card from '@/components/ui/card';
	import type { SelectImages, SelectProduct } from '@/db/schema';

	export let favoriteId: number;
	export let product: SelectProduct & { images: SelectImages[] };
</script>

<Card.Root class="relative h-fit">
	<div class="absolute right-5 top-5">
		<form
			action="?/deleteProductFromFavorite"
			method="post"
			use:enhance={() => {
				toast.loading('Proszę czekać...');
				return async ({ result }) => {
					if (result.type == 'success') {
						toast.success('Pomyślnie usunięto produkt z ulubionych.');
						invalidateAll();
					} else {
						toast.error('Coś poszło nie tak.');
					}
				};
			}}
		>
			<input type="text" name="favoriteId" value={favoriteId} hidden />
			<Button variant="destructive" size="icon" type="submit"><Trash2 /></Button>
		</form>
	</div>

	<div class="flex flex-wrap">
		<a href="/product/{product.id}">
			<Card.Content class="w-fit p-3">
				<div
					class="relative flex aspect-square max-h-[300px] justify-center overflow-hidden rounded-md bg-gray-300 p-2"
				>
					<img
						src={product.images[0].imageUrl}
						alt="Image of {product.name}"
						class="pointer-events-none aspect-square object-contain"
					/>
				</div>
			</Card.Content>
		</a>
		<Card.Footer class="grid h-fit gap-1 p-3">
			<Card.Title class="break-all text-3xl">{product.name}</Card.Title>
			<Card.Description class="break-all text-lg">
				{product.category}
			</Card.Description>
			<Currency amount={product.price} class="text-2xl font-semibold" />
			<AddToCart productId={product.id}>
				<Button type="submit" size="sm" class="flex gap-1 rounded-full text-lg"
					><ShoppingCart /> Dodaj do koszyka</Button
				>
			</AddToCart>
		</Card.Footer>
	</div>
</Card.Root>
