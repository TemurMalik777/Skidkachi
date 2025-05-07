import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { BadRequestException, ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as cookieParser from "cookie-parser";
// import { Logger } from "@nestjs/common";

async function start() {
  try {
    // Logger.overrideLogger(true); //false
    const PORT = process.env.PORT || 3030;
    const app = await NestFactory.create(AppModule); // {logger: ["debug", "error"]}
    app.use(cookieParser());
    app.setGlobalPrefix("api");
    app.useGlobalPipes(new ValidationPipe());
    const config = new DocumentBuilder()
      .setTitle("Skidkachi project")
      .setDescription("Skidkachi REST API")
      .setVersion("1.0")
      .addTag("NestJS", "Validation")
      .addTag(
        "NESTJS",
        "Guard, swagger, sendMail, bot, SMS,, tokens, Validation, Sequelize"
      )
      .build();

    app.enableCors({
      origin: (origin, callback) => {
        const allowedOrigins = [
          "http://localhost:8000",
          "http://localhost:3000",
          "http://skidkachi.uz",
          "http://api.skidkachi.uz",
          "http://skidkachi.vercel.app",
        ];
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new BadRequestException("Not allowed by CORS"));
        }
      },
      methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
      credentials: true, //cookie ba header
    });

    const documetn = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("api/docs", app, documetn);
    await app.listen(PORT, () => {
      console.log(`Server started at: http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}
start();
