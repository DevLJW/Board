import { Item, ItemWrapper, LineWrapper, Wrapper } from "./OpenapiList.styles";

export default function OpenapiListUI(props: any) {
  return (
    <Wrapper>
      {props?.imgUrl?.map((el: any) => (
        <ItemWrapper>
          <Item key={123} src={el}></Item>
        </ItemWrapper>
      ))}
    </Wrapper>
  );
}
