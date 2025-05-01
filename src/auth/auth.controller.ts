import { Body, Controller, Get, Post, Req, Res } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { Response, Request } from "express";
import { SignInDto } from "./dto/sign-in.dto";

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
    @Req() request: Request,
    @Res({ passthrough: true })
    res: Response
  ) {
    return this.authService.signOut(request, res);
  }
}
