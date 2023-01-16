import { Controller, Get } from '@nestjs/common';
import { Body, Delete, Param, Post } from '@nestjs/common/decorators';
import { Product } from 'src/db';
import { ProductsService } from './products.service';
import { CreateProductDTO } from './dtos/create-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {
    this.productsService = productsService;
  }

  @Get('/')
  getAll(): any {
    return this.productsService.getAll();
  }

  @Get('/:id')
  public getById(@Param('id') id: string) {
    return this.productsService.getById(id)
  }

  @Delete('/:id')
  public deleteById(@Param('id') id: string) {
    this.productsService.deleteById(id);
    return { success: true};
  }

  @Post('/')
  public create(@Body() productData: CreateProductDTO) {
    return this.productsService.create(productData);
  }
  
}
