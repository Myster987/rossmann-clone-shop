// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import type { User, Session } from 'lucia';
import type { HonoClient } from '@/api/client';

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: User | null;
			session: Session | null;
			honoClient: HonoClient;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
