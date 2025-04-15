import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Op } from 'sequelize';

@Injectable()
export class ProductService {
  constructor(@InjectModel(Product.name) private product: Model<Product>) {}

  async create(createProductDto: CreateProductDto) {
    let data = await this.product.create(createProductDto);
    return data;
  }

  async findAll(page: number, limit: number, sort?: string, search?: string) {
    const offset = (page - 1) * limit;
    const where: any = {};

    if (search) {
      where.name = { [Op.like]: `%${search}%` };
    }

    const order = sort ? [[sort, 'ASC']] : [['createdAt', 'DESC']];

    return await this.product.find({
      where,
      limit,
      offset,
      order,
    });
  }

  async findOne(id: string) {
    let data = await this.product.findById(id);
    return data;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    let data = await this.product.findByIdAndUpdate(id, updateProductDto, {
      new: true,
    });
    return data;
  }

  async remove(id: string) {
    let data = await this.product.findByIdAndDelete(id);
    return data;
  }
}
