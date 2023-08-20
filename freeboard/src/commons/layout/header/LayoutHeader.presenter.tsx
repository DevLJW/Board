import {
  InnerWrapper,
  Wrapper,
  InnerLogo,
  InnerButton,
} from "./LayoutHeader.styles";
import { ILayoutHeaderUI } from "./LayoutHeader.types";

const exam = () => {
  console.log("개발예정");
};

export default function LayoutHeaderUI(props: ILayoutHeaderUI) {
  return (
    <Wrapper>
      <InnerWrapper>
        <InnerLogo onClick={props.onClickLogo}>💎 LIVE</InnerLogo>
        <div>
          <InnerButton
            onClick={props.UserInfoData ? exam : props.onClickMoveToLogin}
          >
            {props.UserInfoData
              ? props.UserInfoData.fetchUserLoggedIn.name
              : "로그인"}
          </InnerButton>
          <InnerButton
            onClick={props.UserInfoData ? exam : props.onClickMoveToUserJoin}
          >
            {props.UserInfoData ? "로그아웃" : "회원가입"}
          </InnerButton>
          <InnerButton onClick={props.onClickMoveToShoppingBaskets}>
            장바구니
          </InnerButton>
        </div>
      </InnerWrapper>
    </Wrapper>
  );
}
