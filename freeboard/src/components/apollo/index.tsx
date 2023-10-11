import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { ApolloLink } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import { accessTokenState } from "../../commons/store";
import { useRecoilState } from "recoil";
import { useEffect } from "react";
import { Global } from "@emotion/react";
import { globalStyles } from "../../../styles/globalstyle";
const GLOBAL_STATE = new InMemoryCache(); //  InMemoryCache() 아폴로 전역캐시를 저장해놓는곳
//  페이지 이동시 app.tsx부터 리렌더링되어 지역변수가 아닌 전역으로 빼준다.

interface IApolloSettingProps {
  children: JSX.Element;
}

export default function ApolloSettingProps(props: IApolloSettingProps) {
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      const result = localStorage.getItem("accessToken");
      if (result) setAccessToken(result);
    }
  }, []);

  const uploadLink = createUploadLink({
    uri: "https://backendonline.codebootcamp.co.kr/graphql",
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  const client = new ApolloClient({
    uri: "https://backendonline.codebootcamp.co.kr/graphql",
    link: ApolloLink.from([uploadLink as unknown as ApolloLink]),
    cache: GLOBAL_STATE,
  });

  //    prettier-ignore
  return <ApolloProvider client={client}>
      <Global styles={globalStyles}></Global>
    {props.children}

  </ApolloProvider>;
}
