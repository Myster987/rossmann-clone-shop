<script lang="ts">
	import { Separator } from '@/components/ui/separator';
	import type { LayoutData } from './$types';
	import { Button } from '@/components/ui/button';
	import { Check } from 'lucide-svelte';
	import { page } from '$app/stores';
	import { ScrollArea } from '@/components/ui/scroll-area';

	export let data: LayoutData;

	$: categories = data.categories?.map((val) => val.category) || [];
	$: currentCategory = $page.params?.categoryName || '';
</script>

<main class="flex h-full flex-col p-5">
	<h1 class="mb-4 text-4xl font-bold">Kategorie</h1>

	<Separator />

	<div class="flex h-full">
		<div class="flex flex-row-reverse gap-2">
			<Separator orientation="vertical" />

			<ScrollArea class="w-[200px]">
				<ul>
					{#each categories as category}
						<li>
							<a href="/categories/{category}">
								<Button
									variant="link"
									class="flex gap-1 text-secondary-foreground hover:text-primary"
								>
									<Check class="h-4 w-4 {currentCategory != category && 'text-transparent'}" />
									{category}
								</Button>
							</a>
						</li>
					{/each}
				</ul>
			</ScrollArea>
		</div>

		<div class="relative flex-grow">
			<slot />
		</div>
	</div>
</main>
