import prisma from "../config/db"
import { createReviewShema } from "../validators/review.schema"

export class ReviewService {
    static async create(data: createReviewShema, userId: string) {
        const { comment, createdAt, productId, rating, updatedAt, authorImageUrl } = data
        await prisma.review.create({
            data: {
                comment,
                createdAt,
                productId,
                rating,
                updatedAt,
                authorImageUrl: authorImageUrl ? '' : authorImageUrl!,
                authorName: '',
                clerkId: userId,
            }
        })
    }
    static async list() {
        return prisma.review.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        })
    }
    static async getReviewsById(id: string) {
        const reviews = await prisma.review.findMany({
            where: {
                clerkId: id
            },
            orderBy: {
                createdAt: 'desc'
            }
        })
        return reviews
    }

}