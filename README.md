
# Next Products API

Simple REST API built with Next.js App Router for managing products and user reviews. Uses Prisma + PostgreSQL.

Current status: Early development. Endpoints are inconsistent and half-documented.

## Tech Stack

- Next.js 16.1.3 (App Router)
- React 19
- Prisma 7.2.0 (with @prisma/adapter-pg)
- PostgreSQL (via pg driver)
- Tailwind CSS 4
- TypeScript

### Tools Used

<!-- Add your badges / icons here manually -->
<!-- Examples: -->
 ![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat&logo=next.js&logoColor=white) 
 ![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=flat&logo=prisma&logoColor=white) 
 ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat&logo=postgresql&logoColor=white)
 ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)
 ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white) 

## API Endpoints

### Products – List all

**GET /api/products**

Retrieve all existing products.

Response example:

![All products response](https://github.com/user-attachments/assets/003b89f9-a7ff-4fde-a2d0-6abd060cab1e)

### Products – By user

**GET /api/products/user/[userId]**

Get products created by a specific user.

Example: `/api/products/user/user_37fHFIL9jDG7o7HpH7scyinOW5w`

Response example:

![User products response](https://github.com/user-attachments/assets/56b0ef82-9461-45f7-a425-40a0081f6380)

### Products – Single

**GET /api/products/[id]**

Retrieve data for one product.

Example: `/api/products/5e25e54b-f597-4a5d-bbfa-504383c4ae7d`

Response example:

![Single product response](https://github.com/user-attachments/assets/016a533a-dd0d-49bd-b689-2bb2cec8d920)

### Create Product (assumed route: POST /api/products/)

Body example you seem to be sending:

```json
{
  "name": "Quantum Ergonomic Chair",
  "id": "prod_3k9f2l8m0n5p",
  "company": "NextLevel Office",
  "description": "High-performance ergonomic chair with 4D armrests, breathable mesh, and dynamic lumbar support designed for long work sessions.",
  "featured": true,
  "image": "https://images.unsplash.com",
  "price": 49999,
  "createdAt": "2024-05-15T08:00:00.000Z",
  "updatedAt": "2024-05-20T14:45:00.000Z",
  "clerkId": "user_2p8kL9wXqR4vMTyZ1n0s"
}
```

Still trash: you're forcing the `id` from the client. Let the DB generate it or you're begging for collisions.

### Reviews – By user

**GET /api/users/[userId]/reviews**

Get reviews written by a user.

Example: `/api/users/user_37fHFIL9jDG7o7HpH7scyinOW5w/reviews`

Response example:

![User reviews response](https://github.com/user-attachments/assets/6d2d4ce3-0e5e-4699-b2c4-3a6d952fdf7c)

### Reviews – Delete

**DELETE /api/reviews**

Body:

```json
{
  "userId": "user_37fHFIL9jDG7o7HpH7scyinOW5w",
  "reviewId": "57754136-dee6-47eb-98db-89a8ce6a9af1"
}
```

Response example:

![Delete review response](https://github.com/user-attachments/assets/b79438fa-a989-4c6e-bcb8-b7f7af53ce66)

DELETE with body is non-standard garbage. Most clients and proxies will quietly drop the body. Use `/api/reviews/[reviewId]` with auth check on the user — way cleaner.

## Development

```bash
npm install
npm run dev
npm run build
npm run start
```
