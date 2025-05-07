import { Body, Controller, Get, HttpCode, Param, ParseIntPipe, Post, Req, Res } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { Response, Request } from "express";
import { SignInDto } from "./dto/sign-in.dto";
import { CookieGetter } from "../common/decorators/cookie-getter.decorator";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("sign-up")
  async singUp(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto);
  }

  @Post("sign-in")
  async singIn(
    @Body() singInDto: SignInDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.singIn(singInDto, res);
  }

  @Get("sign-out")
  singout(
    @CookieGetter("refresh_token") refreshToken: string,
    // @Req() request: Request,
    @Res({ passthrough: true })
    res: Response
  ) {
    return this.authService.signOut(refreshToken, res); //requestni o'rniga refreshToken
  }

  @HttpCode(200)
  @Post(":id/refresh")
  refresh(
    @Param("id", ParseIntPipe) id: number,
    @CookieGetter("refresh_token") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.refreshToken(id, refreshToken, res);
  }
}
