import prisma from '@/src/config/db';
import { CreateReviewInput } from '@/src/validators/review.schema';

export class ReviewService {
  static async create(data: CreateReviewInput) {
    return prisma.review.create({
      data: {
        productId: data.productId,
        rating: data.rating,
        comment: data.comment,
        authorName: data.authorName,
        authorImageUrl: data.authorImageUrl! ?? null,
        clerkId: data.clerkId,
      },
    });
  }

  static async listByUser(userId: string) {
    return prisma.review.findMany({
      where: { clerkId: userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  static async deleteById(reviewId: string) {
    return prisma.review.delete({
      where: { id: reviewId },
    });
  }
}
