<script lang="ts">
	export let amount: number;

	let className: string | undefined = undefined;
	export { className as class };

	const formatNumber = (toFormat: number) =>
		new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'PLN'
		}).format(toFormat);
</script>

<div class={className}>{formatNumber(amount)}</div>
