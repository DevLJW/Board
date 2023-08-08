import { ItemWrapper } from "../Styles/Styles";

export default function BasicItemWrapperUI(props: any) {
  return <ItemWrapper stylesprops={props.styles}>{props.children}</ItemWrapper>;
}
