import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { ApolloLink } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";

interface IApolloSettingProps {
  children: JSX.Element;
}
export default function ApolloSettingProps(props: IApolloSettingProps) {
  const uploadLink = createUploadLink({
    uri: "https://backendonline.codebootcamp.co.kr/graphql",
  });

  const client = new ApolloClient({
    uri: "https://backendonline.codebootcamp.co.kr/graphql",
    link: ApolloLink.from([uploadLink as unknown as ApolloLink]),
    cache: new InMemoryCache(),
  });

  //    prettier-ignore
  return <ApolloProvider client={client}>
    {props.children}

  </ApolloProvider>;
}
