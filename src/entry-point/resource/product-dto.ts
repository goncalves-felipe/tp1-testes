import { Product } from '../../domain/entity/product.entity';

export class ProductDto {
  public id?: number;
  public name: string;
  public description: string;
  public price: number;
}

export const mapProductDtoFromEntity = (entity: Product) => {
  const productDto: ProductDto = new ProductDto();

  productDto.id = entity.id;
  productDto.name = entity.name;
  productDto.price = entity.price;
  productDto.description = entity.description;

  return productDto;
};
