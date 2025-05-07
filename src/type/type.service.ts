import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateTypeDto } from "./dto/create-type.dto";
import { UpdateTypeDto } from "./dto/update-type.dto";
import { Type } from "./models/type.model";

@Injectable()
export class TypeService {
  constructor(@InjectModel(Type) private readonly typeModel: typeof Type) {}

  async create(createTypeDto: CreateTypeDto) {
    return await this.typeModel.create(createTypeDto);
  }

  async findAll() {
    return await this.typeModel.findAll();
  }

  async findOne(id: number) {
    return await this.typeModel.findOne({ where: { id } });
  }

  async update(id: number, updateTypeDto: UpdateTypeDto) {
    const [affectedCount, affectedRows] = await this.typeModel.update(
      updateTypeDto,
      {
        where: { id },
        returning: true,
      }
    );

    return affectedCount > 0 ? affectedRows[0] : null;
  }

  async remove(id: number) {
    const type = await this.typeModel.findOne({ where: { id } });

    if (type) {
      await type.destroy();
      return { message: `Type with ID ${id} has been deleted` };
    }

    return { message: `Type with ID ${id} not found` };
  }
}
