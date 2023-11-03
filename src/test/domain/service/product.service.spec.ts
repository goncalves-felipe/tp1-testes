import { ProductDto } from '../../../entry-point/resource/product-dto';
import { ProductRepository } from '../../../domain/repository/product.repository';
import { ProductService } from '../../../domain/service/product.service';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Product } from 'src/domain/entity/product.entity';

describe('ProductService', () => {
  let productService: ProductService;
  let productRepository: ProductRepository;

  beforeEach(() => {
    productRepository = new ProductRepository();
    productService = new ProductService(productRepository);
  });

  describe('createProduct', () => {
    it('should throw error when name is empty', () => {
      const product: ProductDto = {
        name: '',
        description: 'description',
        price: 1,
      };

      const result = () => productService.createProduct(product);

      expect(result).toThrow(
        new HttpException(
          'There sould be no empty fields',
          HttpStatus.BAD_REQUEST,
        ),
      );
    });

    it('should throw error when description is empty', () => {
      const product: ProductDto = {
        name: 'name',
        description: '',
        price: 1,
      };

      const result = () => productService.createProduct(product);

      expect(result).toThrow(
        new HttpException(
          'There sould be no empty fields',
          HttpStatus.BAD_REQUEST,
        ),
      );
    });

    it('should throw error when price is 0', () => {
      const product: ProductDto = {
        name: 'name',
        description: 'description',
        price: 0,
      };

      const result = () => productService.createProduct(product);

      expect(result).toThrow(
        new HttpException(
          'The price value should be greater than 0',
          HttpStatus.BAD_REQUEST,
        ),
      );
    });

    it('should throw error when price is lower than 0', () => {
      const product: ProductDto = {
        name: 'name',
        description: 'description',
        price: -1,
      };

      const result = () => productService.createProduct(product);

      expect(result).toThrow(
        new HttpException(
          'The price value should be greater than 0',
          HttpStatus.BAD_REQUEST,
        ),
      );
    });

    it('should return the new product', () => {
      const product: ProductDto = {
        name: 'name',
        description: 'description',
        price: 1,
      };
      const expectedProduct: ProductDto = {
        name: 'name',
        description: 'description',
        price: 1,
        id: 1,
      };

      jest
        .spyOn(productRepository, 'createProduct')
        .mockImplementation(() => 1);

      const result = productService.createProduct(product);

      expect(result).toEqual(expectedProduct);
    });
  });

  describe('getProduct', () => {
    it('should throw error when id is invalid', () => {
      const productId = 0;

      const result = () => productService.getProduct(productId);

      expect(result).toThrow(
        new HttpException('Invalid product id', HttpStatus.BAD_REQUEST),
      );
    });

    it('should throw error when product is not found', () => {
      const productId = 1;

      jest
        .spyOn(productRepository, 'getProduct')
        .mockImplementation(() => null);

      const result = () => productService.getProduct(productId);

      expect(result).toThrow(
        new HttpException('Product not found', HttpStatus.NOT_FOUND),
      );
    });

    it('should return the product', () => {
      const productId = 1;
      const product: Product = {
        id: productId,
        name: 'name',
        description: 'description',
        price: 1,
      };
      const expectedProduct: Product = {
        id: productId,
        name: 'name',
        description: 'description',
        price: 1,
      };

      jest
        .spyOn(productRepository, 'getProduct')
        .mockImplementation(() => product);

      const result = productService.getProduct(productId);

      expect(result).toEqual(expectedProduct);
    });
  });

  describe('getProducts', () => {
    it('should throw error when result is null', () => {
      jest
        .spyOn(productRepository, 'getProducts')
        .mockImplementation(() => null);

      const result = () => productService.getProducts();

      expect(result).toThrow(
        new HttpException('No products found', HttpStatus.NOT_FOUND),
      );
    });

    it('should throw error when result is empty', () => {
      jest.spyOn(productRepository, 'getProducts').mockImplementation(() => []);

      const result = () => productService.getProducts();

      expect(result).toThrow(
        new HttpException('No products found', HttpStatus.NOT_FOUND),
      );
    });

    it('should return products', () => {
      const products: Product[] = [
        { id: 1, name: 'name', description: 'description', price: 1 },
        { id: 2, name: 'name 2', description: 'description 2', price: 2 },
      ];
      const expectedProducts: Product[] = [
        { id: 1, name: 'name', description: 'description', price: 1 },
        { id: 2, name: 'name 2', description: 'description 2', price: 2 },
      ];

      jest
        .spyOn(productRepository, 'getProducts')
        .mockImplementation(() => products);

      const result = productService.getProducts();

      expect(result).toEqual(expectedProducts);
    });
  });

  describe('editProduct', () => {
    it('should throw error when id is invalid', () => {
      const productId = 0;
      const newProductData = {} as ProductDto;

      const result = () =>
        productService.editProduct(productId, newProductData);

      expect(result).toThrow(
        new HttpException('Invalid product id', HttpStatus.BAD_REQUEST),
      );
    });

    it('should throw error when product is not found', () => {
      const productId = 1;
      const newProductData = {} as ProductDto;

      jest
        .spyOn(productRepository, 'getProduct')
        .mockImplementation(() => null);

      const result = () =>
        productService.editProduct(productId, newProductData);

      expect(result).toThrow(
        new HttpException('Product not found', HttpStatus.NOT_FOUND),
      );
    });

    it('should update the name', () => {
      const productId = 1;
      const product: Product = {
        id: productId,
        name: 'name',
        description: 'description',
        price: 1,
      };
      const newProductData = {
        id: productId,
        name: 'new name',
        description: 'description',
        price: 1,
      } as ProductDto;

      jest
        .spyOn(productRepository, 'getProduct')
        .mockImplementation(() => product);

      const result = productService.editProduct(productId, newProductData);

      expect(result).toEqual({ ...product, name: 'new name' });
    });

    it('should update the description', () => {
      const productId = 1;
      const product: Product = {
        id: productId,
        name: 'name',
        description: 'description',
        price: 1,
      };
      const newProductData = {
        id: productId,
        name: 'name',
        description: 'new description',
        price: 1,
      } as ProductDto;

      jest
        .spyOn(productRepository, 'getProduct')
        .mockImplementation(() => product);

      const result = productService.editProduct(productId, newProductData);

      expect(result).toEqual({ ...product, description: 'new description' });
    });

    it('should update the price', () => {
      const productId = 1;
      const product: Product = {
        id: productId,
        name: 'name',
        description: 'description',
        price: 1,
      };
      const newProductData = {
        id: productId,
        name: 'name',
        description: 'description',
        price: 2,
      } as ProductDto;

      jest
        .spyOn(productRepository, 'getProduct')
        .mockImplementation(() => product);

      const result = productService.editProduct(productId, newProductData);

      expect(result).toEqual({ ...product, price: 2 });
    });
  });

  describe('deleteProduct', () => {
    it('should throw error when productId is invalid', () => {
      const productId = 0;

      const result = () => productService.deleteProduct(productId);

      expect(result).toThrow(
        new HttpException('Invalid product id', HttpStatus.BAD_REQUEST),
      );
    });

    it('should not throw error when productId is valid', () => {
      const productId = 1;

      const result = () => productService.deleteProduct(productId);

      expect(result).not.toThrow();
    });
  });
});
