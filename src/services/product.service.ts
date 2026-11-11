import db from '@/src/config/db';
import { CreateProductInput, createProductSchema } from '../validators/product.schema';
import { cacheProduct, cacheProducts, fallbackStore, withDatabaseFallback } from './database-fallback';

export class ProductService {
  static async create(data: CreateProductInput, userId: string) {
    return withDatabaseFallback(
      () => db.product.create({
        data: {
          ...data,
          clerkId: userId,
          image: ''
        },
      }),
      () => {
        const product = {
          ...data,
          id: crypto.randomUUID(),
          clerkId: userId,
          image: data.image ?? '',
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        fallbackStore.products.unshift(product);
        return product;
      },
      cacheProduct,
    );
  }

  static async list() {
    return withDatabaseFallback(
      () => db.product.findMany({ orderBy: { createdAt: 'desc' } }),
      () => [...fallbackStore.products].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()),
      cacheProducts,
    );
  }

  static async getById(id: string) {
    return withDatabaseFallback(
      () => db.product.findUnique({ where: { id } }),
      () => fallbackStore.products.find((product) => product.id === id) ?? null,
      (product) => product && cacheProduct(product),
    );
  }

  static async updateById(id: string, body: any) {
    const newData = createProductSchema.safeParse(body)

    if (!newData.success) {
      return null
    }
    return withDatabaseFallback(
      () => db.product.update({ where: { id }, data: { ...newData.data } }),
      () => {
        const product = fallbackStore.products.find((item) => item.id === id);
        if (!product) return null;
        Object.assign(product, newData.data, { updatedAt: new Date() });
        return product;
      },
    );
  }

  static async deleteProduct(id: string) {
    return withDatabaseFallback(
      () => db.product.delete({ where: { id } }),
      () => {
        const index = fallbackStore.products.findIndex((product) => product.id === id);
        return index === -1 ? null : fallbackStore.products.splice(index, 1)[0];
      },
    );
  }
}
