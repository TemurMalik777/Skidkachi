import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as cookieParser from "cookie-parser";
// import { Logger } from "@nestjs/common";

async function start() {
  try {
    // Logger.overrideLogger(false);//true
    const PORT = process.env.PORT || 3030;
    const app = await NestFactory.create(AppModule);
    app.use(cookieParser())
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
