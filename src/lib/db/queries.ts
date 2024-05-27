import { and, eq, ne, sql } from 'drizzle-orm';
import { db } from '.';
import * as schema from './schema';

export const checkIfUserExists = db
	.select()
	.from(schema.users)
	.where(eq(schema.users.email, sql.placeholder('email')))
	.prepare();

export const insertUser = db
	.insert(schema.users)
	.values({
		id: sql.placeholder('id'),
		email: sql.placeholder('email'),
		password: sql.placeholder('password')
	})
	.onConflictDoNothing()
	.prepare();

export const queryUsersCompanies = db
	.select()
	.from(schema.companies)
	.where(eq(schema.companies.userId, sql.placeholder('userId')))
	.prepare();

export const queryAllCompanyProducts = db
	.select()
	.from(schema.products)
	.where(eq(schema.products.companyId, sql.placeholder('companyId')))
	.prepare();

export const queryAllCompanyProductsWithImages = db.query.products
	.findMany({
		where: eq(schema.products.companyId, sql.placeholder('companyId')),
		with: {
			images: true
		}
	})
	.prepare();

export const queryProductById = db
	.select()
	.from(schema.products)
	.where(eq(schema.products.id, sql.placeholder('id')))
	.prepare();

export const queryProductByIdWithImages = db.query.products
	.findFirst({
		where: eq(schema.products.id, sql.placeholder('id')),
		with: {
			images: true
		}
	})
	.prepare();

export const queryFeaturedProducts = db
	.select()
	.from(schema.products)
	.where(eq(schema.products.featured, 1))
	.limit(sql.placeholder('limit'))
	.offset(sql.placeholder('offset'))
	.prepare();

export const queryFeaturedProductsWithImages = db.query.products
	.findMany({
		where: eq(schema.products.featured, 1),
		limit: sql.placeholder('limit'),
		offset: sql.placeholder('offset'),
		with: {
			images: true
		}
	})
	.prepare();

export const queryRelatedProductsWithImages = db.query.products
	.findMany({
		where: and(
			eq(schema.products.category, sql.placeholder('category')),
			ne(schema.products.id, sql.placeholder('productId'))
		),
		limit: 5,
		with: {
			images: true
		}
	})
	.prepare();

export const queryProductsByCategoryWithImages = db.query.products
	.findMany({
		where: eq(schema.products.category, sql.placeholder('category')),
		with: {
			images: true
		},
		limit: sql.placeholder('limit'),
		offset: sql.placeholder('offset')
	})
	.prepare();

export const queryCategories = db
	.selectDistinct({ category: schema.products.category })
	.from(schema.products)
	.orderBy(schema.products.category)
	.prepare();

export const queryUserProductsInCart = db.query.cart
	.findMany({
		where: eq(schema.cart.userId, sql.placeholder('userId')),
		with: {
			product: {
				with: {
					images: true
				}
			}
		},
		limit: sql.placeholder('limit'),
		offset: sql.placeholder('offset')
	})
	.prepare();

export const checkIfProductExistsInCart = db
	.select({ id: schema.cart.id })
	.from(schema.cart)
	.where(
		and(
			eq(schema.cart.userId, sql.placeholder('userId')),
			eq(schema.cart.productId, sql.placeholder('productId'))
		)
	)
	.prepare();

export const insertProductToUserCart = db
	.insert(schema.cart)
	.values({
		userId: sql.placeholder('userId'),
		productId: sql.placeholder('productId')
	})
	.returning()
	.prepare();

export const deleteProductFromUserCart = db
	.delete(schema.cart)
	.where(eq(schema.cart.id, sql.placeholder('id')))
	.returning()
	.prepare();

export const queryUserFavoriteProducts = db.query.favorite
	.findMany({
		where: eq(schema.favorite.userId, sql.placeholder('userId')),
		with: {
			product: {
				with: {
					images: true
				}
			}
		},
		limit: sql.placeholder('limit'),
		offset: sql.placeholder('offset')
	})
	.prepare();

export const checkIfProductExistsInFavorite = db
	.select({ id: schema.favorite.id })
	.from(schema.favorite)
	.where(
		and(
			eq(schema.favorite.userId, sql.placeholder('userId')),
			eq(schema.favorite.productId, sql.placeholder('productId'))
		)
	)
	.prepare();

export const insertProductToFavorite = db
	.insert(schema.favorite)
	.values({
		userId: sql.placeholder('userId'),
		productId: sql.placeholder('productId')
	})
	.returning()
	.prepare();

export const deleteProductFromFavorite = db
	.delete(schema.favorite)
	.where(eq(schema.favorite.id, sql.placeholder('id')))
	.returning()
	.prepare();

export const insertProduct = db
	.insert(schema.products)
	.values({
		id: sql.placeholder('id'),
		companyId: sql.placeholder('companyId'),
		name: sql.placeholder('name'),
		price: sql.placeholder('price'),
		category: sql.placeholder('category'),
		description: sql.placeholder('description'),
		ingredients: sql.placeholder('ingredients'),
		featured: sql.placeholder('featured'),
		archived: sql.placeholder('archived')
	})
	.prepare();

export const deleteProduct = db
	.delete(schema.products)
	.where(eq(schema.products.id, sql.placeholder('id')))
	.returning()
	.prepare();

// export const deleteProducts = db
// 	.delete(schema.products)
// 	.where(inArray(schema.products.id, sql.placeholder('productIds')))
// 	.returning()
// 	.prepare();

export async function deleteImages(productIds: string[]) {
	return Promise.all(productIds.map((productId) => deleteImagesOfProduct.all({ productId })));
}

export const deleteImagesOfProduct = db
	.delete(schema.images)
	.where(eq(schema.images.productId, sql.placeholder('productId')))
	.returning()
	.prepare();

export const insertCompany = db
	.insert(schema.companies)
	.values({
		id: sql.placeholder('id'),
		name: sql.placeholder('name'),
		userId: sql.placeholder('userId')
	})
	.prepare();

export const deleteCompany = db
	.delete(schema.companies)
	.where(eq(schema.companies.id, sql.placeholder('companyId')))
	.returning()
	.prepare();

export const queryProductsByName = async (name: string, limit: number = 10, offset: number = 0) => {
	const res = await db.run(
		sql`SELECT products.id, products.name FROM products INNER JOIN products_fts ON products_fts.product_id = products.id WHERE products_fts MATCH 'product_name:' || ${name} ORDER BY rank LIMIT ${limit} OFFSET ${offset}`
	);
	return res.rows.map((val) => ({ id: val.id, name: val.name })) as { id: string; name: string }[];
};
