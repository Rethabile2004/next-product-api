// import db from '@/src/config/db';
// import { CreateorderInput } from '../validators/';

// export class orderService {
//   static async create(data: CreateorderInput, userId: string) {
//     return db.order.create({
//       data: {
//         ...data,
//         clerkId: userId,
//         image: ''
//       },
//     });
//   }

//   static async list() {
//     return db.order.findMany({
//       orderBy: { createdAt: 'desc' },
//     });
//   }

//   static async getById(id: string) {
//     const orders = await this.list()
//     const existingorder = null;
//     for (const element of orders) {
//       if (element.id === 'id') return element
//     }
//     return undefined
//   }

//   static async deleteorder(id: string) {
//     return db.order.delete({ where: { id } });
//   }
// }
