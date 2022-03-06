import { User } from "src/entities/user.entity";
import { Ability, InferSubjects } from "@casl/ability";
import { Action } from "./action.enum";

export type Subjects = InferSubjects<typeof User> | "all";
export type AppAbility = Ability<[Action, Subjects]>;
