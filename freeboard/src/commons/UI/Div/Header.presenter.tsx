import { Header } from "../Styles/Styles";

export default function HeaderUI(props: any) {
  return <Header stylesprops={props.styles}>{props.children}</Header>;
}
