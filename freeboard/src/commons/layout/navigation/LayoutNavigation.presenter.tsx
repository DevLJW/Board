import { Fragment } from "react";
import { Wrapper, MenuItem } from "./LayoutNavigation.styles";
import ILayoutNavigationUI from "./LayoutNavigation.types";

export default function LayoutNavigationUI(props: ILayoutNavigationUI) {
  const item = [
    { name: "라이브 게시판", page: "/API/Image" },
    { name: "라이브 아이템 ", page: "/markets" },
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
