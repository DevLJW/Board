import { IJoinLoginSchema } from "../../../components/units/User/Join_Login/Join_Login.container";
import JoinLoginInputUI from "./Join_Login_Input_presenter";
import * as S from "../Join_Login.styles";
import { UseControllerProps, useController } from "react-hook-form";
import { useState } from "react";

export default function JoinLoginInput(
  props: UseControllerProps<IJoinLoginSchema>
) {
  const { field, fieldState } = useController(props);

  const onChangeJoinLogin = (event: any) => {
    field.onChange(event.target.value); // data send back to hook form
    console.log(field.value);
  };

  return (
    <>
      <JoinLoginInputUI
        field={field}
        name={props.name}
        onChangeJoinLogin={onChangeJoinLogin}
        control={props.control}
      ></JoinLoginInputUI>
    </>
  );
}
