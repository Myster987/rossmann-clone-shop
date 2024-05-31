<script lang="ts">
	import { Check, Plus } from 'lucide-svelte';
	import { Button } from '@/components/ui/button';
	import { ScrollArea } from '@/components/ui/scroll-area';
	import * as Sheet from '@/components/ui/sheet';

	export let categories: string[];
	export let currentCategory: string;
</script>

<Sheet.Root>
	<Sheet.Trigger asChild let:builder>
		<Button builders={[builder]} class="flex gap-1 rounded-full md:hidden" size="sm"
			>Filtry <Plus class="h-4 w-4" /></Button
		>
	</Sheet.Trigger>
	<Sheet.Content side="right">
		<Sheet.Header>
			<Sheet.Title>Filtry:</Sheet.Title>
		</Sheet.Header>
		<ScrollArea class="w-[180px]">
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
	</Sheet.Content>
</Sheet.Root>
