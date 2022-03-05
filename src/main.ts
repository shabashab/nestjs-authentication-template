import { ClassSerializerInterceptor } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory, Reflector } from "@nestjs/core";
import { AppModule } from "./app.module";
import { PermissionsGuard } from "./authorization/permissions.guard";
import { configLiterals } from "./config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.init();

  const reflector = app.get<Reflector>(Reflector);
  app.useGlobalGuards(new PermissionsGuard(reflector));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));

  const config = app.get(ConfigService);
  const port = config.get<number>(configLiterals.PORT);

  await app.listen(port);
}
bootstrap();
