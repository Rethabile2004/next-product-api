import { z } from 'zod';

export const createReviewSchema = z.object({
  productId: z.string(),
  rating: z.coerce.number().int().min(1).max(5),
  comment: z.string().min(10),
  authorName: z.string(),
  authorImageUrl: z.string().optional(),
  clerkId: z.string(),
});

export type CreateReviewInput = z.infer<
  typeof createReviewSchema
>;
