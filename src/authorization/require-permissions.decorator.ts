import { SetMetadata } from "@nestjs/common";
import { MetadataKey } from "src/metadata-key.enum";
import { Permission } from "./permission.enum";

export const RequirePermissions = (...permissions: Permission[]) =>
  SetMetadata(MetadataKey.REQUIRED_PERMISSIONS, permissions);
