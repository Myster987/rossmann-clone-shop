<script lang="ts">
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { toast } from 'svelte-sonner';
	import { Minus, Plus, Trash2 } from 'lucide-svelte';
	import { Currency } from '../other';
	import { Button } from '@/components/ui/button';
	import * as Card from '@/components/ui/card';
	import type { SelectImages, SelectProduct } from '@/db/schema';
	import { quantitiesStore } from '@/stores';

	export let cartId: number;
	export let product: SelectProduct & { images: SelectImages[] };
</script>

<Card.Root class="relative flex">
	<div class="flex flex-col md:flex-row">
		<a href="/product/{product.id}">
			<Card.Content class="w-fit p-3">
				<div
					class="flex aspect-square max-h-[300px] justify-center overflow-hidden rounded-md bg-gray-300 p-2"
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
			<Card.Title class="break-all text-2xl sm:text-2xl">{product.name}</Card.Title>
			<Card.Description class="break-all sm:text-lg">
				{product.category}
			</Card.Description>
			<Currency amount={product.price} class="text-lg font-semibold sm:text-xl" />
			<div class="flex w-fit items-center justify-between gap-2 rounded-full bg-primary text-white">
				<Button
					on:click={() => {
						const productData = $quantitiesStore.get(product.id);
						const newCount = (productData?.count || 1) + 1;
						$quantitiesStore.set(product.id, { count: newCount, price: productData?.price || 0 });
						$quantitiesStore = $quantitiesStore;
					}}
					size="icon"
					variant="ghost"
					class="hover:bg-transparent hover:text-gray-400"><Plus /></Button
				>
				{$quantitiesStore.get(product.id)?.count}
				<Button
					on:click={() => {
						const productData = $quantitiesStore.get(product.id);
						if ((productData?.count || 0) > 1) {
							const newCount = (productData?.count || 1) - 1;
							$quantitiesStore.set(product.id, { count: newCount, price: productData?.price || 0 });
							$quantitiesStore = $quantitiesStore;
						}
					}}
					size="icon"
					variant="ghost"
					class="hover:bg-transparent hover:text-gray-400"><Minus /></Button
				>
			</div>
		</Card.Footer>
	</div>

	<div class="absolute right-5 top-5 md:static md:ml-auto md:p-2">
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
