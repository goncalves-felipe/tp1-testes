import { Injectable } from '@nestjs/common';
import { ProductDto } from 'src/entry-point/resource/product-dto';
import { Product } from '../entity/product.entity';

@Injectable()
export class ProductRepository {
  createProduct(productDto: ProductDto): number {
    // TODO
    return 1;
  }

  getProduct(productId: number): Product | null {
    return {
      id: 1,
      name: 'Sample Product',
      description: 'A sample product description.',
      price: 19.99,
    };
  }

  deleteProduct(productId: number): number {
    // TODO
    return 1;
  }

  editProduct(productId: number, editProduct: Product): void {
    // TODO
  }
}