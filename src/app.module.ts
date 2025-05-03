import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { UsersModule } from "./users/users.module";
import { User } from "./users/models/user.model";
import { AuthModule } from "./auth/auth.module";
import { MailModule } from "./mail/mail.module";
import { AdminModule } from "./admin/admin.module";
import { Admin } from "./admin/models/admin.model";
import { BotsModule } from "./bots/bots.module";
import { TelegrafModule } from "nestjs-telegraf";
import { BOT_NAME } from "./app.constants";
import { RegionModule } from "./region/region.module";
import { Region } from "./region/models/region.madel";
import { DistrictModule } from "./district/district.module";
import { StatusModule } from "./status/status.module";
import { Status } from "./status/models/status.model";
import { StoreModule } from "./store/store.module";
import { Store } from "./store/models/store.model";
import { District } from "./district/models/district.model";

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ".env", isGlobal: true }),

    TelegrafModule.forRootAsync({
      useFactory: () => ({
        token: process.env.BOT_TOKEN!,
        botName: BOT_NAME!,
        middlewares: [],
      }),
      inject: [],
      imports: [BotsModule],
    }),

    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.PG_HOST,
      port: Number(process.env.PG_PORT),
      username: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DB,
      models: [User, Admin, Region, Status, Store, District],
      autoLoadModels: true,
      sync: { alter: true },
      logging: false,
    }),
    UsersModule,
    AuthModule,
    MailModule,
    AdminModule,
    BotsModule,
    RegionModule,
    DistrictModule,
    StatusModule,
    StoreModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
