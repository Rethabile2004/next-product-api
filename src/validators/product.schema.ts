import { z } from 'zod';

export const createProductSchema = z.object({
  name: z.string().min(2).max(30),
  company: z.string().min(2),
  price: z.coerce.number().min(0).int(), 
  description: z.string().min(50),
  featured: z.coerce.boolean(),
  
  image: z.string().url().optional(),
  clerkId: z.string(),
});

export type CreateProductInput = z.infer<typeof createProductSchema>;

export const productModelSchema = createProductSchema.extend({
    id: z.string(), 
    createdAt: z.coerce.date(), 
    updatedAt: z.coerce.date(),
    image: z.string().url(),
});

export type ProductModel = z.infer<typeof productModelSchema>;
