import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { LoginUserInfo, accessTokenState } from "../store";
import { FETCH_USER_LOGGED_IN } from "../../components/units/User/Join_Login/Join_Login.queries";
import { IQuery } from "../types/generated/types";
import { useQuery } from "@apollo/client";

export const WithAuth = (Component: any) => (props: any) => {
  const router = useRouter();
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);
  const [LoginInfo, setAccessLoginInfo] = useRecoilState(LoginUserInfo);

  useEffect(() => {
    //  프리렌더링 과정에서 프론트엔드는 localStorage 기능이 없기때문에 렌더링이 끝난 후 실행되는 useEffetc사용
    if (!localStorage.getItem("accessToken")) {
      alert("로그인 후 이용 가능 합니다.");
      setAccessToken("");
      setAccessLoginInfo("");
      void router.push(`/Login`);
    }
  }, []);

  return <Component {...props}></Component>;
};
