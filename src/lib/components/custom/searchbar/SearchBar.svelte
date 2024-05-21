<script lang="ts">
	import { productsStore } from '@/stores';
	import { createHonoClient } from '@/api/client';
	import { Heart, LoaderCircle, Search } from 'lucide-svelte';
	import { Button } from '@/components/ui/button';
	import * as Command from '@/components/ui/command';
	import { cn } from '@/utils';

	const honoClient = createHonoClient();

	let currentInput = '';
	let open = false;
	let suggestDelay: number;
	let resolvedSuggestion = false;
	let className: string | undefined = undefined;
	export { className as class };

	$: productsList =
		$productsStore.data?.map((product) => ({ id: product.id, name: product.name })) || [];

	const handeSearchMoreResults = async () => {
		const res = await honoClient.api.products.byName[':name'].$get({
			param: {
				name: currentInput
			},
			query: { limit: '10' }
		});

		const { data } = await res.json();
		resolvedSuggestion = true;

		if (!data) {
			return;
		}
		productsList = [
			...new Map([...productsList, ...data].map((value) => [value.id, value])).values()
		];
	};

	const handleDalaySuggestion = () => {
		if (!open || currentInput.length < 3) {
			return;
		}
		clearTimeout(suggestDelay);
		resolvedSuggestion = false;
		suggestDelay = window.setTimeout(() => handeSearchMoreResults(), 1000);
	};

	$: {
		if (currentInput) {
			handleDalaySuggestion();
		}
	}
</script>

<Button
	variant="outline"
	on:click={() => (open = !open)}
	class={cn(className, 'flex max-w-[450px] justify-start gap-1 md:w-64 lg:w-72')}
	><Search size="18" class="text-muted-foreground" /> Wyszukaj produkt...</Button
>

<Command.Dialog bind:open>
	<Command.Input placeholder="Wyszukaj produkt..." bind:value={currentInput} />
	<Command.List>
		{#if !resolvedSuggestion || ($productsStore.isLoading && currentInput != '')}
			<Command.Empty class="flex items-center justify-center">
				<div class="flex gap-2">
					<LoaderCircle class="animate-spin" /> Szukam...
				</div>
			</Command.Empty>
		{:else}
			<Command.Empty>
				{#if currentInput}
					Nie znaleziono żadnych wyników dla "{currentInput}".
				{:else}
					Nie znaleziono żadnych wyników.
				{/if}
			</Command.Empty>
		{/if}
		<Command.Group heading="Sugerowane" class="scroll">
			{#each productsList as product (product.id)}
				<a href="/product/{product.id}">
					<Command.Item class="gap-1">
						<Heart size="18" />
						{product.name.toLocaleLowerCase()}
					</Command.Item>
				</a>
			{/each}
		</Command.Group>
	</Command.List>
</Command.Dialog>
