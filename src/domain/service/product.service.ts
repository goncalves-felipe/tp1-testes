import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ProductDto } from '../../entry-point/resource/product-dto';
import { ProductRepository } from '../repository/product.repository';
import { Product } from '../entity/product.entity';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  createProduct(createProductData: ProductDto): ProductDto {
    const { name, description, price } = createProductData;

    if (!name || !description || !price) {
      throw new HttpException(
        'There sould be no empty fields',
        HttpStatus.BAD_REQUEST,
      );
    }

    const newProductId =
      this.productRepository.createProduct(createProductData);

    const newProduct: ProductDto = {
      id: newProductId,
      name: createProductData.name,
      description: createProductData.description,
      price: createProductData.price,
    };

    return newProduct;
  }

  getProduct(productId: number): ProductDto {
    if (!productId) {
      throw new HttpException('Invalid product id', HttpStatus.BAD_REQUEST);
    }

    const product = this.productRepository.getProduct(productId);

    if (!product) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }

    return product;
  }

  getProducts(): ProductDto[] {
    const products = this.getProducts();

    if (!products || !products.length) {
      throw new HttpException('No products found', HttpStatus.NOT_FOUND);
    }

    return products;
  }

  editProduct(productId: number, updatedProductData: ProductDto): ProductDto {
    if (!productId) {
      throw new HttpException('Invalid product id', HttpStatus.BAD_REQUEST);
    }

    const product = this.productRepository.getProduct(productId);

    if (!product) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }

    const updatedProduct: Product = {
      ...updatedProductData,
      name: updatedProductData.name || product.name,
      description: updatedProductData.description || product.description,
      price: updatedProductData.price || product.price,
    };

    this.productRepository.editProduct(updatedProduct);

    return updatedProduct;
  }

  deleteProduct(productId: number) {
    if (!productId) {
      throw new HttpException('Invalid product id', HttpStatus.BAD_REQUEST);
    }

    this.productRepository.deleteProduct(productId);
  }
}
