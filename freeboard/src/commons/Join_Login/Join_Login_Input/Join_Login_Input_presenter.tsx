import { ControllerRenderProps, UseControllerProps } from "react-hook-form";
import * as S from "../Join_Login.styles";
import {
  IJoinLoginSchema,
  IJoinSchema,
  ILoginSchema,
} from "../../../components/units/User/Join_Login/Join_Login.container";
import { IJoinLoginInputUI } from "./Join_Login_Input_types";
import { useFormContext } from "react-hook-form";

export default function JoinLoginInputUI(props: IJoinLoginInputUI) {
  const { register: JoinRegister } = useFormContext<IJoinSchema>();
  const { register: LoginRegister } = useFormContext<ILoginSchema>();
  return (
    <S.InputJoinLogin
      placeholder={props.name}
      {...JoinRegister("email")}
      {...JoinRegister("password")}
      {...JoinRegister("name")}
      {...props.control}
      onChange={props.onChangeJoinLogin}
    ></S.InputJoinLogin>
  );
}
