import { writable } from 'svelte/store';
import { createAsyncStore } from './async_stores';
import type { User } from 'lucia';
import type { SelectImages, SelectProduct } from '@/db/schema';

interface ProductsStoreData extends SelectProduct {
	images: SelectImages[];
}

export const userStore = writable<User | null>(null);

export const productsStore = createAsyncStore<ProductsStoreData[]>();

export const quantitiesStore = writable(new Map<string, { count: number; price: number }>());
