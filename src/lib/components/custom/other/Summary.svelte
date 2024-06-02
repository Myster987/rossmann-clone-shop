<script lang="ts">
	import { quantitiesStore } from '@/stores';
	import { Currency } from '.';
	import { PayButton } from '../buttons';
	import { Separator } from '@/components/ui/separator';
	import * as Card from '@/components/ui/card';

	export let isLoading: boolean;
	$: priceSum = Array.from($quantitiesStore.values()).reduce((a, b) => a + b.count * b.price, 0);
</script>

<Card.Root class="h-fit grow">
	<Card.Content class="grid gap-4 py-6">
		<h2 class="text-xl font-semibold">Podsumowanie Zamówienia</h2>
		<Separator />
		<div class="mt-3 flex justify-between">
			<div class="font-medium">Cena</div>
			{#if isLoading}
				<div class="font-semibold">Ładuję...</div>
			{:else}
				<Currency amount={priceSum} class="font-semibold" />
			{/if}
		</div>
		<PayButton />
	</Card.Content>
</Card.Root>
