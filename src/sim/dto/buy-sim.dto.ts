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

  @IsOptional()
  @IsString()
  codeDiscount: string;

  @IsOptional()
  @IsString()
  amountDiscount: number;

  @IsNumber()
  totalPrice: number;
}
