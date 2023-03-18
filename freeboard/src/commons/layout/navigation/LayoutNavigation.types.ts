import { MouseEvent } from "react";
export default interface ILayoutNavigationUI {
  OnClick: (event: MouseEvent<HTMLDivElement>) => void;
}
