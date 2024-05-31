<script lang="ts">
	import { Currency } from '.';
	import { PayButton } from '../buttons';
	import { Separator } from '@/components/ui/separator';
	import * as Card from '@/components/ui/card';

	export let productIds: string[];
	export let prices: number[];
	export let isLoading: boolean;
	$: priceSum = prices.reduce((a, b) => a + b, 0);
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
		<PayButton {productIds} />
	</Card.Content>
</Card.Root>
