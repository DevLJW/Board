import React from "react";

import * as S from "../Join_Login/Join_Login.styles";
import { IJoinLoginUIprops } from "./Join_Login.types";
import { Controller } from "react-hook-form";
import { Input } from "antd";

export default function JoinLoginUI(props: IJoinLoginUIprops) {
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  return (
    <S.FormJoinLogin
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      autoComplete="off"
      onFinish={onFinish}
    >
      <S.FormItemJoinLogin
        label="E-Mail"
        name="E-Mail"
        rules={[{ required: true, message: "Please input your E-Mail" }]}
      >
        <Controller
          name="email"
          control={props.LoginControl}
          render={({ field: { onChange, value, ref } }) => {
            return (
              <S.InputJoinLogin
                name="email"
                type="text"
                onChange={(e) => onChange(e.target.value)}
              ></S.InputJoinLogin>
            );
          }}
        ></Controller>
      </S.FormItemJoinLogin>

      {props.isEdit ? (
        ""
      ) : (
        <S.FormItemJoinLogin
          label="name"
          name="name"
          rules={[{ required: true, message: "Please input your name" }]}
        >
          <S.InputJoinLogin type="text" {...props.nameJoinregister} />
        </S.FormItemJoinLogin>
      )}

      <S.FormItemJoinLogin
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <S.InputPasswordJoinLogin
          type="text"
          {...(props.isEdit
            ? { ...props.passwordLoginregister }
            : { ...props.passwordJoinregister })}
        />
      </S.FormItemJoinLogin>

      <S.FormItemJoinLogin
        name="remember"
        valuePropName="checked"
        wrapperCol={{ offset: 8, span: 16 }}
      >
        <S.CheckboxJoinLogin>Remember me</S.CheckboxJoinLogin>
      </S.FormItemJoinLogin>

      <S.FormItemJoinLogin wrapperCol={{ offset: 8, span: 16 }}>
        <S.ButtonJoinLogin type="primary" htmlType={"submit"}>
          {props.isEdit ? "로그인하기" : "회원가입하기"}
        </S.ButtonJoinLogin>
      </S.FormItemJoinLogin>
    </S.FormJoinLogin>
  );
}
