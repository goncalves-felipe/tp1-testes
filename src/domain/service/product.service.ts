import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ProductDto } from '../../entry-point/resource/product-dto';
import { Product } from '../entity/product.entity';

@Injectable()
export class ProductService {
  createProduct(createProductData: ProductDto): ProductDto {
    const { name, description, price } = createProductData;

    if (!name || !description || !price) {
        throw 'There should be no empty fields.';
    }
    
    const newProduct: ProductDto = {
      id: 1,
      name: createProductData.name,
      description: createProductData.description,
      price: createProductData.price,
    };

    return newProduct;
  }

  getProduct(productId: number): ProductDto {
    if (!productId) {
      throw new HttpException('Invalid product ID', HttpStatus.BAD_REQUEST);
    }
    
    if (productId === 1) {
      return {
        id: 1,
        name: 'Sample Product',
        description: 'A sample product description.',
        price: 19.99,
      };
    } else {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }
  }

  editProduct(productId: number, updatedProductData: ProductDto): ProductDto {
    if (!productId) {
      throw 'Invalid product ID';
    }

    const existingProduct = this.productRepository.getProductById(productId);

    if (!existingProduct) {
      throw 'Product not found';
    }

    existingProduct.name = updatedProductData.name || existingProduct.name;
    existingProduct.description = updatedProductData.description || existingProduct.description;
    existingProduct.price = updatedProductData.price || existingProduct.price;
    
    return {
      id: productId,
      name: existingProduct.name,
      description: existingProduct.description,
      price: existingProduct.price,
    };
  }

  deleteProduct(productId: number): number {
   
    if (!productId) {
      throw 'Invalid product ID';
    }

    const deletedProductId = this.productRepository.deleteProduct(productId);

    if (!deletedProductId) {
      throw 'Product not found';
    }

    return deletedProductId;
  }
}
