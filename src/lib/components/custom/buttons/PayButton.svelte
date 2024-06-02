<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { goto, invalidateAll } from '$app/navigation';
	import { toast } from 'svelte-sonner';
	import { createHonoClient } from '@/api/client';
	import { userStore, quantitiesStore } from '@/stores';
	import { Button } from '@/components/ui/button';

	const honoClient = createHonoClient();

	const processPaymant = async () => {
		const res = await honoClient.api.checkout.$post({
			json: {
				productsToBuy: Array.from($quantitiesStore.entries()).map(([key, val]) => ({
					id: key,
					quantity: val.count
				})),
				userId: $userStore?.id || ''
			}
		});

		const data = await res.json();

		if (!data.success || !data.url) {
			toast.error('Coś poszło nie tak.');
			return;
		}
		window.location = data.url as string & Location;
	};

	onMount(async () => {
		if ($page.url.searchParams.get('success')) {
			toast.success('Płatność zakończona.');
			await honoClient.api.cart.all[':userId'].$delete({ param: { userId: $userStore?.id || '' } });
			goto($page.url.pathname, {
				replaceState: true,
				noScroll: true,
				invalidateAll: true,
				keepFocus: true
			});
		}
		if ($page.url.searchParams.get('canceled')) {
			toast.error('Anulowano płatność.');
			await honoClient.api.orders[':orderId'].$delete({
				param: { orderId: $page.url.searchParams.get('orderId') || '' }
			});
		}
	});
</script>

<Button class="w-full rounded-full text-lg" size="sm" on:click={processPaymant}>Zapłać</Button>
