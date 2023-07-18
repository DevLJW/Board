import { Children } from "react";
import * as S from "../Join_Login.styles";
export default function JoinLoginFormItemUI(props: any) {
  return (
    <S.FormItemJoinLogin
      valuePropName={props.valuePropName}
      wrapperCol={props.wrapperCol}
      name={props.name}
      label={props.label}
    >
      {props.children}
    </S.FormItemJoinLogin>
  );
}
