import JoinLoginUI from "./Join_Login.presenter";
import { IJoinLoginprops } from "./Join_Login.types";
import { useRecoilState } from "recoil";
import {
  FETCH_USER_LOGGED_IN,
  JOIN_USER,
  LOGIN_USER,
} from "./Join_Login.queries";
import { useMutation, useQuery } from "@apollo/client";
import {
  IMutation,
  IMutationCreateUserArgs,
  IMutationLoginUserArgs,
  IQuery,
} from "../../../../commons/types/generated/types";
import { Checkbox, Modal } from "antd";
import { useRouter } from "next/router";
import { accessTokenState } from "../../../../commons/store";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import JoinLoginInput from "../../../../commons/Join_Login/Join_Login_Input/Join_Login_Input.container";
import JoinLoginForm from "../../../../commons/Join_Login/Join_Login_Form/Join_Login_Form.container";
import JoinLoginFormItem from "../../../../commons/Join_Login/Join_Login_Form_Item/Join_Login_Form_Item.comtainer";

import { ButtonJoinLogin } from "./Join_Login.styles";
import { FormProvider } from "react-hook-form";

export interface IJoinSchema {
  email: string;
  password: string;
  name: string;
}

export interface ILoginSchema {
  email: string;
  password: string;
}

const EmailRegexr =
  /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]*\.[a-zA-Z]{2,3}$/;

// const test =
//   /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;

// 처음시작[숫자,영문자,영대소문자] 그다음 [-나 _나 . 사용해도되고 안해도됨 그다음엔 문자열와야댐]
// @뒤에 [숫자,영문자,영대소문자] 그사이 -나 _나 . 사용해도되고 안해도됨 그다음 숫자,영문자,영대소문자 그다음 .com
// ex l-ju1113@n-1.com 가능

//  회원가입 스키마
// required : 해당 인풋값이 null이면 "필수입력값입니다." 표기
// yup는 email 조건을 .email로 표현 가능. 하지만, yup의 email을 사용한다면 한국에서와 외국에서의 이메일 조건이 달라 .으로 시작하는 이메일 X(네이버만가능)
const JoinSchema = yup.object<IJoinSchema>({
  email: yup
    .string()
    .matches(EmailRegexr, "이메일 형식으로 입력 해주세요.")
    .required("필수 입력값입니다."),
  password: yup.string().min(4).max(15).required("필수 입력값 입니다."),
  name: yup.string().required("필수 입력값 입니다."),
});

//  로그인 스키마
const LoginSchema = yup.object<ILoginSchema>({
  email: yup
    .string()
    .email("이메일 형식으로 입력 해주세요.")
    .required("필수 입력값입니다."),
  password: yup
    .string()
    .min(4, "비밀번호는 최소 4자리 이상 입니다.")
    .max(15, "비밀번호는 최대 15자리 입니다.")
    .required("필수 입력값 입니다."),
});

export default function JoinLogin(props: IJoinLoginprops) {
  // true --> login false --> Join
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);

  const router = useRouter();

  //회원가입 폼
  const Joinmethods = useForm<IJoinSchema>({
    resolver: yupResolver(JoinSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  //로그인 폼
  const Loginmethods = useForm<IJoinSchema>({
    resolver: yupResolver(LoginSchema),
    // mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [JoinUser] = useMutation<
    Pick<IMutation, "createUser">,
    IMutationCreateUserArgs
  >(JOIN_USER);

  const [LoginUser] = useMutation<
    Pick<IMutation, "loginUser">,
    IMutationLoginUserArgs
  >(LOGIN_USER);

  const abc = () => {
    const { data } =
      useQuery<Pick<IQuery, "fetchUserLoggedIn">>(FETCH_USER_LOGGED_IN);
    console.log(data);
  };

  // const onChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
  //   setEmail(event.target.value);
  // };

  // const onChangeName = (event: ChangeEvent<HTMLInputElement>) => {
  //   setName(event.target.value);
  // };

  // const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
  //   setPassword(event.target.value);
  // };

  const createUserButton = async (data: IJoinSchema) => {
    try {
      const joinuser = await JoinUser({
        variables: {
          createUserInput: {
            email: data.email,
            password: data.password,
            name: data.name,
          },
        },
      });

      console.log(joinuser);
    } catch (error) {
      if (error instanceof Error) console.log(error.message);
      return;
    }

    Modal.confirm({ content: "회원가입에 성공 했습니다." });
    router.push(`/Login`);
  };

  const LoginButton = async (data: ILoginSchema) => {
    try {
      const result = await LoginUser({
        variables: {
          email: data.email,
          password: data.password,
        },
      });
      const accessToken = result.data?.loginUser.accessToken; //  토큰변수에담기

      if (!accessToken) {
        Modal.error({
          content: "로그인에 실패하였습니다. 다시 시도해 주세요.",
        });
        return;
      }
      setAccessToken(accessToken); // 글로벌 스테이트에 담기

      localStorage.setItem("accessToken", accessToken); //로컬스토리지에 저장
    } catch (error) {
      if (error instanceof Error) Modal.error({ content: error.message });
    }

    void router.push(`/`); //게시글 리스트로 이동
  };
  //true일때 로그인 false일때 회원가입
  return (
    <>
      <FormProvider
        {...(props.isEdit ? { ...Loginmethods } : { ...Joinmethods })}
      >
        <JoinLoginForm
          onFinish={
            props.isEdit
              ? Loginmethods.handleSubmit(LoginButton)
              : Joinmethods.handleSubmit(createUserButton)
          }
        >
          <JoinLoginFormItem name="emailLabel" label="email">
            <JoinLoginInput name="email"></JoinLoginInput>
            <div>{Joinmethods.formState.errors.email?.message}</div>
          </JoinLoginFormItem>
          <JoinLoginFormItem name="passwordLabel" label="password">
            <JoinLoginInput name="password"></JoinLoginInput>
            {/* <div>{formState.errors.password?.message}</div> */}
          </JoinLoginFormItem>

          {props.isEdit ? (
            ""
          ) : (
            <JoinLoginFormItem name="nameLabel" label="name">
              <JoinLoginInput name="name"></JoinLoginInput>
              {/* <div>{formState.errors.name?.message}</div> */}
            </JoinLoginFormItem>
          )}

          <JoinLoginFormItem
            name="remember"
            valuePropName="checked"
            wrapperCol={{ offset: 8, span: 16 }}
          >
            <Checkbox>Remember Me</Checkbox>
          </JoinLoginFormItem>

          <JoinLoginFormItem wrapperCol={{ offset: 8, span: 16 }}>
            <ButtonJoinLogin htmlType="submit">Submit</ButtonJoinLogin>
          </JoinLoginFormItem>
        </JoinLoginForm>
      </FormProvider>
    </>
  );
}
