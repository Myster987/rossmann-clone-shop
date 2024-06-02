import { sql, type InferSelectModel, type InferInsertModel, relations } from 'drizzle-orm';
import { sqliteTable, text, real, integer } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
	id: text('id').notNull().primaryKey(),
	createdAt: text('created_at')
		.default(sql`CURRENT_TIMESTAMP`)
		.notNull(),
	email: text('email').notNull().unique(),
	password: text('password').notNull()
});
export const usersRelations = relations(users, ({ many }) => ({
	cart: many(cart),
	favorite: many(favorite)
}));
export type SelectUsers = InferSelectModel<typeof users>;
export type InsertUsers = InferInsertModel<typeof users>;

export const sessions = sqliteTable('sessions', {
	id: text('id').notNull().primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => users.id),
	expiresAt: integer('expires_at').notNull()
});
export type SelectSessions = InferSelectModel<typeof sessions>;
export type InsertSessions = InferInsertModel<typeof sessions>;

export const companies = sqliteTable('companies', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => users.id, { onDelete: 'cascade' }),
	createdAt: text('created_at')
		.default(sql`CURRENT_TIMESTAMP`)
		.notNull(),
	name: text('name').notNull()
});
export const companiesRelation = relations(companies, ({ many }) => ({ products: many(products) }));

export type SelectCompanies = InferSelectModel<typeof companies>;
export type InsertCompanies = InferInsertModel<typeof companies>;

export const products = sqliteTable('products', {
	id: text('id').primaryKey(),
	createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
	companyId: text('company_id')
		.notNull()
		.references(() => companies.id, {
			onDelete: 'cascade'
		}),
	name: text('name').notNull(),
	price: real('price').notNull(),
	quantity: integer('quantity').notNull(),
	category: text('category').notNull(),
	description: text('description').notNull(),
	ingredients: text('ingredients').notNull(),
	featured: integer('featured').notNull(),
	archived: integer('archived').notNull()
});
export const productsRelation = relations(products, ({ many, one }) => ({
	images: many(images),
	company: one(companies, {
		fields: [products.companyId],
		references: [companies.id]
	})
}));

export type SelectProduct = InferSelectModel<typeof products>;
export type InsertProduct = InferInsertModel<typeof products>;

export const images = sqliteTable('images', {
	id: text('id').primaryKey(),
	createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
	productId: text('product_id')
		.notNull()
		.references(() => products.id, { onDelete: 'cascade' }),
	imagePublicId: text('image_public_id').notNull(),
	imageUrl: text('image_url').notNull()
});
export const imagesRelation = relations(images, ({ one }) => ({
	product: one(products, {
		fields: [images.productId],
		references: [products.id]
	})
}));

export type SelectImages = InferSelectModel<typeof images>;
export type InsertImages = InferInsertModel<typeof images>;

export const cart = sqliteTable('cart', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	addedAt: text('added_at').default(sql`CURRENT_TIMESTAMP`),
	userId: text('user_id')
		.notNull()
		.references(() => users.id, { onDelete: 'cascade' }),
	productId: text('product_id').references(() => products.id, { onDelete: 'cascade' })
});
export const cartRelation = relations(cart, ({ one }) => ({
	user: one(users, {
		fields: [cart.userId],
		references: [users.id]
	}),
	product: one(products, {
		fields: [cart.productId],
		references: [products.id]
	})
}));

export type SelectCart = InferSelectModel<typeof cart>;
export type InsertCart = InferInsertModel<typeof cart>;

export const favorite = sqliteTable('favorite', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	addedAt: text('added_at').default(sql`CURRENT_TIMESTAMP`),
	userId: text('user_id')
		.notNull()
		.references(() => users.id, { onDelete: 'cascade' }),
	productId: text('product_id').references(() => products.id, { onDelete: 'cascade' })
});
export const favoriteRelation = relations(favorite, ({ one }) => ({
	user: one(users, {
		fields: [favorite.userId],
		references: [users.id]
	}),
	product: one(products, {
		fields: [favorite.productId],
		references: [products.id]
	})
}));
export type SelectFavorite = InferSelectModel<typeof favorite>;
export type InsertFavorite = InferInsertModel<typeof favorite>;

export const orders = sqliteTable('orders', {
	id: text('id').primaryKey(),
	createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
	userId: text('user_id')
		.notNull()
		.references(() => users.id),
	fulfilledAt: text('fulfilled_at'),
	status: text('status').default('pending'),
	address: text('address'),
	phone: text('phone')
});
export const orderRelation = relations(orders, ({ many }) => ({
	orderProducts: many(orderProduct)
}));
export type SelectOrders = InferSelectModel<typeof orders>;
export type InsertOrders = InferInsertModel<typeof orders>;

export const orderProduct = sqliteTable('order_product', {
	id: text('id').primaryKey(),
	createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
	companyId: text('company_id')
		.notNull()
		.references(() => companies.id),
	orderId: text('order_id')
		.notNull()
		.references(() => orders.id, { onDelete: 'cascade' }),
	productId: text('product_id')
		.notNull()
		.references(() => products.id, { onDelete: 'cascade' }),
	quantity: integer('quantity').notNull()
});
export const orderProductRelation = relations(orderProduct, ({ one }) => ({
	order: one(orders, {
		fields: [orderProduct.orderId],
		references: [orders.id]
	}),
	product: one(products, {
		fields: [orderProduct.productId],
		references: [products.id]
	})
}));
export type SelectOrdersProduct = InferSelectModel<typeof orderProduct>;
export type InsertOrdersProduct = InferInsertModel<typeof orderProduct>;
