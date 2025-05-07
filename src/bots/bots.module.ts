import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { TelegrafModule } from "nestjs-telegraf";

import { Bot } from "./model/bot.model";
import { BotService } from "./bots.service";
import { BotUpdate } from "./bot.update";
import { BOT_NAME } from "../app.constants";
import { Address } from "./model/address.model";
import { AddressUpdate } from "./address/address.update";
import { AddressService } from "./address/addres.service";

@Module({
  imports: [SequelizeModule.forFeature([Bot, Address])],
  providers: [BotService, AddressService, AddressUpdate, BotUpdate],
  exports: [BotService],
})
export class BotsModule {}
