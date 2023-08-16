import { ImageWriteDetailInnerWrapper } from "../Styles/Styles";

export default function BasicImageWriteDetailInnerWrapperUI(props: any) {
  return (
    <ImageWriteDetailInnerWrapper stylesprops={props.styles}>
      {props.children}
    </ImageWriteDetailInnerWrapper>
  );
}
