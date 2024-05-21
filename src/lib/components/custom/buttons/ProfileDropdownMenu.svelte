<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { userStore } from '@/stores';
	import { Heart, LogOut, ShoppingCart, UserRound } from 'lucide-svelte';
	import { Button } from '@/components/ui/button';
	import { Separator } from '@/components/ui/separator';
	import { toast } from 'svelte-sonner';
	import * as DropdownMenu from '@/components/ui/dropdown-menu';
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger asChild let:builder>
		<Button builders={[builder]} variant="ghost" size="icon">
			<UserRound />
		</Button>
	</DropdownMenu.Trigger>

	<DropdownMenu.Content>
		{#if $userStore}
			<a href="/user/{$userStore.id}/favorite" class="w-full">
				<Button class="flex w-full justify-start gap-1" variant="ghost"><Heart /> Ulubione</Button>
			</a>
			<a href="/user/{$userStore.id}/cart" class="w-full">
				<Button class="flex w-full justify-start gap-1" variant="ghost"
					><ShoppingCart /> Koszyk</Button
				>
			</a>
			<form
				method="post"
				action="/sign_out"
				use:enhance={() => {
					toast.loading('Proszę czekać...');
					return async ({ result }) => {
						if (result.type == 'failure') {
							toast.error('Coś poszło nie tak.');
						} else if (result.type == 'redirect') {
							toast.success('Pomyślnie wylogowano.');
							goto(result.location);
						}
					};
				}}
			>
				<Button type="submit" variant="ghost" class="flex w-full justify-start gap-1"
					><LogOut size="22" /> Wyloguj się</Button
				>
			</form>
		{:else}
			<div class="grid gap-1 p-1">
				<a href="/sign_in">
					<Button class="w-full rounded-full px-16 text-lg" size="sm">Zaloguj się</Button>
				</a>

				<div class="grid grid-cols-3 items-center text-center">
					<Separator />
					<p class="text-muted-foreground">Lub</p>
					<Separator />
				</div>

				<a href="/sign_up">
					<Button class="w-full rounded-full text-lg" size="sm">Załóż konto</Button>
				</a>
			</div>
		{/if}
	</DropdownMenu.Content>
</DropdownMenu.Root>
