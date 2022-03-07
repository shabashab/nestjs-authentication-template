import { User } from "src/entities/user.entity";
import { generateCrudPolicyHandlersForSubject } from "src/helpers/generateCrudPolicyHandlersForSubject";

export const userPolicyHandlers = generateCrudPolicyHandlersForSubject(User);
