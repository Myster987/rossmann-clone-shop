<script lang="ts">
	import { productsStore } from '@/stores';
	import { Separator } from '@/components/ui/separator';
	import { ProductsList } from '@/components/custom/product_card';
	import RossmannLogo from '@/assets/rossmann_log.svg?raw';
	import Billboard from '@/assets/billboard.webp';
</script>

<main class="grid gap-4 p-5">
	<div class="relative flex items-center justify-center overflow-hidden rounded-xl">
		<div class="absolute w-1/2 font-bold text-black">{@html RossmannLogo}</div>
		<img src={Billboard} alt="Baner strony" />
	</div>
	<h1 class="text-4xl font-bold">Wyróżnione produkty</h1>
	<Separator />
	<div class="grid grid-cols-1 gap-5 py-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
		<ProductsList products={productsStore} />
	</div>
</main>
