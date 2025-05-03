import { Module } from '@nestjs/common';
import { BotsService } from './bots.service';
import { BotUpdate } from './bot.update';

@Module({
  controllers: [],
  providers: [BotsService, BotUpdate],
})
export class BotsModule {}
