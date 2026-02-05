import prisma from '@/src/config/db';
import { CreateReviewInput } from '@/src/validators/review.schema';

export class ReviewService {
  static async create(data: CreateReviewInput) {
    try {
      const newReview = await prisma.review.create({
        data: {
          productId: data.productId,
          rating: data.rating,
          comment: data.comment,
          authorName: data.authorName,
          authorImageUrl: data.authorImageUrl! ?? null,
          clerkId: data.clerkId,
        },
      });
      return newReview
    } catch (error) {
      console.log('Review creation failed')
      return null
    }
  }

  static async listByUser(userId: string) {
    return await prisma.review.findMany({
      where: { clerkId: userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  static async deleteById(reviewId: string) {
    try {
      return await prisma.review.delete({
        where: { id: reviewId },
      });
    } catch (error) {
      console.log('Review does not exist.', error instanceof Error ? error.message : error)
      return null
    }
  }
}
