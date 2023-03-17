import "../styles/globals.css";

import type { AppProps } from "next/app";
import ApolloSettingProps from "../src/components/apollo";
import Layout from "../src/commons/layout";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloSettingProps>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ApolloSettingProps>
  );
}
