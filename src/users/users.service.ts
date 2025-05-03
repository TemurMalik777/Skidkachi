import {
  BadGatewayException,
  BadRequestException,
  Injectable,
  NotFoundException,
  ServiceUnavailableException,
} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./models/user.model";

import * as bcrypt from "bcrypt";
import { MailService } from "../mail/mail.service";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private readonly userModel: typeof User,
    private readonly mailService: MailService
  ) {}
  async create(createUserDto: CreateUserDto) {
    const { password, confirm_password } = createUserDto;
    if (password != confirm_password) {
      throw new BadGatewayException("Paroller mos emas ");
    }
    const hashed_password = await bcrypt.hash(password, 7);
    const newUser = await this.userModel.create({
      ...createUserDto,
      hashed_password,
    });
    try {
      await this.mailService.sendMail(newUser);
    } catch (error) {
      console.log(error);
      throw new ServiceUnavailableException("Emailga xat yuborishda xatolik");
    }
    return newUser;
  }

  findUserByEmail(email: string) {
    return this.userModel.findOne({ where: { email } });
  }

  findUserByToken(hashed_password: string) {
    return this.userModel.findOne({ where: { hashed_password } });
  }

  async findAll(): Promise<User[]> {
    const users = await this.userModel.findAll();
    return users;
  }

  // READ ONE (mavjud)
  async findOne(id: number): Promise<User> {
    const user = await this.userModel.findByPk(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  // UPDATE
  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userModel.findByPk(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    await user.update(updateUserDto);
    return user;
  }

  async remove(id: number): Promise<{ message: string }> {
    const user = await this.userModel.findByPk(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    await user.destroy();
    return { message: `User with ID ${id} deleted successfully` };
  }

  async updateRefreshToken(id: number, hashed_refresh_token: string) {
    const updateUser = await this.userModel.update(
      { hashed_refresh_token },
      { where: { id } }
    );
    return updateUser;
  }

  // async updateRefreshToken(userId: number, hashed_refresh_token: string) {
  //   const user = await this.findUserById(userId);
  //   if (!user) {
  //     throw new NotFoundException("User not found");
  //   }

  //   user.hashed_refresh_token = hashed_refresh_token;
  //   await user.save();
  // }

  async activateUser(link: string) {
    if (!link) {
      throw new BadRequestException("Activation link not found");
    }

    const updateUser = await this.userModel.update(
      { is_active: true },
      {
        where: {
          activation_link: link,
          is_active: false,
        },
        returning: true,
      }
    );

    if (!updateUser[1][0]) {
      throw new BadRequestException("User already activated");
    }

    return {
      message: "User activated successfully",
      is_active: updateUser[1][0].is_active,
    };
  }
}
