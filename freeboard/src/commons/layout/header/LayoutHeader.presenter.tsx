import {
  InnerWrapper,
  Wrapper,
  InnerLogo,
  InnerButton,
} from "./LayoutHeader.styles";
import { ILayoutHeaderUI } from "./LayoutHeader.types";

export default function LayoutHeaderUI(props: ILayoutHeaderUI) {
  return (
    <Wrapper>
      <InnerWrapper>
        <InnerLogo onClick={props.onClickLogo}>💎 LIVE</InnerLogo>
        <div>
          <InnerButton onClick={props.onClickMoveToLogin}>로그인</InnerButton>
          <InnerButton onClick={props.onClickMoveToUserJoin}>
            회원가입
          </InnerButton>
          <InnerButton onClick={props.onClickMoveToShoppingBaskets}>
            장바구니
          </InnerButton>
        </div>
      </InnerWrapper>
    </Wrapper>
  );
}
