<script lang="ts">
	import { Heart } from 'lucide-svelte';
	import { Currency } from '../other';
	import { Button } from '@/components/ui/button';
	import * as Card from '@/components/ui/card';
	import type { SelectImages, SelectProduct } from '@/db/schema';

	export let product: SelectProduct;
	export let image: SelectImages;
</script>

<Card.Root class="h-full">
	<Card.Content class="float-none flex p-3 md:float-start">
		<div
			class="relative flex aspect-square justify-center overflow-hidden rounded-md bg-gray-300 p-2 md:max-h-[225px]"
		>
			<div class="absolute right-1 top-1 flex">
				<Button variant="ghost" size="icon" class="group rounded-full"
					><Heart class="text-primary group-hover:fill-primary" /></Button
				>
			</div>
			<a href="/product/{product.id}">
				<img
					src={image.imageUrl}
					alt="Image of {product.name}"
					class="pointer-events-none aspect-square object-contain"
				/>
			</a>
		</div>
	</Card.Content>
	<a href="/product/{product.id}">
		<Card.Footer class="grid gap-1 p-3">
			<Card.Title class="break-all">{product.name}</Card.Title>
			<Card.Description class="break-all">
				{product.category}
			</Card.Description>
			<p class="break-all text-muted-foreground">Opis: {product.description}</p>
			<p class="break-all text-muted-foreground">Skład: {product.ingredients}</p>
			<Currency amount={product.price} class="text-2xl font-semibold" />
		</Card.Footer>
	</a>
</Card.Root>
