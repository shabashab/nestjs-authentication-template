import { Action } from "src/casl/action.enum";
import { AppAbility, Subjects } from "src/casl/app-ability.type";
import { PolicyHandlerCallback } from "src/casl/policy-handler.type";

export const createActionPolicyHandlerForSubject = (
  action: Action,
  subject: Subjects
): PolicyHandlerCallback => {
  return (ability: AppAbility): boolean => {
    return ability.can(action, subject);
  };
};
