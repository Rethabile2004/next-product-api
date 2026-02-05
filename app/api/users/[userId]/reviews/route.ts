import { NextResponse } from 'next/server';
import { ReviewService } from '@/src/services/review.service';
import { createReviewSchema } from '@/src/validators/review.schema';

type Params = {
  params: Promise<{
    userId: string;
  }>;
};

export async function GET(
  req: Request,
  { params }: Params
) {
  const { userId } = await params
  const reviews = await ReviewService.listByUser(userId);
  return NextResponse.json(reviews);
}

export async function POST(req: Request, { params }: Params) {
  try {
    const { userId } = await params
    const body = await req.json();
    const data = createReviewSchema.safeParse({ ...body, clerkId: userId });
    if (!data.success) {
      return NextResponse.json({
        message: 'Invalid data', errors: data.error.flatten().fieldErrors
      }, {
        status: 400
      })
    }
    const review = await ReviewService.create(data.data);
  
    return NextResponse.json(review, { status: 201 });
    
  } catch (error) {
    return NextResponse.json({
      message:'Internal Server Error'
    },{status:500})
  }
}
