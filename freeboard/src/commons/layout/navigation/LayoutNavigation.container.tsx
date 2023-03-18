import { useRouter } from "next/router";
import { MouseEvent } from "react";
import LayoutNavigationUI from "./LayoutNavigation.presenter";

export default function LayoutNavigation() {
  const router = useRouter();
  const OnClick = (event: MouseEvent<HTMLDivElement>) => {
    router.push(event.currentTarget.id);
  };

  return <LayoutNavigationUI OnClick={OnClick}></LayoutNavigationUI>;
}
