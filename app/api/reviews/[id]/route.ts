import { ReviewService } from "@/src/services/review.service"
import { NextResponse } from "next/server"

type Params = {
    params: {
        id: string,
    }
}
export async function GET({ params }: Params) {
    const userReviews = await ReviewService.getReviewsById(params.id)
    return NextResponse.json(userReviews)
}