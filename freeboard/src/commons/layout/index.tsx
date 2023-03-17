import styled from "@emotion/styled";
import LayoutBanner from "./banner/LayoutBanner.container";
import LayoutHeader from "./header/LayoutHeader.container";
import LayoutNavigation from "./navigation/LayoutNavigation.container";

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
  return (
    <>
      <LayoutHeader></LayoutHeader>
      {/* <LayoutBanner></LayoutBanner>
      <LayoutNavigation></LayoutNavigation> */}
      <Body>{props.children}</Body>
    </>
  );
}
