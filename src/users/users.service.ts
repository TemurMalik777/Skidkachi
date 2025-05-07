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
import { PhoneUserDto } from "./dto/phone-number.dto";
import * as otpGenerator from "otp-generator";
import { BotService } from "../bots/bots.service";

import * as uuid from "uuid";
import { Otp } from "./models/otp.model";
import { AddMinutesToDate } from "../common/helpers/addMinutes";
import { decode, encode } from "../common/helpers/crypto";
import { VerifyOtpDto } from "./dto/verify-otp.dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private readonly userModel: typeof User,
    @InjectModel(Otp) private readonly otpModel: typeof Otp,
    private readonly mailService: MailService,
    private readonly botService: BotService
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

  async newOtp(phoneUserdto: PhoneUserDto) {
    const phone_number = phoneUserdto.phone;

    const otp = otpGenerator.generate(4, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    //----------------------
    const isSend = this.botService.sendOtp(phone_number, otp);
    if (!isSend) {
      throw new BadRequestException("avval Botdan ro'yxatdan o'ting");
    }
    // return { message: "Otp botga yuborildi" };
    //-----------------------------Bot
    //---------------------Email

    const now = new Date();
    const expiration_time = AddMinutesToDate(now, 5);
    await this.otpModel.destroy({ where: { phone_number } });
    const newOtpData = await this.otpModel.create({
      id: uuid.v4(),
      otp,
      phone_number,
      expiration_time,
    });

    const details = {
      timestamp: now,
      phone_number,
      otp_id: newOtpData.id,
    };
    const encodeData = await encode(JSON.stringify(details));
    return {
      message: "OTP bota yuborildi",
      verification_key: encodeData,
    };
  }

  async verifyOtp(verifyOtpDto: VerifyOtpDto) {
    const { verification_key, phone: phone_number, otp } = verifyOtpDto;

    const currentDate = new Date();
    const decodeDate = await decode(verification_key);
    const details = JSON.parse(decodeDate);
    if (details.phone_number != phone_number) {
      throw new BadRequestException("OTP bu telefon raqamga yuborilgan ");
    }

    const resultOTP = await this.otpModel.findByPk(details.otp_id);

    if (resultOTP == null) {
      throw new BadRequestException("BUnday OTP yo'q");
    }

    if (resultOTP.verified) {
      throw new BadRequestException("Bu OTP aval tekshirlgan");
    }

    if (resultOTP.expiration_time < currentDate) {
      throw new BadRequestException("Bun OTPning vaqti tugagan");
    }

    if (resultOTP.otp != otp) {
      throw new BadRequestException("OTP most emas");
    }
    const user = await this.userModel.update(
      {
        is_owner: true,
      },
      {
        where: {
          phone: phone_number,
        },
        returning: true,
      }
    );

    if (!user[1][0]) {
      throw new BadRequestException("Bunday raqamli fodalanuvbchi yo'q");
    }
    await this.otpModel.update(
      {
        verified: true,
      },
      { where: { id: details.otp_id } }
    );
    return {
      message: "Tabriklayman, siz owner bo'ldingiz"
    }
  }
}
