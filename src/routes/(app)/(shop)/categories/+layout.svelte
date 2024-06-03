<script lang="ts">
	import { page } from '$app/stores';
	import { Check } from 'lucide-svelte';
	import { Separator } from '@/components/ui/separator';
	import { Button } from '@/components/ui/button';
	import { ScrollArea } from '@/components/ui/scroll-area';
	import type { LayoutData } from './$types';
	import { MobileFilters } from '@/components/custom/other';

	export let data: LayoutData;

	$: categories = data.categories?.map((val) => val.category) || [];
	$: currentCategory = $page.params?.categoryName || '';
</script>

<main class="flex min-h-screen flex-col p-5">
	<h1 class="mb-4 text-4xl font-bold">Kategorie</h1>

	<Separator />

	<div class="flex h-full flex-col md:flex-row">
		<div class="flex flex-row gap-2 p-2 md:p-0">
			<ScrollArea class="hidden w-[180px] md:block">
				<ul>
					{#each categories as category}
						<li>
							<a href="/categories/{category}">
								<Button
									variant="link"
									class="flex gap-1 text-lg text-secondary-foreground hover:text-primary"
								>
									<Check class="h-4 w-4 {currentCategory != category && 'text-transparent'}" />
									{category}
								</Button>
							</a>
						</li>
					{/each}
				</ul>
			</ScrollArea>

			<MobileFilters {categories} {currentCategory} />

			<Separator orientation="vertical" class="hidden md:block" />
		</div>

		<div class="relative h-full flex-grow">
			<slot />
		</div>
	</div>
</main>
