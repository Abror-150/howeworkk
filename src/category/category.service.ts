import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './entities/category.entity';
import { Model } from 'mongoose';
import { Op } from 'sequelize';

@Injectable()
export class CategoryService {
  constructor(@InjectModel(Category.name) private category: Model<Category>) {}
  async create(createCategoryDto: CreateCategoryDto) {
    try {
      let data = await this.category.create(createCategoryDto);
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async findAll(page: number, limit: number, sort?: string, search?: string) {
    const offset = (page - 1) * limit;
    const where: any = {};

    if (search) {
      where.name = { [Op.like]: `%${search}%` };
    }

    const order = sort ? [[sort, 'ASC']] : [['createdAt', 'DESC']];

    return await this.category.find({
      where,
      limit,
      offset,
      order,
    });
  }
  async findOne(id: string) {
    try {
      let data = await this.category.findById(id);
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    try {
      let data = await this.category.findByIdAndUpdate(id, updateCategoryDto, {
        new: true,
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async remove(id: string) {
    let data = await this.category.findByIdAndDelete(id);
    return data;
  }
}
