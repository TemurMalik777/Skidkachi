import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { UpdateAdsDto } from "./dto/update-ads.dto";
import { Ads } from "./models/ads.model";
import { CreateAdsDto } from "./dto/create-ads.dto";

@Injectable()
export class AdsService {
  constructor(@InjectModel(Ads) private readonly adModel: typeof Ads) {}

  async create(createAdsDto: CreateAdsDto) {
    const newAds = await this.adModel.create(createAdsDto);
    return newAds;
  }

  async findAll() {
    const ads = await this.adModel.findAll();
    return ads;
  }

  async findOne(id: number) {
    const ads = await this.adModel.findOne({ where: { id } });
    if (!ads) {
      throw new Error(`ID ${id} bo'yicha reklama topilmadi`);
    }
    return ads;
  }

  async update(id: number, updateAdDto: UpdateAdsDto) {
    const [affectedCount, affectedRows] = await this.adModel.update(
      updateAdDto,
      {
        where: { id },
        returning: true,
      }
    );

    if (affectedCount === 0) {
      throw new Error(`ID ${id} bo'yicha reklama topilmadi`);
    }

    return affectedRows[0];
  }

  async remove(id: number) {
    const ads = await this.adModel.findOne({ where: { id } });

    if (!ads) {
      throw new Error(`ID ${id} bo'yicha reklama topilmadi`);
    }

    await ads.destroy();
    return { message: `ID ${id} bo'yicha reklama muvaffaqiyatli o'chirildi` };
  }
}
