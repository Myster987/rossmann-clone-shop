<script lang="ts">
	import { enhance } from '$app/forms';
	import { userStore } from '@/stores';
	import { toast } from 'svelte-sonner';

	export let productId: string;
</script>

<form
	action="/form_actions?/addProductToCart"
	method="post"
	use:enhance={({ cancel, formData }) => {
		if (!$userStore?.id) {
			cancel();
		}
		console.log(Object.fromEntries(formData.entries()));

		return async ({ result }) => {
			if (result.type == 'success') {
				// @ts-ignore
				toast.success(result.data?.message);
			} else {
				// @ts-ignore
				toast.error(result.data?.message);
			}
		};
	}}
>
	<input type="text" name="productId" value={productId} hidden />
	<input type="text" name="userId" value={$userStore?.id} hidden />
	<slot />
</form>
