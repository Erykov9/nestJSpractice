import { IsNotEmpty, IsUUID } from 'class-validator';

export class UpdateOrderDTO {
  @IsNotEmpty()
  @IsUUID()
  productId: string

  @IsUUID()
  clientId: string
  

}