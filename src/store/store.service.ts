import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateStoreDto } from "./dto/create-store.dto";
import { UpdateStoreDto } from "./dto/update-store.dto";
import { Store } from "./models/store.model";

@Injectable()
export class StoreService {
  constructor(@InjectModel(Store) private readonly storeModel: typeof Store) {}

  async create(createStoreDto: CreateStoreDto) {
    const store = await this.storeModel.create(createStoreDto);
    return store;
  }

  async findAll() {
    const stores = await this.storeModel.findAll();
    return stores;
  }

  async findOne(id: number) {
    const store = await this.storeModel.findByPk(id);
    if (!store) {
      throw new Error(`Store with id ${id} not found`);
    }
    return store;
  }

  async update(id: number, updateStoreDto: UpdateStoreDto) {
    const store = await this.storeModel.findByPk(id);
    if (!store) {
      throw new Error(`Store with id ${id} not found`);
    }
    await store.update(updateStoreDto);
    return store;
  }

  async remove(id: number) {
    const store = await this.storeModel.findByPk(id);
    if (!store) {
      throw new Error(`Store with id ${id} not found`);
    }
    await store.destroy();
    return { message: `Store with id ${id} has been removed` };
  }
}
