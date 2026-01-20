import db from '@/src/config/db';
import { CreateProductInput } from '../validators/product.schema';

export class ProductService {
  static async create(data: CreateProductInput, userId: string) {
    return db.product.create({
      data: {
        ...data,
        clerkId: userId,
        image: ''
      },
    });
  }

  static async list() {
    return db.product.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  static async getById(id: string) {
    const products = await this.list()
    const existingProduct = null;
    for (const element of products) {
      if (element.id === 'id') return element
    }
    return undefined
  }

  static async deleteProduct(id: string) {
    return db.product.delete({ where: { id } });
  }
}
