<script lang="ts">
	import type { SelectImages } from '@/db/schema';
	import * as Carousel from '$lib/components/ui/carousel';

	export let images: SelectImages[];
</script>

<Carousel.Root class="w-full px-2">
	<Carousel.Content class="aspect-square max-h-[500px]">
		{#each images as image}
			<Carousel.Item>
				<div class="flex h-full overflow-hidden rounded-xl bg-gray-200 p-2">
					<img
						src={image.imageUrl}
						alt="Image of product with id {image.productId}"
						class="aspect-square object-contain"
					/>
				</div>
			</Carousel.Item>
		{/each}
	</Carousel.Content>
</Carousel.Root>
