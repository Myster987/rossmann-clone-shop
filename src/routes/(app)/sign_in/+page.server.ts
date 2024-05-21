import { fail, redirect } from '@sveltejs/kit';
import { Argon2id } from 'oslo/password';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { signInFormSchema } from '@/auth/form_schemas';
import { checkIfUserExists } from '@/db/queries';
import { createUserSession } from '@/auth/handlers';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(zod(signInFormSchema))
	};
};

export const actions: Actions = {
	default: async ({ request, url, cookies }) => {
		const form = await superValidate(request, zod(signInFormSchema));

		if (!form.valid) {
			return fail(400, {
				form
			});
		}
		const formData = form.data;
		const user = await checkIfUserExists.get({ email: formData.email });

		if (typeof user == 'undefined') {
			return fail(400, {
				form
			});
		}

		const validPassword = await new Argon2id().verify(user.password, formData.password);

		if (!validPassword) {
			return fail(400, {
				form
			});
		}

		await createUserSession(user.id, cookies);
		const redirectTo = url.searchParams.get('redirectTo');

		if (redirectTo) {
			redirect(302, `/${redirectTo.slice(1)}`);
		}
		redirect(302, '/');
	}
};
