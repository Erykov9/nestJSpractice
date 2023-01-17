
import { IsNotEmpty, Length } from 'class-validator';

export class UpdateOrderDTO {
  @IsNotEmpty()
  productId: string;

  @IsNotEmpty()
  @Length(5, 30)
  client: string;

  @IsNotEmpty()
  @Length(10, 50)
  address: string;
}