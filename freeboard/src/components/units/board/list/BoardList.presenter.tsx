import { getMyDate } from "../../../../commons/utils/utils";

import * as S from "./BoardList.style";
import { IBoardListUIProps } from "./BoardList.types";
import PaginationsMain from "../../../../commons/paginations/paginations.container";
import SearchBars from "../../../../commons/searchbars/SearchBars.container";
import { v4 as uuid4 } from "uuid";
export default function BoardListUI(props: IBoardListUIProps) {
  return (
    <S.Wrapper>
      <SearchBars
        refetch={props.refetch}
        onChangeKeyword={props.onChangeKeyword}
        refetchBoardsCount={props.refetchBoardsCount}
      ></SearchBars>
      <S.TableTop />
      <S.Row>
        <S.ColumnHeaderBasic>ID</S.ColumnHeaderBasic>
        <S.ColumnHeaderTitle>제목</S.ColumnHeaderTitle>
        <S.ColumnHeaderBasic>작성자</S.ColumnHeaderBasic>
        <S.ColumnHeaderBasic>날짜</S.ColumnHeaderBasic>
      </S.Row>
      {props.data?.fetchBoards.map((el, index) => (
        <S.Row key={el._id}>
          <S.ColumnBasic>{index + 1}</S.ColumnBasic>
          {
            /* S.ColumTitle은 제목 전체영역 전체영역안에 S.TextToken이 있어 TextToken이 눌릴때 ColumTitle에 있는 온클릭이 실행 되어*/
            // S.ColumnTitle의 아이디 값을 가져와야하므로 event.targetCurrent.id를 사용
          }
          <S.ColumnTitle id={el._id} onClick={props.onClickBoardDetail}>
            {el.title
              .replaceAll(props.keyword, `!@#${props.keyword}!@#`)
              .split("!@#") //  !@#안녕하세요!@# --> [!@#,안녕하세요,!@#]
              .map((el) => (
                <S.TextToken key={uuid4()} isMatched={props.keyword === el}>
                  {el}
                </S.TextToken>
              ))}
          </S.ColumnTitle>
          <S.ColumnBasic>{el.writer}</S.ColumnBasic>
          <S.ColumnBasic>{getMyDate(el.createdAt)}</S.ColumnBasic>
        </S.Row>
      ))}
      <S.TableBottom />
      <S.Footer>
        <PaginationsMain
          refetch={props.refetch}
          BoardsCount={props.BoardsCount}
        ></PaginationsMain>
        <S.Button onClick={props.onClickNewBoard}>
          <S.PencilIcon src="/images/board/list/write.png" />
          게시물 등록하기
        </S.Button>
      </S.Footer>
    </S.Wrapper>
  );
}
