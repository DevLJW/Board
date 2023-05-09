import SearchBarsUI from "./SearchBars.presenter";
import { ISearchBars } from "./SearchBars.types";
import _ from "lodash";
export default function SearchBars(props: ISearchBars) {
  const debounce1 = _.debounce((value: any) => {
    void props.refetch({ search: value, page: 1 });
    void props.refetchBoardsCount({ search: value });
    props.onChangeKeyword(value); // 검색한 내용 강조 표시하기
    console.log("123");
  }, 200); // 마지막 추가 입력후 2초동안 글작성 없을시, 함수 2줄실행

  function onChangeSearchbar(event: any) {
    debounce1(event?.target.value);
  }

  return <SearchBarsUI onChangeSearchbar={onChangeSearchbar}></SearchBarsUI>;
}
