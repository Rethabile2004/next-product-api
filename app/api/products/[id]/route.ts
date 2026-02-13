import { ProductService } from "@/src/services/product.service";
import { NextResponse } from "next/server";

type Params = {
    params: Promise<{ id: string }>
}

export async function GET(req: Request, { params }: Params) {
    const { id } = await params
    const product = await ProductService.getById(id)

    if (!product) {
        return NextResponse.json(
            { message: 'Product not found' },
            { status: 404 }
        )
    }
    return NextResponse.json(product)
}
