<script lang="ts">
	import { page } from '$app/stores';
	import { createHonoClient } from '@/api/client';
	import { Button } from '@/components/ui/button';
	import { userStore } from '@/stores';
	import { onMount } from 'svelte';
	import { toast } from 'svelte-sonner';

	export let productIds: string[];
	const honoClient = createHonoClient();

	const processPaymant = async () => {
		const res = await honoClient.api.checkout.$post({
			json: {
				productIds,
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
