import { z } from 'zod'

export const createCartSchema = z.object({
    clerkId: z.string(),
    numItemsInCart: z.coerce.number().min(0, { message: 'NumItemsInCart must have a positive value' }),
    cartTotal: z.coerce.number().min(0, { message: 'cartTotal must have a positive value' }),
    shipping: z.coerce.number().min(0, { message: 'shipping must have a positive value' }),
    tax: z.coerce.number().min(0, { message: 'tax must have a positive value' }),
    taxRate: z.coerce.number().min(0, { message: 'taxRate must have a positive value' }),
    orderTotal: z.coerce.number().min(0, { message: 'orderTotal must have a positive value' }),
    updatedAt:z.date(),
    createdAt:z.date(),
    id:z.string(),
    
})

export type createCartInput = z.infer<typeof createCartSchema>

// model Cart {
//   id             String     @id
//   clerkId        String
//   numItemsInCart Int        @default(0)
//   cartTotal      Int        @default(0)
//   shipping       Int        @default(5)
//   tax            Int        @default(0)
//   taxRate        Float      @default(0.1)
//   orderTotal     Int        @default(0)
//   createdAt      DateTime   @default(now())
//   updatedAt      DateTime
//   CartItem       CartItem[]
// }