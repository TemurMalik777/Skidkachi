import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { UsersModule } from "./users/users.module";
import { User } from "./users/models/user.model";
import { AuthModule } from "./auth/auth.module";
import { MailModule } from "./mail/mail.module";
import { AdminModule } from "./admin/admin.module";
import { Admin } from "./admin/models/admin.model";
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
import { SocialMediaTypeModule } from "./social_media_type/social_media_type.module";
import { StoreSocialLinksModule } from "./store_social_links/store_social_links.module";
import { TypeModule } from "./type/type.module";
import { CategoryModule } from "./category/category.module";
import { DiscountsModule } from "./discounts/discounts.module";
import { Bot } from "./bots/model/bot.model";
import { BotsModule } from "./bots/bots.module";
import { Otp } from "./users/models/otp.model";
import { Address } from "./bots/model/address.model";
import { AdsModule } from "./ads/ads.module";
import { Ads } from "./ads/models/ads.model";
import { ReviewsModule } from "./reviews/reviews.module";
import { Review } from "./reviews/models/review.model";
import { MediaModule } from './media/media.module';
import { Media } from "./media/models/media.model";
import { Category } from "./category/models/category.model";
import { Discount } from "./discounts/models/discount.model";
import { SocialMediaType } from "./social_media_type/models/social_media_type.model";
import { StoreSocialLink } from "./store_social_links/models/store_social_link.model";
import { Type } from "./type/models/type.model";
import { Favourites } from "./users/models/favourites.model";
import { StoreSubscribes } from "./users/models/store_subscribes.model";

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ".env", isGlobal: true }),

    TelegrafModule.forRootAsync({
      botName: BOT_NAME!,
      useFactory: () => ({
        token: process.env.BOT_TOKEN!,
        middlewares: [],
      }),
      inject: [],
      imports: [],
    }),

    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.PG_HOST,
      port: Number(process.env.PG_PORT),
      username: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DB,
      models: [
        User,
        Admin,
        Region,
        Status,
        Store,
        District,
        Bot,
        Otp,
        Address,
        Ads,
        Review,
        Media,
        Category,
        Discount,
        SocialMediaType,
        StoreSocialLink,
        Type,
        Favourites,
        StoreSubscribes
      ],
      autoLoadModels: true,
      sync: { alter: true },
      logging: false,
    }),
    UsersModule,
    AuthModule,
    MailModule,
    AdminModule,
    RegionModule,
    DistrictModule,
    StatusModule,
    StoreModule,
    SocialMediaTypeModule,
    StoreSocialLinksModule,
    TypeModule,
    CategoryModule,
    DiscountsModule,
    BotsModule,
    AdsModule,
    ReviewsModule,
    MediaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
