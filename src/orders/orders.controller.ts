import { UpdateOrderDTO } from './dtos/update-order.dto';
import { ParseUUIDPipe } from '@nestjs/common/pipes';
import { Controller, Get, Param } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { NotFoundException } from '@nestjs/common/exceptions';
import { Body, Delete, Post,  Put } from '@nestjs/common/decorators';
import { CreateOrderDTO } from './dtos/create-order.dto';



@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Get('/')
  getAll(): any {
    return this.ordersService.getAll();
  }

  @Get('/:id')
  async getById(@Param('id', new ParseUUIDPipe()) id: string) {
    const order = await this.ordersService.getById(id);
    if (!order) throw new NotFoundException('Order not found');
    return order;
  }

  @Delete('/:id')
  async deleteById(@Param('id', new ParseUUIDPipe()) id: string) {
    if (!( await this.ordersService.getById(id)))
      throw new NotFoundException('Order not found');
    await  this.ordersService.deleteById(id);
    return { success: true };
  }

  @Post('/')
  public create(@Body() orderData: CreateOrderDTO) {
    return this.ordersService.create(orderData);
  }

  @Put('/:id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() orderData: UpdateOrderDTO,
  ) {
    if (!(await this.ordersService.getById(id)))
      throw new NotFoundException('Order not found');

    await this.ordersService.updateById(id, orderData);
    return { success: true };
  }
}