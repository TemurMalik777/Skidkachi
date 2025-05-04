import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateStoreSocialLinkDto } from "./dto/create-store_social_link.dto";
import { UpdateStoreSocialLinkDto } from "./dto/update-store_social_link.dto";
import { StoreSocialLink } from "./models/store_social_link.model";

@Injectable()
export class StoreSocialLinksService {
  constructor(
    @InjectModel(StoreSocialLink)
    private storeSocialLinkModel: typeof StoreSocialLink
  ) {}

  async create(createDto: CreateStoreSocialLinkDto): Promise<StoreSocialLink> {
    const created = await this.storeSocialLinkModel.create(createDto);
    return created;
  }

  async findAll(): Promise<StoreSocialLink[]> {
    return this.storeSocialLinkModel.findAll({ include: { all: true } });
  }

  async findOne(id: number): Promise<StoreSocialLink> {
    const link = await this.storeSocialLinkModel.findByPk(id, {
      include: { all: true },
    });
    if (!link) {
      throw new NotFoundException(`StoreSocialLink with ID ${id} not found`);
    }
    return link;
  }

  async update(
    id: number,
    updateDto: UpdateStoreSocialLinkDto
  ): Promise<StoreSocialLink> {
    const link = await this.findOne(id);
    return link.update(updateDto);
  }

  async remove(id: number): Promise<void> {
    const link = await this.findOne(id);
    await link.destroy();
  }
}
