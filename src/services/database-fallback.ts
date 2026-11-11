const DATABASE_TIMEOUT_MS = 2_500;

export type FallbackProduct = {
  id: string;
  name: string;
  company: string;
  description: string;
  featured: boolean;
  image: string | null;
  price: number;
  clerkId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type FallbackReview = {
  id: string;
  clerkId: string;
  rating: number;
  comment: string;
  authorName: string;
  authorImageUrl: string;
  productId: string;
  createdAt: Date;
  updatedAt: Date;
};

const now = new Date("2026-01-01T00:00:00.000Z");

const products: FallbackProduct[] = [
  {
    id: "demo-mechanical-keyboard",
    name: "Nova Mechanical Keyboard",
    company: "DemoTech",
    description: "A demonstration mechanical keyboard with hot-swappable switches, compact layout, and a comfortable typing profile for everyday work.",
    featured: true,
    image: "https://placehold.co/800x600?text=Nova+Keyboard",
    price: 12999,
    clerkId: "demo-user",
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "demo-noise-cancelling-headphones",
    name: "Orbit Noise Cancelling Headphones",
    company: "DemoTech",
    description: "A demonstration over-ear headphone set with active noise cancellation, soft ear cushions, and reliable wireless playback for travel.",
    featured: true,
    image: "https://placehold.co/800x600?text=Orbit+Headphones",
    price: 18999,
    clerkId: "demo-user",
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "demo-desk-lamp",
    name: "Focus LED Desk Lamp",
    company: "DemoHome",
    description: "A demonstration adjustable LED desk lamp with warm and cool light modes, touch controls, and a compact footprint for focused work.",
    featured: false,
    image: "https://placehold.co/800x600?text=Focus+Lamp",
    price: 4999,
    clerkId: "demo-user",
    createdAt: now,
    updatedAt: now,
  },
];

const reviews: FallbackReview[] = [
  {
    id: "demo-review-1",
    clerkId: "demo-user",
    productId: "demo-mechanical-keyboard",
    rating: 5,
    comment: "Excellent demo product data for keeping the interface usable while the database is unavailable.",
    authorName: "Demo User",
    authorImageUrl: "",
    createdAt: now,
    updatedAt: now,
  },
];

export const fallbackStore = {
  products,
  reviews,
};

export function cacheProducts(items: FallbackProduct[]) {
  fallbackStore.products.splice(0, fallbackStore.products.length, ...items);
}

export function cacheProduct(item: FallbackProduct) {
  const index = fallbackStore.products.findIndex((product) => product.id === item.id);
  if (index === -1) fallbackStore.products.unshift(item);
  else fallbackStore.products[index] = item;
}

export function cacheReviewsForUser(userId: string, items: FallbackReview[]) {
  const otherReviews = fallbackStore.reviews.filter((review) => review.clerkId !== userId);
  fallbackStore.reviews.splice(0, fallbackStore.reviews.length, ...otherReviews, ...items);
}

/**
 * Keeps database outages from taking down API routes. A timed-out request is
 * treated exactly like a failed request, so callers can return local data.
 */
export async function withDatabaseFallback<T>(
  databaseAction: () => Promise<T>,
  fallbackAction: () => T | Promise<T>,
  cacheResult?: (result: T) => void,
): Promise<T> {
  let timeout: ReturnType<typeof setTimeout> | undefined;

  try {
    const result = await Promise.race([
      databaseAction(),
      new Promise<T>((_, reject) => {
        timeout = setTimeout(
          () => reject(new Error("Database request timed out")),
          DATABASE_TIMEOUT_MS,
        );
      }),
    ]);
    cacheResult?.(result);
    return result;
  } catch {
    return fallbackAction();
  } finally {
    if (timeout) clearTimeout(timeout);
  }
}
