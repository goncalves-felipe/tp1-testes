import { Body, Controller, Post, Get, Param, Patch, Delete } from '@nestjs/common';
import { ProductDto } from '../resource/product-dto';
import { ProductService } from 'src/domain/service/product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  createProduct(@Body() createProductBody: ProductDto): ProductDto {
    try {
      const newProduct = this.productService.createProduct(createProductBody);
      return newProduct;
    } catch (error) {
      throw error;
    }
  }

  @Patch(':id')
  editProduct(@Param('id') productId: number, @Body() updatedProductData: ProductDto): ProductDto {
    try {
      const updatedProduct = this.productService.editProduct(productId, updatedProductData);
      return updatedProduct;
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id')
  deleteProduct(@Param('id') productId: number): string {
    try {
      const deletedProductId = this.productService.deleteProduct(productId);
      if (deletedProductId) {
        return `Product ID ${deletedProductId} deleted.`;
      } else {
        return `Product ID ${productId} not found.`;
      }
    } catch (error) {
      throw error;
    }
  }
}

