import { ReviewService } from "@/src/services/review.service";
import { NextResponse } from "next/server";

export async function GET() {
    const reviews = await ReviewService.list()
    return NextResponse.json(reviews)
}

