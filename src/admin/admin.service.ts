import {
  BadGatewayException,
  Injectable,
  ServiceUnavailableException,
} from "@nestjs/common";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { InjectModel } from "@nestjs/sequelize";

import * as bcrypt from "bcrypt";
import { Admin } from "./models/admin.model";

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin) private readonly adminModel: typeof Admin
  ) {}

  async create(createAdminDto: CreateAdminDto) {
    const {password, confirm_password} = createAdminDto
    if (password != confirm_password) {
      throw new BadGatewayException("Paroller mos emas")
    }
    const hashed_password = await bcrypt.hash(password, 7)
    const newAdmin = await this.adminModel.create({
      ...createAdminDto, hashed_password
    })
    try {
      // await this.adminService.sendMail(newUser)
    } catch (error) {
      console.log(error);
      throw new ServiceUnavailableException("Emailga xat yuborishda xatolik")
    }
    return newAdmin
  }

  findAll() {
    return `This action returns all admin`;
  }

  findOne(id: number) {
    return `This action returns a #${id} admin`;
  }

  update(id: number, updateAdminDto: UpdateAdminDto) {
    return `This action updates a #${id} admin`;
  }

  remove(id: number) {
    return `This action removes a #${id} admin`;
  }
}
