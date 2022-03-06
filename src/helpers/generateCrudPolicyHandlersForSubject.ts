import { Action } from "src/casl/action.enum";
import { Subjects } from "src/casl/app-ability.type";
import { PolicyHandler } from "src/casl/policy-handler.type";
import { createActionPolicyHandlerForSubject } from "./createActionPolicyHandlerForSubject";

export interface CrudPolicyHandlers {
  create: PolicyHandler;
  read: PolicyHandler;
  update: PolicyHandler;
  delete: PolicyHandler;
}

export const generateCrudPolicyHandlersForSubject = (
  subject: Subjects
): CrudPolicyHandlers => {
  return {
    read: createActionPolicyHandlerForSubject(Action.Read, subject),
    update: createActionPolicyHandlerForSubject(Action.Update, subject),
    delete: createActionPolicyHandlerForSubject(Action.Delete, subject),
    create: createActionPolicyHandlerForSubject(Action.Create, subject),
  };
};
