import * as S from "./paginations.styles";
import { IPaginationsUI } from "./paginations.types";

export default function PaginationsUI(props: IPaginationsUI) {
  return (
    <>
      <S.Page onClick={props.onClickPrevPage}>{`<`}</S.Page>
      {Array(10)
        .fill(1)
        .map(
          (el, index) =>
            props.startPage + index <= props.lastPage && (
              <S.Page
                key={index + props.startPage}
                id={String(index + props.startPage)}
                onClick={props.onClickPage}
              >
                {index + props.startPage}
              </S.Page>
            )
        )}
      <S.Page onClick={props.onClickNextPage}>{`>`}</S.Page>;
    </>
  );
}
