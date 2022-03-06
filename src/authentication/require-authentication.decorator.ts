import { SetMetadata } from "@nestjs/common";
import { MetadataKey } from "src/metadata-key.enum";

export const RequireAuthentication = () =>
  SetMetadata(MetadataKey.REQUIRE_AUTHENTICATION, true);
