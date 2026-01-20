// model Review {
//   id             String   @id
//   clerkId        String
//   rating         Int
//   comment        String
//   authorName     String
//   authorImageUrl String
//   createdAt      DateTime @default(now())
//   updatedAt      DateTime
//   productId      String
//   Product        Product  @relation(fields: [productId], references: [id], onDelete: Cascade)
// }
import { z } from "zod"

export const createReviewShema = z.object({
    rating: z.coerce.number().min(0, { message: 'Rating must be between 0 and 5' }).max(5, { message: 'Rating must be between 0 and 5' }),
    comment: z.string().refine((v) => {
        let length = v.split('');
        if (length.length < 10) {
            return { message: 'Comment must have more than 10 characters' }
        }
    }),
    authorImageUrl: z.string().url().optional(),
    authorName: z.string().min(1, { message: 'Author name is required' }),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
    productId: z.string().min(1, { message: 'Product Id is required' })
})

export type createReviewShema = z.infer<typeof createReviewShema>