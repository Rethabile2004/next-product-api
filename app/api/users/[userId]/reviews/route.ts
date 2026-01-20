import { NextResponse } from 'next/server';
import { ReviewService } from '@/src/services/review.service';
import { createReviewSchema } from '@/src/validators/review.schema';

type Params = {
  params: {
    userId: string;
  };
};

export async function GET(
  req: Request,
  { params }: Params
) {
  const reviews = await ReviewService.listByUser(params.userId);
  return NextResponse.json(reviews);
}

export async function POST(req: Request) {
  const body = await req.json();
  const data = createReviewSchema.parse(body);

  const review = await ReviewService.create(data);

  return NextResponse.json(review, { status: 201 });
}
