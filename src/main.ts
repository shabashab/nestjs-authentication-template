import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { configLiterals } from "./config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.init();

  const config = app.get(ConfigService);
  const port = config.get<number>(configLiterals.PORT);

  await app.listen(port);
}
bootstrap();
