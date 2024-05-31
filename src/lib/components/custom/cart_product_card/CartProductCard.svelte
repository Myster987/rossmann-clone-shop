<script lang="ts">
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { toast } from 'svelte-sonner';
	import { Trash2 } from 'lucide-svelte';
	import { Currency } from '../other';
	import { Button } from '@/components/ui/button';
	import * as Card from '@/components/ui/card';
	import type { SelectImages, SelectProduct } from '@/db/schema';

	export let cartId: number;
	export let product: SelectProduct & { images: SelectImages[] };
</script>

<Card.Root class="flex h-fit">
	<a href="/product/{product.id}" class="flex">
		<Card.Content class="w-fit p-3">
			<div
				class="flex aspect-square max-h-[150px] justify-center overflow-hidden rounded-md bg-gray-300 p-2 sm:max-h-[250px]"
			>
				<img
					src={product.images[0].imageUrl}
					alt="Image of {product.name}"
					class="pointer-events-none aspect-square object-contain"
				/>
			</div>
		</Card.Content>
		<Card.Footer class="grid h-fit gap-1 p-3">
			<Card.Title class="break-all text-2xl sm:text-3xl">{product.name}</Card.Title>
			<Card.Description class="break-all sm:text-lg">
				{product.category}
			</Card.Description>
			<Currency amount={product.price} class="text-xl font-semibold sm:text-2xl" />
		</Card.Footer>
	</a>

	<div class="ml-auto p-2">
		<form
			action="?/deleteProductFromCart"
			method="post"
			use:enhance={() => {
				toast.loading('Proszę czekać...');
				return async ({ result }) => {
					if (result.type == 'success') {
						toast.success('Usunięto produkt z koszyka.');
						invalidateAll();
					} else {
						toast.error('Coś poszło nie tak.');
					}
				};
			}}
		>
			<input type="text" name="cartId" value={cartId} hidden />
			<Button variant="destructive" size="icon" type="submit" class="h-9 w-9 sm:h-10 sm:w-10"
				><Trash2 /></Button
			>
		</form>
	</div>
</Card.Root>
