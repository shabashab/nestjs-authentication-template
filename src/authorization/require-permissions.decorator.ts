import { SetMetadata } from "@nestjs/common";
import { PERMISSIONS_METADATA_KEY } from "./authorization.constants";
import { Permission } from "./permission.enum";

export const RequirePermissions = (...permissions: Permission[]) =>
  SetMetadata(PERMISSIONS_METADATA_KEY, permissions);
