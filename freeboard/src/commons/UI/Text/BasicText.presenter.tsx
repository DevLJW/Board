import { BasicText } from "../Styles/Styles";

export default function BasicTextUI(props: any) {
  return (
    <BasicText
      stylesprops={props.styles}
      onClick={props.OnClickFunction}
      key={props.key}
      id={props.id}
    >
      {props.children}
    </BasicText>
  );
}
