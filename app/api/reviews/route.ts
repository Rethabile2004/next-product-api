import { NextResponse } from 'next/server';
import { ReviewService } from '@/src/services/review.service';

export async function DELETE(req: Request) {
  try {
    const body = await req.json();
    const { reviewId, userId } = body;

    await ReviewService.deleteById(String(reviewId), String(userId));

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Review not found' },
      { status: 404 }
    );
  }
}