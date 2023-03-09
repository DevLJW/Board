import * as S from "./BoardCommentList.styles";
import { getMyDate } from "../../../../commons/utils/utils";
import { IBoardCommentListUIProps } from "./BoardCommentList.types";
//Current 버블링에 의해 실행된 온클릭이 실행된 현재태그 아이디 가져오기
//Target 현재 선택한 태그의 실행된 현재태그 아이디 가져오기
//자식 태그, 부모태그에 id={el.writer} onClick={name} 설정하면 2번 실행이 된다.

export default function BoardCommentListUI(props: IBoardCommentListUIProps) {
  const name = (event) => {
    alert(event.currentTarget.id + "님이 작성한 글 입니다.");
  };

  return (
    <div>
      {props.data?.fetchBoardComments?.map((el) => (
        <S.ItemWrapper id={el.writer} onClick={name}>
          <S.FlexWrapper>
            <S.Avatar src="/images/avatar.png" />
            <S.MainWrapper>
              <S.WriterWrapper>
                <S.Writer id={"123"} onClick={name}>
                  {el.writer}
                </S.Writer>
              </S.WriterWrapper>
              <S.Contents>{el.contents}</S.Contents>
            </S.MainWrapper>
            <S.OptionWrapper>
              <S.UpdateIcon src="/images/boardComment/list/option_update_icon.png/" />
              <S.DeleteIcon
                id={el._id}
                src="/images/boardComment/list/option_delete_icon.png/"
                onClick={props.onClickDelete}
              />
            </S.OptionWrapper>
          </S.FlexWrapper>
          <S.DateString>{getMyDate(el?.createdAt)}</S.DateString>
        </S.ItemWrapper>
      ))}
    </div>
  );
}
