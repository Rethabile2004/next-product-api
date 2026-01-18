import { z } from 'zod';

export const createProductSchema = z.object({
  name: z.string().min(2).max(30),
  company: z.string().min(2),
  price: z.coerce.number().min(0),
  description: z.string().min(50),
  featured: z.coerce.boolean(),
});

export type CreateProductInput = z.infer<typeof createProductSchema>;
