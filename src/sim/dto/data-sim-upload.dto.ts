import { IsArray } from 'class-validator';

export class DataSimUploadDto {
  @IsArray()
  numbers: string[];

  supplier: string;

  subcribsionType: string;

  price: number;

  simType: any;

  commitment: string;
}
