import { NextResponse } from 'next/server';
import { createProductSchema } from '@/src/validators/product.schema';
import { ProductService } from '@/src/services/product.service';

export async function GET() {
    const products = await ProductService.list();
    return NextResponse.json(products);
}

export async function POST(req: Request) {
    const body = await req.json();
    const data = createProductSchema.parse(body);
    const userId = 'demo-user';

    const product = await ProductService.create(data, userId);
    return NextResponse.json(product, { status: 201 });
}