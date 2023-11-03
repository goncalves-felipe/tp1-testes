import {
  Body,
  Controller,
  Post,
  Param,
  Patch,
  Delete,
  Get,
} from '@nestjs/common';
import { ProductDto } from '../resource/product-dto';
import { ProductService } from 'src/domain/service/product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  createProduct(@Body() createProductBody: ProductDto): ProductDto {
    const newProduct = this.productService.createProduct(createProductBody);
    return newProduct;
  }

  @Get()
  getProducts(): ProductDto[] {
    return this.productService.getProducts();
  }

  @Get(':id')
  getProduct(@Param('id') productId: number): ProductDto {
    const product = this.productService.getProduct(productId);
    return product;
  }

  @Patch(':id')
  editProduct(
    @Param('id') productId: number,
    @Body() updatedProductData: ProductDto,
  ): ProductDto {
    const updatedProduct = this.productService.editProduct(
      productId,
      updatedProductData,
    );

    return updatedProduct;
  }

  @Delete(':id')
  deleteProduct(@Param('id') productId: number) {
    this.productService.deleteProduct(productId);
  }
}
