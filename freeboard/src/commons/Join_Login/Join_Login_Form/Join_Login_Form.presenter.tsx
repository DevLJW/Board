import { ReactHTMLElement } from "react";
import * as S from "../Join_Login.styles";
export default function JoinLoginFormUI(props: any) {
  return (
    <S.FormJoinLogin
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={props.onFinish}
      autoComplete="off"
    >
      {props.childrenJoinLoginForm}
    </S.FormJoinLogin>
  );
}
