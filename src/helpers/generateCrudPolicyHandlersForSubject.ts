import { Action } from "src/casl/action.enum";
import { AppAbility, Subjects } from "src/casl/app-ability.type";
import { PolicyHandler } from "src/casl/policy-handler.type";

type PolicyHandlerFactory = (subject: Subjects) => PolicyHandler;

export interface ActionPolicyHandlers {
  forEvery: PolicyHandler;
  forSingle: PolicyHandlerFactory;
}

export interface CrudPolicyHandlers {
  create: ActionPolicyHandlers;
  read: ActionPolicyHandlers;
	readAll: PolicyHandler;
  update: ActionPolicyHandlers;
  delete: ActionPolicyHandlers;
}

export const generatePolicyHandlerForEvery = (
  action: Action,
  subject: Subjects
): PolicyHandler => {
  return (ability: AppAbility) => {
    return ability.can(action, subject);
  };
};

export const generatePolicyHandlerForSingle = (
  action: Action
): PolicyHandlerFactory => {
  return (subject: Subjects): PolicyHandler =>
    (ability: AppAbility): boolean => {
      return ability.can(action, subject);
    };
};

export const generatePolicyHandlersForAction = (
  action: Action,
  subject: Subjects
): ActionPolicyHandlers => {
  return {
    forSingle: generatePolicyHandlerForSingle(action),
    forEvery: generatePolicyHandlerForEvery(action, subject),
  };
};

export const generateCrudPolicyHandlersForSubject = (
  subject: Subjects
): CrudPolicyHandlers => {
  return {
    read: generatePolicyHandlersForAction(Action.Read, subject),
		readAll: generatePolicyHandlerForEvery(Action.ReadAll, subject),
    update: generatePolicyHandlersForAction(Action.Update, subject),
    create: generatePolicyHandlersForAction(Action.Create, subject),
    delete: generatePolicyHandlersForAction(Action.Delete, subject),
  };
};
