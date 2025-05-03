import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateRegionDto } from "./dto/create-region.dto";
import { UpdateRegionDto } from "./dto/update-region.dto";
import { Region } from "./models/region.madel";

@Injectable()
export class RegionService {
  constructor(
    @InjectModel(Region)
    private readonly regionModel: typeof Region
  ) {}

  async create(createRegionDto: CreateRegionDto): Promise<Region> {
    try {
      const newRegion = await this.regionModel.create(createRegionDto);
      return newRegion;
    } catch (error) {
      throw new BadRequestException("Failed to create region");
    }
  }

  async findAll(): Promise<Region[]> {
    return this.regionModel.findAll();
  }

  async findOne(id: number): Promise<Region> {
    const region = await this.regionModel.findByPk(id);
    if (!region) {
      throw new NotFoundException(`Region with ID ${id} not found`);
    }
    return region;
  }

  async update(id: number, updateRegionDto: UpdateRegionDto): Promise<Region> {
    const region = await this.regionModel.findByPk(id);
    if (!region) {
      throw new NotFoundException(`Region with ID ${id} not found`);
    }
    await region.update(updateRegionDto);
    return region;
  }

  async remove(id: number): Promise<{ message: string }> {
    const region = await this.regionModel.findByPk(id);
    if (!region) {
      throw new NotFoundException(`Region with ID ${id} not found`);
    }
    await region.destroy();
    return { message: `Region with ID ${id} deleted successfully` };
  }
}
