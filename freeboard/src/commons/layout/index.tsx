import styled from "@emotion/styled";
import { useRouter } from "next/router";
import LayoutBanner from "./banner/LayoutBanner.container";
import LayoutHeader from "./header/LayoutHeader.container";
import LayoutNavigation from "./navigation/LayoutNavigation.container";
const HIDDEN = ["/12-02-library-star"];

interface ILayoutProps {
  children: JSX.Element;
}

const Body = styled.div`
  height: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default function Layout(props: ILayoutProps) {
  const router = useRouter();
  const isHiddenHeader = HIDDEN.includes(router.asPath);

  return (
    <>
      {/* false일때만 보여줘{!isHiddenHeader && <LayoutHeader></LayoutHeader>} */}
      <LayoutHeader></LayoutHeader>
      <LayoutBanner></LayoutBanner>
      <LayoutNavigation></LayoutNavigation>
      <Body>{props.children}</Body>
    </>
  );
}
