import prisma from "../config/db"
import { createCartInput } from "../validators/cart.schema"

export class CartService {
    static list = async () => {
        return prisma.cart.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        })
    }
    static getById = async (id: string) => {
        //id as in user Id
        return prisma.cart.findFirst({
            where: {
                clerkId: id
            }
        })
    }
    static create = async (cart: createCartInput) => {
        return prisma.cart.create({
            data: {
                ...cart
            }
        })
    }
} 