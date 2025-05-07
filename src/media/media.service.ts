import { Injectable } from '@nestjs/common';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Media } from './models/media.model';

@Injectable()
export class MediaService {
  constructor(
    @InjectModel(Media) private readonly mediaModel: typeof Media,
  ) {}

  async create(createMediaDto: CreateMediaDto) {
    return await this.mediaModel.create(createMediaDto);
  }

  async findAll() {
    return await this.mediaModel.findAll();
  }

  async findOne(id: number) {
    return await this.mediaModel.findOne({ where: { id } });
  }

  async update(id: number, updateMediaDto: UpdateMediaDto) {
    const [affectedCount, affectedRows] = await this.mediaModel.update(updateMediaDto, {
      where: { id },
      returning: true,
    });

    return affectedCount > 0 ? affectedRows[0] : null;
  }

  async remove(id: number) {
    const media = await this.mediaModel.findOne({ where: { id } });

    if (media) {
      await media.destroy();
      return { message: `Media with ID ${id} has been deleted` };
    }

    return { message: `Media with ID ${id} not found` };
  }
}
