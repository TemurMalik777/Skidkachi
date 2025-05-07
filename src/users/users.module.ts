import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersService } from './users.service';
import { User } from './models/user.model';
import { MailModule } from '../mail/mail.module';
import { BotsModule } from '../bots/bots.module';
import { Otp } from './models/otp.model';
import { Favourites } from './models/favourites.model';
import { StoreSubscribes } from './models/store_subscribes.model';

@Module({
  imports: [SequelizeModule.forFeature([User, Otp, Favourites, StoreSubscribes]), MailModule, BotsModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
