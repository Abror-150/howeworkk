import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiQuery } from '@nestjs/swagger';

@Controller('product')
export class ProductController {
  constructor(private readonly product: ProductService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.product.create(createProductDto);
  }

  @Get()
  @ApiQuery({
    name: 'sort',
    required: false,
    type: String,
  })
  @ApiQuery({ name: 'filter', type: String, required: false })
  @ApiQuery({ name: 'page', type: String, required: false, example: '1' })
  @ApiQuery({ name: 'limit', type: String, required: false, example: '2' })
  findAll(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
    @Query('sort') sort?: string,
    @Query('filter') search?: string,
  ) {
    return this.product.findAll(parseInt(page), parseInt(limit), sort, search);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.product.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.product.update(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.product.remove(id);
  }
}
