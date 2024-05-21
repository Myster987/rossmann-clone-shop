<script lang="ts">
	import { productsStore } from '@/stores';
	import { SiteNavbar } from '@/components/custom/navigation';
	import type { LayoutData } from './$types';

	export let data: LayoutData;
	$: productsStore.updateAsync(data.streamed.products);
</script>

<SiteNavbar />
<slot />
