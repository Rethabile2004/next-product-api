import db from '@/src/config/db';
import { CreateProductInput } from '../validators/product.schema';

export class ProductService {
  static async create(data: CreateProductInput, userId: string) {
    return db.product.create({
      data: {
        ...data,
        clerkId: userId,
      },
    });
  }

  static async list() {
    return db.product.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  static async getById(id: string) {
    return db.product.findUnique({ where: { id } });
  }

  static async deleteProduct(id: string) {
    return db.product.delete({ where: { id } });
  }
}
