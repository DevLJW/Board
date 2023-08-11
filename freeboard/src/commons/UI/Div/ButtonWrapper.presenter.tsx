import { ButtonWrapper } from "../Styles/Styles";

export default function ButtonWrapperUI(props: any) {
  return (
    <ButtonWrapper stylesprops={props.styles}>{props.children}</ButtonWrapper>
  );
}
