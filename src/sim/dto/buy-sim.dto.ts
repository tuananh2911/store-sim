import { IsNumber, IsOptional, IsString } from 'class-validator';

export class BuySimDto {
  @IsString()
  sex: string;

  @IsString()
  name: string;

  @IsString()
  address: string;

  @IsString()
  numberCustomer: string;

  @IsOptional()
  @IsString()
  require: string;

  @IsString()
  methodPay: string;

  @IsString()
  typeSim: string;

  @IsString()
  codeDiscount: string;

  @IsString()
  amountDiscount: number;

  @IsNumber()
  totalPrice: number;
}
