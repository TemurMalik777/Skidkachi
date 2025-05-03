import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  Req,
  Res,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "../users/models/user.model";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { UsersService } from "../users/users.service";
import { SignInDto } from "./dto/sign-in.dto";

import * as bcrypt from "bcrypt";
import { Response, Request } from "express";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async generateTokens(user: User) {
    const payload = {
      id: user.id,
      is_active: user.is_active,
      is_owner: user.is_owner,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),

      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return {
      accessToken,
      refreshToken,
    };
  }

  async signUp(createUserDto: CreateUserDto) {
    const candidate = await this.userService.findUserByEmail(
      createUserDto.email
    );

    if (candidate) {
      throw new ConflictException("Bunday emailli foydalanuvchi mavjud");
    }
    const newUser = await this.userService.create(createUserDto);
    return { message: "Foydalanuvchi qo'shildi", userId: newUser.id };
  }

  async singIn(signInDto: SignInDto, res: Response) {
    const user = await this.userService.findUserByEmail(signInDto.email);
    if (!user) {
      throw new BadRequestException("Email yoki password noto'g'ri");
    }
    // if (!user.is_active) {
    //   throw new BadRequestException("Avval emailni tasdiqlnag");
    // }
    const isValidPassword = await bcrypt.compare(
      signInDto.password,
      user.hashed_password
    );
    if (!isValidPassword) {
      throw new BadRequestException("Email yoki password noto'g'ri");
    }
    const { accessToken, refreshToken } = await this.generateTokens(user);
    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      maxAge: Number(process.env.COOKIE_TIME),
    });

    user.hashed_refresh_token = await bcrypt.hash(refreshToken, 7);
    await user.save();
    res.status(200).send({
      message: "Tizimga xush keleibsiz",
      refreshToken,
      // accessToken,
    });
  }

  // async signOut(@Req() req: Request, @Res() res: Response) {
  //   const refresh_token = req.cookies.refresh_token;

  //   if (!refresh_token) {
  //     throw new BadRequestException("Refresh token topilmadi");
  //   }

  //   let payload: any;
  //   try {
  //     payload = this.jwtService.decode(refresh_token);
  //   } catch (err) {
  //     throw new BadRequestException("Token yaroqsiz yoki eskirgan");
  //   }
  //   const user = await this.userService.findUserById(payload.id);
  //   if (!user || !user.hashed_refresh_token) {
  //     throw new BadRequestException(
  //       "Foydalanuvchi topilmadi yoki tizimdan allaqachon chiqqan"
  //     );
  //   }
  //   const isMatch = await bcrypt.compare(
  //     refresh_token,
  //     user.hashed_refresh_token
  //   );
  //   if (!isMatch) {
  //     throw new BadRequestException("Token mos emas (hash xato)");
  //   }

  //   user.hashed_refresh_token = "";
  //   await user.save();

  //   res.clearCookie("refresh_token", {
  //     httpOnly: true,
  //   });

  //   res.status(200).send({ message: "Foydalanuvchi tizimdan chiqdi" });
  // }


  async signOut(refreshToken: string, res: Response) {
    const userData = await this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });
    if (!userData) {
      throw new ForbiddenException("user not verified");
    }
    const hashed_refresh_token = "";
    await this.userService.updateRefreshToken(
      userData.id,
      hashed_refresh_token
    );

    res.clearCookie("refresh_token");
    const response = {
      message: "user logged out successfully",
    };
    return response;
  }

  async refreshToken(userId: number, refresh_token: string, res: Response) {
    const decodeToken = await this.jwtService.decode(refresh_token);
    console.log(userId);
    console.log(decodeToken["id"]);

    if (userId !== decodeToken["id"]) {
      throw new ForbiddenException("Ruxsat etilmagan");
    }
    const user = await this.userService.findOne(userId);

    if (!user || !user.hashed_refresh_token) {
      throw new NotFoundException("user not found");
    }

    const tokenMatch = await bcrypt.compare(
      refresh_token,
      user.hashed_refresh_token
    );

    if (!tokenMatch) {
      throw new ForbiddenException("Forbidden");
    }
    const { accessToken, refreshToken } = await this.generateTokens(user);

    const hashed_refresh_token = await bcrypt.hash(refreshToken, 7);
    await this.userService.updateRefreshToken(user.id, hashed_refresh_token);

    res.cookie("refresh_token", refreshToken, {
      maxAge: Number(process.env.COOKIE_TIME),
      httpOnly: true,
    });
    const response = {
      message: "User refreshed",
      userId: user.id,
      access_token: accessToken,
    };
    return response;
  }
}
