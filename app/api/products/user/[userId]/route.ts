import { ProductService } from "@/src/services/product.service";
import { createProductSchema } from "@/src/validators/product.schema";
import { NextResponse } from "next/server";

type Params = {
    params: Promise<{ userId: string }>
}

export async function POST(req: Request, { params }: Params) {
    try {
        const { userId } = await params;
        const body = await req.json();
        const data = createProductSchema.safeParse(body);
        if (!data.success) {
            return NextResponse.json({ message: 'Invalid data', errors: data.error.message }, { status: 400 })
        }
        const product = await ProductService.create(data.data, userId);
        return NextResponse.json(product, { status: 201 });

    } catch (error) {
        return NextResponse.json({
            message: 'Internal Server Error'
        }, { status: 500 })
    }
}