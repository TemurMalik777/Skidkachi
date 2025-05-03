import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { District } from "./models/district.model";
import { CreateDistrictDto } from "./dto/create-district.dto";
import { UpdateDistrictDto } from "./dto/update-district.dto";

@Injectable()
export class DistrictService {
  constructor(
    @InjectModel(District)
    private readonly districtModel: typeof District
  ) {}

  // CREATE
  async create(createDistrictDto: CreateDistrictDto) {
    const district = await this.districtModel.create(createDistrictDto);
    return district;
  }

  // FIND ALL
  async findAll() {
    return this.districtModel.findAll();
  }

  // FIND ONE
  async findOne(id: number) {
    const district = await this.districtModel.findByPk(id);
    if (!district) {
      throw new NotFoundException(`District with ID ${id} not found`);
    }
    return district;
  }

  // UPDATE
  async update(id: number, updateDistrictDto: UpdateDistrictDto) {
    const district = await this.findOne(id);
    return await district.update(updateDistrictDto);
  }

  // DELETE
  async remove(id: number) {
    const district = await this.findOne(id);
    await district.destroy();
    return { message: "District deleted successfully" };
  }
}
