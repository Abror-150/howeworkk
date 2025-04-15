import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsPositive, isString, IsString } from 'class-validator';

export class CreateProductDto {
  @ApiProperty()
  @IsString()
  name: string;
  @ApiProperty()
  @IsNumber()
  @IsPositive()
  price: number;
  @ApiProperty()
  @IsString()
  category: string;
}
