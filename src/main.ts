import { ClassSerializerInterceptor, ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory, Reflector } from "@nestjs/core";
import { AppModule } from "./app.module";
import { configLiterals } from "./config";

import helmet from "helmet";
import { JwtAuthGuard } from "./authentication/guards/jwt-auth.guard";
import { PermissionsGuard } from "./authorization/permissions.guard";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.enableCors();

  const reflector = app.get<Reflector>(Reflector);
  const configService = app.get<ConfigService>(ConfigService);

  app.useGlobalGuards(
    new JwtAuthGuard(reflector),
    new PermissionsGuard(reflector, configService)
  );
  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));
  app.useGlobalPipes(
    new ValidationPipe({
      forbidUnknownValues: true,
      forbidNonWhitelisted: true,
      errorHttpStatusCode: 422,
    })
  );

  await app.init();

  const port = configService.get<number>(configLiterals.PORT);

  await app.listen(port);
}
bootstrap();
