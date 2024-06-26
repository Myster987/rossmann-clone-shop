<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { signUpFormSchema } from '@/auth/form_schemas';
	import { Input } from '@/components/ui/input';
	import { Separator } from '@/components/ui/separator';
	import { toast } from 'svelte-sonner';
	import * as Card from '@/components/ui/card';
	import * as Form from '@/components/ui/form';
	import type { PageData } from './$types';

	export let data: PageData;
	const form = superForm(data.form, {
		validators: zodClient(signUpFormSchema),
		onSubmit() {
			toast.loading('Proszę czekać...');
		},
		onResult({ result }) {
			if (result.type == 'failure') {
				toast.error('Niepoprawny email lub hasło.');
			} else if (result.type == 'redirect') {
				toast.success('Pomyślnie utworzono konto!');
			}
		}
	});

	const { form: formData, enhance } = form;
</script>

<main class="flex min-h-screen items-center justify-center">
	<Card.Root class="w-10/12 sm:w-3/5 md:w-2/5 lg:w-[32%]">
		<Card.Header>
			<Card.Title class="text-2xl">Załóż konto</Card.Title>
			<Card.Description>Wprowadź swój email i stwórz konto.</Card.Description>
		</Card.Header>
		<Card.Content>
			<form method="post" use:enhance>
				<Form.Field {form} name="email">
					<Form.Control let:attrs>
						<Form.Label class="text-lg">Email</Form.Label>
						<Input {...attrs} bind:value={$formData.email} />
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>

				<Form.Field {form} name="password">
					<Form.Control let:attrs>
						<Form.Label class="text-lg">Hasło</Form.Label>
						<Input {...attrs} type="password" bind:value={$formData.password} />
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>

				<Form.Field {form} name="confirmPassword">
					<Form.Control let:attrs>
						<Form.Label class="text-lg">Potwierdzenie hasła</Form.Label>
						<Input {...attrs} type="password" bind:value={$formData.confirmPassword} />
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>

				<Form.Button type="submit" class="my-2 w-full text-lg">Załóż konto</Form.Button>
			</form>

			<div class="grid grid-cols-3 items-center p-1 text-center">
				<Separator />
				<p class="text-sm text-muted-foreground">Jeśli masz już konto</p>
				<Separator />
			</div>
			<a href="/sign_in">
				<Form.Button variant="outline" class="my-1 w-full text-lg">Zaloguj się</Form.Button>
			</a>
		</Card.Content>
	</Card.Root>
</main>
