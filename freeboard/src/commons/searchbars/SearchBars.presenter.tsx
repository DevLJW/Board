import * as S from "./SearchBars.styles";
import { ISearchBarsUI } from "./SearchBars.types";

export default function SearchBarsUI(props: ISearchBarsUI) {
  return (
    <S.InputSpace direction="vertical">
      <S.SearchInput
        placeholder="input search text"
        enterButton="Search"
        size="large"
        suffix={<S.MyIcon></S.MyIcon>}
        onChange={props.onChangeSearchbar}

        //입력 텍스트 안에 아이콘
      />
    </S.InputSpace>
  );
}
