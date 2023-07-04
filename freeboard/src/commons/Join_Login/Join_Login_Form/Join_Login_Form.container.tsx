import { Control, UseControllerProps, useController } from "react-hook-form";
import JoinLoginFormUI from "./Join_Login_Form.presenter";
import { IJoinLoginSchema } from "../../../components/units/User/Join_Login/Join_Login.container";
import { BaseSyntheticEvent } from "react";

export default function JoinLoginForm(props: any) {
  return (
    <JoinLoginFormUI
      onFinish={props.onFinish}
      childrenJoinLoginForm={props.children}
    ></JoinLoginFormUI>
  );
}
