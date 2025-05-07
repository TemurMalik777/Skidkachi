import {
  Action,
  Command,
  Ctx,
  Hears,
  On,
  Start,
  Update,
} from "nestjs-telegraf";
import { Context, Markup } from "telegraf";
import { button } from "telegraf/typings/markup";
import { BotService } from "../bots.service";
import { AddressService } from "./addres.service";

@Update()
export class AddressUpdate {
  constructor(
    private readonly botService: BotService,
    private readonly addressService: AddressService
  ) {}

  @Command("address")
  async onAddress(@Ctx() ctx: Context) {
    return this.addressService.onAddress(ctx);
  }

  @Hears("Yangi manzil qoshish")
  async onNewAddress(@Ctx() ctx: Context) {
    console.log("=== onNewAddress bosildi ===", ctx);
    return this.addressService.onNewAddress(ctx);
  }
}
