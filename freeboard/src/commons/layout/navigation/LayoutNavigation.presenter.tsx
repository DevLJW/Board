import { Fragment } from "react";
import { Wrapper, MenuItem } from "./LayoutNavigation.styles";
import ILayoutNavigationUI from "./LayoutNavigation.types";

export default function LayoutNavigationUI(props: ILayoutNavigationUI) {
  const item = [
    { name: "자유게시판", page: "/" },
    { name: "중고마켓 ", page: "/UsedMarket" },
    { name: "마이페이지", page: "/mypages" },
  ];
  return (
    <Wrapper>
      {item.map((el) => (
        <Fragment key={el.page}>
          <MenuItem id={el.page} onClick={props.OnClick}>
            {el.name}
          </MenuItem>
        </Fragment>
      ))}
    </Wrapper>
  );
}
