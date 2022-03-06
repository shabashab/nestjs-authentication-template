import * as joi from "joi";
import { configLiterals } from "./";

export const createValidationSchema = (): joi.ObjectSchema => {
  return joi.object({
    [configLiterals.HASH_SALT_ROUNDS]: joi.number().default(10),
    [configLiterals.PORT]: joi.number().default(3000),
    [configLiterals.PG_PORT]: joi.number().default(5432),
    [configLiterals.PG_HOST]: joi.string().hostname().required(),
    [configLiterals.PG_USERNAME]: joi.string().not().empty().required(),
    [configLiterals.PG_PASSWORD]: joi.string().not().empty().required(),
    [configLiterals.PG_DB]: joi.string().not().empty().required(),
    [configLiterals.JWT_SECRET_KEY]: joi.string().not().empty().required(),
    [configLiterals.CREATE_ADMIN_ACCOUNT]: joi.boolean().default(false),
  });
};
