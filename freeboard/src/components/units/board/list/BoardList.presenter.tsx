import { getMyDate } from "../../../../commons/utils/utils";

import * as S from "./BoardList.style";
import { IBoardListUIProps } from "./BoardList.types";
import PaginationsMain from "../../../../commons/paginations/paginations.container";
export default function BoardListUI(props: IBoardListUIProps) {
  return (
    <S.Wrapper>
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
          <S.ColumnTitle id={el._id} onClick={props.onClickBoardDetail}>
            {el.title}
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
