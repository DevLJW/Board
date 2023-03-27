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
          <InnerButton>회원가입</InnerButton>
        </div>
      </InnerWrapper>
    </Wrapper>
  );
}