import { ClassSerializerInterceptor, ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory, Reflector } from "@nestjs/core";
import { AppModule } from "./app.module";
import { PermissionsGuard } from "./authorization/permissions.guard";
import { configLiterals } from "./config";

import helmet from "helmet";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.enableCors();
  await app.init();

  const reflector = app.get<Reflector>(Reflector);
  app.useGlobalGuards(new PermissionsGuard(reflector));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));
  app.useGlobalPipes(
    new ValidationPipe({
      forbidUnknownValues: true,
      forbidNonWhitelisted: true,
    })
  );

  const config = app.get(ConfigService);
  const port = config.get<number>(configLiterals.PORT);

  await app.listen(port);
}
bootstrap();
