import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

class PaginationDto {
  @IsNumber()
  page: number;

  @IsNumber()
  limit: number;

  @IsOptional()
  order: string;
}

export class SimDto {
  @IsOptional()
  @IsArray()
  priceRange: number[];

  @IsOptional()
  @IsString()
  supplier: string;

  @IsOptional()
  type: string;

  @IsOptional()
  prefix: string;

  @IsOptional()
  avoidNumber: string;

  @IsOptional()
  totalPoint: number;

  @IsOptional()
  totalNode: number;

  @IsOptional()
  dob: string;

  pagination: PaginationDto;

  @IsOptional()
  numberPhone: string;
}
