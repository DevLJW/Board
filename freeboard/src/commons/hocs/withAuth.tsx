import { useRouter } from "next/router";
import { useEffect } from "react";

export const WithAuth = (Component: any) => (props: any) => {
  const router = useRouter();

  useEffect(() => {
    //  프리렌더링 과정에서 프론트엔드는 localStorage 기능이 없기때문에 렌더링이 끝난 후 실행되는 useEffetc사용
    if (!localStorage.getItem("accessToken")) {
      // alert("로그인 후 이용 가능 합니다.");
      // void router.push(`/Login`);
    }
  }, []);

  return <Component {...props}></Component>;
};
