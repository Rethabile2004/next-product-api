import { NextResponse } from 'next/server';
import { ReviewService } from '@/src/services/review.service';

type Params = {
  params: Promise<{
    reviewId: string;
    userId: string
  }>;
};

export async function DELETE(req: Request, { params }: Params) {
  try {
    const body = await req.json();
    const { reviewId, userId } = body;

    await ReviewService.deleteById(String(reviewId), String(userId));

    // Correct way to return 204: No .json() wrapper
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Review not found' },
      { status: 404 }
    );
  }
}