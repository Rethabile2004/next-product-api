import { ProductService } from "@/src/services/product.service";
import { NextResponse } from "next/server";

type Params = {

    params: {
        id: string
    }
}
// Promise<>
export async function GET(req: Request, { params }: Params) {
    const product = await ProductService.getById(params.id)

    if (!product) {
        return NextResponse.json(
            { message: 'Product not found' },
            { status: 404 }
        )
    }
    return NextResponse.json(product)
}


export async function DELETE(req: Request, { params }: Params) {
    try {
        const product = await ProductService.deleteProduct(params.id)
        return NextResponse.json(product)

    } catch (error) {
        return NextResponse.json(
            { message: 'Product not found' },
            { status: 400 }
        )
    }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const body = await req.json()

    try {
        const product = await ProductService.updateById(id, body)
        if (!product) {
            return NextResponse.json({ message: 'Product not found' }, { status: 404 })
        }
        return NextResponse.json(product)
    } catch (error) {
        return NextResponse.json(
            { message: 'Internal Server Error', error: error instanceof Error ? error.message : 'Error' },
            { status: 500 }
        )
    }
}