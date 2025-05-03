import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Status } from "./models/status.model";
import { CreateStatusDto } from "./dto/create-status.dto";
import { UpdateStatusDto } from "./dto/update-status.dto";

@Injectable()
export class StatusService {
  constructor(
    @InjectModel(Status)
    private readonly statusModel: typeof Status
  ) {}

  async create(createStatusDto: CreateStatusDto) {
    const status = await this.statusModel.create(createStatusDto);
    return status;
  }

  async findAll() {
    return this.statusModel.findAll();
  }

  async findOne(id: number) {
    const status = await this.statusModel.findByPk(id);
    if (!status) {
      throw new NotFoundException(`Status with ID ${id} not found`);
    }
    return status;
  }

  async update(id: number, updateStatusDto: UpdateStatusDto) {
    const status = await this.findOne(id);
    return await status.update(updateStatusDto);
  }

  async remove(id: number) {
    const status = await this.findOne(id);
    await status.destroy();
    return { message: "Status deleted successfully" };
  }
}
