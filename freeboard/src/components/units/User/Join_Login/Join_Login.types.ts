import { ReactElement } from "react";
import {
  UseFormRegisterReturn,
  UseFormHandleSubmit,
  FieldValues,
  Control,
} from "react-hook-form";
import { IJoinLoginSchema } from "./Join_Login.container";

export interface IJoinLoginprops {
  isEdit: boolean;
}
export interface IJoinLoginUIprops {
  isEdit: boolean;
  createUserButton: (data: any) => Promise<void>;
  LoginButton: (data: any) => Promise<void>;
  emailLoginregister: UseFormRegisterReturn<"email">;
  passwordLoginregister: UseFormRegisterReturn<"password">;
  nameLoginregister: UseFormRegisterReturn<"name">;

  emailJoinregister: UseFormRegisterReturn<"email">;
  passwordJoinregister: UseFormRegisterReturn<"password">;
  nameJoinregister: UseFormRegisterReturn<"name">;
  JoinhandleSubmit: UseFormHandleSubmit<FieldValues, undefined>;
  LoginhandleSubmit: UseFormHandleSubmit<FieldValues, undefined>;
  JoinControl: Control<FieldValues, any>;
  LoginControl: Control<FieldValues, any>;
}
