<script lang="ts">
	import { GithubLink, ProfileDropdownMenu, ThemeButton } from '@/components/custom/buttons';
	import { SearchBar } from '@/components/custom/searchbar';
	import { Button } from '@/components/ui/button';
	import RossmannIcon from '@/assets/rossmann_icon.svg?raw';
</script>

<header
	class="sticky top-0 z-50 hidden w-full border-b border-border/70 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:block"
>
	<div class="flex justify-between p-2 px-4">
		<div class="flex gap-3">
			<a href="/" class="h-9 w-9">
				{@html RossmannIcon}
			</a>
			<SearchBar />
			<a href="/categories">
				<Button
					variant="link"
					class="text-lg font-semibold text-secondary-foreground hover:text-primary"
					>Kategorie</Button
				>
			</a>
		</div>
		<div class="flex gap-1">
			<ProfileDropdownMenu />
			<GithubLink />
			<ThemeButton />
		</div>
	</div>
</header>
