import { useRouter } from "next/router";
import LayoutHeaderUI from "./LayoutHeader.presenter";

export default function LayoutHeader() {
  const router = useRouter();

  const onClickLogo = () => {
    router.push("/");
  };

  const onClickMoveToLogin = () => {
    router.push("/Login");
  };

  const onClickMoveToUserJoin = () => {
    router.push("/UserJoin");
  };

  return (
    <LayoutHeaderUI
      onClickLogo={onClickLogo}
      onClickMoveToLogin={onClickMoveToLogin}
      onClickMoveToUserJoin={onClickMoveToUserJoin}
    ></LayoutHeaderUI>
  );
}
