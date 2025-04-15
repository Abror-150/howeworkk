import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProdSchema, Product } from './entities/product.entity';
import {
  Category,
  CategorySchema,
} from 'src/category/entities/category.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Product.name, schema: ProdSchema },
      { name: Category.name, schema: CategorySchema },
    ]),
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
