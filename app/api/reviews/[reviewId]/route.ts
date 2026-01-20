import { NextResponse } from 'next/server';
import { ReviewService } from '@/src/services/review.service';

type Params = {
  params: {
    reviewId: string;
  };
};

export async function DELETE(
  req: Request,
  { params }: Params
) {
  try {
    await ReviewService.deleteById(params.reviewId);
    return NextResponse.json(null, { status: 204 });
  } catch {
    return NextResponse.json(
      { message: 'Review not found' },
      { status: 404 }
    );
  }
}
