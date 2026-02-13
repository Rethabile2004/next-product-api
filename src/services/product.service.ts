import db from '@/src/config/db';
import { CreateProductInput, createProductSchema } from '../validators/product.schema';

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
    console.log(id);
    console.log(id);
    console.log(id);
    console.log(id);
    console.log(id);
    console.log(id);
    
    const product = await db.product.findUnique({
      where: { id }
    })
    console.log(product);
    
    return product
  }

  static async updateById(id: string, body: any) {
    const newData = createProductSchema.safeParse(body)

    if (!newData.success) {
      return null
    }
    const product = await db.product.findUnique({
      where: { id }
    })
    try {
      const updatedProduct = await db.product.update({
        where: {
          id
        },
        data: {
          ...newData.data
        }
      })
      return updatedProduct
    } catch (error) {
      return null
    }
  }

  static async deleteProduct(id: string) {
    try {
      return await db.product.delete({ where: { id } });
    } catch (error) {
      return null
    }
  }
}
