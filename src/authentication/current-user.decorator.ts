import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => {
    if (context.getType() == "http") {
      const request = context.switchToHttp().getRequest();
      return request.user;
    }
    return undefined;
  }
);
