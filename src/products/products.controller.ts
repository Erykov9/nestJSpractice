import { UpdateProductDTO } from './dtos/update-product.dto';
import { Controller, Get } from '@nestjs/common';
import { Body, Delete, Param, Post,  Put } from '@nestjs/common/decorators';
import { Product } from 'src/db';
import { ProductsService } from './products.service';
import { CreateProductDTO } from './dtos/create-product.dto';
import { ParseUUIDPipe } from '@nestjs/common/pipes';
import { NotFoundException } from '@nestjs/common/exceptions';

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
  getById(@Param('id', new ParseUUIDPipe()) id: string) {
    const prod = this.productsService.getById(id);
    if (!prod) throw new NotFoundException('Product not found');
    return prod;
  }
  
  @Delete('/:id')
  deleteById(@Param('id', new ParseUUIDPipe()) id: string) {
    if (!this.productsService.getById(id))
      throw new NotFoundException('Product not found');
    this.productsService.deleteById(id);
    return { success: true };
  }

  @Post('/')
  public create(@Body() productData: CreateProductDTO) {
    return this.productsService.create(productData);
  }

  @Put('/:id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() productData: UpdateProductDTO,
  ) {
    if (!this.productsService.getById(id))
      throw new NotFoundException('Product not found');

    this.productsService.updateById(id, productData);
    return { success: true };
  }
  
  
}
