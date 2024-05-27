<script lang="ts">
	import { Menu } from 'lucide-svelte';
	import { GithubLink, ProfileDropdownMenu, ThemeButton } from '@/components/custom/buttons';
	import { SearchBar } from '@/components/custom/searchbar';
	import { Button } from '@/components/ui/button';
	import * as Sheet from '@/components/ui/sheet';
	import RossmannIcon from '@/assets/rossmann_icon.svg?raw';
</script>

<header
	class="sticky top-0 z-50 w-full border-b border-border/70 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:hidden"
>
	<div class="flex justify-between p-2 px-4">
		<div class="flex gap-3">
			<Sheet.Root>
				<Sheet.Trigger asChild let:builder>
					<div class="flex gap-2">
						<Button builders={[builder]} variant="ghost" size="icon">
							<Menu />
						</Button>
						<a href="/" class="h-9 w-9">
							{@html RossmannIcon}
						</a>
					</div>
				</Sheet.Trigger>
				<Sheet.Content side="left">
					<div class="grid gap-2">
						<SearchBar class="mt-5 w-full" />
						<a href="/categories">
							<Button
								variant="link"
								class="w-full text-2xl font-semibold text-secondary-foreground hover:text-primary"
								>Kategorie</Button
							>
						</a>
					</div>
				</Sheet.Content>
			</Sheet.Root>
		</div>
		<div class="flex gap-1">
			<ProfileDropdownMenu />
			<GithubLink />
			<ThemeButton />
		</div>
	</div>
</header>
