import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateSocialMediaTypeDto } from "./dto/create-social_media_type.dto";
import { UpdateSocialMediaTypeDto } from "./dto/update-social_media_type.dto";
import { SocialMediaType } from "./models/social_media_type.model";

@Injectable()
export class SocialMediaTypeService {
  constructor(
    @InjectModel(SocialMediaType)
    private readonly socialMediaTypeModel: typeof SocialMediaType
  ) {}

  async create(createDto: CreateSocialMediaTypeDto) {
    const type = await this.socialMediaTypeModel.create(createDto);
    return type;
  }

  async findAll() {
    return await this.socialMediaTypeModel.findAll();
  }

  async findOne(id: number) {
    const type = await this.socialMediaTypeModel.findByPk(id);
    if (!type) {
      throw new Error(`SocialMediaType with id ${id} not found`);
    }
    return type;
  }

  async update(id: number, updateDto: UpdateSocialMediaTypeDto) {
    const type = await this.socialMediaTypeModel.findByPk(id);
    if (!type) {
      throw new Error(`SocialMediaType with id ${id} not found`);
    }
    await type.update(updateDto);
    return type;
  }

  async remove(id: number) {
    const type = await this.socialMediaTypeModel.findByPk(id);
    if (!type) {
      throw new Error(`SocialMediaType with id ${id} not found`);
    }
    await type.destroy();
    return { message: `SocialMediaType with id ${id} deleted successfully` };
  }
}
