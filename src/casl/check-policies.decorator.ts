import { SetMetadata } from "@nestjs/common";
import { MetadataKey } from "src/metadata-key.enum";
import { PolicyHandler } from "./policy-handler.type";

export const CheckPolicies = (...handlers: PolicyHandler[]) =>
  SetMetadata(MetadataKey.CHECK_POLICIES, handlers);
