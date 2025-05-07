import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Discount } from "./models/discount.model";
import { CreateDiscountDto } from "./dto/create-discount.dto";
import { UpdateDiscountDto } from "./dto/update-discount.dto";

@Injectable()
export class DiscountsService {
  constructor(
    @InjectModel(Discount)
    private discountModel: typeof Discount
  ) {}

  async create(createDiscountDto: CreateDiscountDto): Promise<Discount> {
    return await this.discountModel.create(createDiscountDto);
  }

  async findAll(): Promise<Discount[]> {
    return await this.discountModel.findAll({
      include: ["store", "category", "type"],
    });
  }

  async findOne(id: number): Promise<Discount> {
    const discount = await this.discountModel.findByPk(id, {
      include: ["store", "category", "type"],
    });
    if (!discount) {
      throw new NotFoundException(`Discount with ID ${id} not found`);
    }
    return discount;
  }

  async update(
    id: number,
    updateDiscountDto: UpdateDiscountDto
  ): Promise<Discount> {
    const discount = await this.findOne(id);
    return await discount.update(updateDiscountDto);
  }

  async remove(id: number): Promise<void> {
    const discount = await this.findOne(id);
    await discount.destroy();
  }
}
