import { User } from "src/entities/user.entity";
import { generateCrudPolicyHandlersForSubject } from "src/helpers/generateCrudPolicyHandlersForSubject";

const crudPolicyHandlers = generateCrudPolicyHandlersForSubject(User);

export const CreateUserPolicyHandler = crudPolicyHandlers.create;
export const UpdateUserPolicyHandler = crudPolicyHandlers.update;
export const ReadUserPolicyHandler = crudPolicyHandlers.read;
export const DeleteUserPolicyHandler = crudPolicyHandlers.delete;
