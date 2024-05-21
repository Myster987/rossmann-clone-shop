<script lang="ts">
	import { Heart } from 'lucide-svelte';
	import { Currency } from '../other';
	import { Button } from '@/components/ui/button';
	import * as Card from '@/components/ui/card';
	import type { SelectImages, SelectProduct } from '@/db/schema';

	export let product: SelectProduct;
	export let image: SelectImages;
</script>

<Card.Root class="relative h-full">
	<div class="absolute right-5 top-5 flex">
		<Button variant="ghost" size="icon" class="group rounded-full"
			><Heart class="text-primary group-hover:fill-primary" /></Button
		>
	</div>
	<a href="/product/{product.id}">
		<Card.Content class="flex p-3 sm:float-start">
			<div
				class="flex aspect-square justify-center overflow-hidden rounded-md bg-gray-300 p-2 sm:max-w-[250px]"
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
			<p class="break-all text-muted-foreground">Opis: {product.description}</p>
			<p class="break-all text-muted-foreground">Skład: {product.ingredients}</p>
		</Card.Footer>
	</a>
</Card.Root>
