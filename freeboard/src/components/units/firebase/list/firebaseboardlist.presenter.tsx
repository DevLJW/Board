import { FireBaseBoardListUIProps } from "./firebase.boardlist.types";
import * as S from "./firebaseboardlist.styles";
// import { v4 as uuidv4 } from "uuid";
export default function FireBaseBoardListUI(props: FireBaseBoardListUIProps) {
  return (
    <>
      <S.Wrapper>
        <S.Row>
          <S.ColumnHeaderBasic>번호</S.ColumnHeaderBasic>
          <S.ColumnHeaderBasic>제목</S.ColumnHeaderBasic>
          <S.ColumnHeaderTitle>내용</S.ColumnHeaderTitle>
          <S.ColumnHeaderBasic>작성자</S.ColumnHeaderBasic>
        </S.Row>
        {props.dataBoards?.map((el: any, index: number) => (
          <S.Row key={el.key}>
            <S.ColumnBasic>{index + 1}</S.ColumnBasic>
            <S.ColumnBasic>{el.title}</S.ColumnBasic>
            <S.ColumnTitle>{el.contents}</S.ColumnTitle>
            <S.ColumnBasic>{el.writer}</S.ColumnBasic>
          </S.Row>
        ))}
        <S.Button onClick={props.onClickMoveBoardWrite}>
          <S.PencilIcon src="/images/board/list/write.png" />
          게시물 등록하기
        </S.Button>
      </S.Wrapper>
    </>
  );
}
