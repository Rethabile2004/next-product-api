import { NextResponse } from 'next/server';
import { ProductService } from '@/src/services/product.service';

export async function GET() {
    const products = await ProductService.list();
    return NextResponse.json(products);
}