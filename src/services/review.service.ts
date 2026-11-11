import prisma from '@/src/config/db';
import { CreateReviewInput } from '@/src/validators/review.schema';
import { cacheReviewsForUser, fallbackStore, withDatabaseFallback } from './database-fallback';

export class ReviewService {
  static async create(data: CreateReviewInput) {
    return withDatabaseFallback(
      () => prisma.review.create({
        data: {
          productId: data.productId,
          rating: data.rating,
          comment: data.comment,
          authorName: data.authorName,
          authorImageUrl: data.authorImageUrl! ?? null,
          clerkId: data.clerkId,
        },
      }),
      () => {
        const review = {
          ...data,
          id: crypto.randomUUID(),
          authorImageUrl: data.authorImageUrl ?? '',
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        fallbackStore.reviews.unshift(review);
        return review;
      },
    );
  }

  static async listByUser(userId: string) {
    return withDatabaseFallback(
      () => prisma.review.findMany({ where: { clerkId: userId }, orderBy: { createdAt: 'desc' } }),
      () => fallbackStore.reviews
        .filter((review) => review.clerkId === userId)
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()),
      (reviews) => cacheReviewsForUser(userId, reviews),
    );
  }

  static async deleteById(reviewId: string, userId: string) {
    return withDatabaseFallback(
      () => prisma.review.delete({ where: { id: reviewId, clerkId: userId } }),
      () => {
        const index = fallbackStore.reviews.findIndex(
          (review) => review.id === reviewId && review.clerkId === userId,
        );
        return index === -1 ? null : fallbackStore.reviews.splice(index, 1)[0];
      },
    );
  }
}
