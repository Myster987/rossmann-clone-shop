import { z } from 'zod';

export const signUpFormSchema = z
	.object({
		email: z
			.string({ required_error: 'Email jest wymagany' })
			.min(3, 'Email musi mieć co najmnej 3 znaki')
			.max(64, 'Email nie może mieć więcej niż 64 znaki')
			.email('Niepoprawny email'),
		password: z
			.string({ required_error: 'Hasło jest wymagane' })
			.min(6, 'Hasło musi mieć co najmniej 6 znaków')
			.max(255, 'Hasło nie może mieć więcej niż 255 znaków')
			.trim(),
		confirmPassword: z.string({ required_error: 'Potwierdzenie hasło jest wymagane' }).trim()
	})
	.superRefine((val, ctx) => {
		if (val.password !== val.confirmPassword) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'Hasło i potwierdzenia hasła się nie zgadzają',
				path: ['confirmPassword']
			});
		}
	});
export type SignUpFormSchema = typeof signUpFormSchema;

export const signInFormSchema = z.object({
	email: z
		.string({ required_error: 'Email jest wymagany' })
		.min(3, 'Email musi mieć co najmnej 3 znaki')
		.max(64, 'Email nie może mieć więcej niż 64 znaki')
		.email('Niepoprawny email'),
	password: z
		.string({ required_error: 'Hasło jest wymagane' })
		.min(6, 'Hasło musi mieć co najmniej 6 znaków')
		.max(255, 'Hasło nie może mieć więcej niż 255 znaków')
		.trim()
});
export type SignInFormSchema = typeof signInFormSchema;
