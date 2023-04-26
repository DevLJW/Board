import * as S from "./BoardComment.styles";
import { IBoardCommentWriteUIProps } from "./BoardCommentWrite.types";

export default function BoardCommentWriteUI(props: IBoardCommentWriteUIProps) {
  return (
    <S.Wrapper>
      {!props.isEdit && ( //  isEdit가 false일때는 수정하기가 아님
        <>
          <S.PencilIcon src="/images/boardComment/write/pencil.png"></S.PencilIcon>
          <span>댓글 </span>
        </>
      )}

      <S.InputWrapper>
        <S.Input
          type="text"
          placeholder="작성자"
          onChange={props.onChangeWriter}
          value={props.writer || (props.el?.writer ?? "")}
          // props.writer(입력란 데이터)가 없으면(댓글 작성) 댓글작성이 아니므로, DB에서 가져온 데이터 보여주기(수정하기)(props.el?.writer값이 없으면 "" 반환)
          readOnly={!!props.el?.writer}
        ></S.Input>
        <S.Input
          type="password"
          placeholder="비밀번호"
          onChange={props.onChangePassword}
          value={props.password}
        ></S.Input>
        <S.Star
          onChange={props.setstars}
          value={props.star || props.el?.rating}
        />
      </S.InputWrapper>

      <S.ContentsWrapper>
        <S.Contents
          onChange={props.onChangeContents}
          maxLength={100}
          placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
          value={props.Contents || (props.el?.contents ?? "")}
        ></S.Contents>
        {/* props.Contents(게시글 작성에서 가져온 데이터) props.el.contents(기존에 DB에 있던 데이터) */}
        <S.BottomWrapper>
          <S.ContentsLength>
            {(props.Contents
              ? props.Contents.length
              : props.el?.contents.length) ?? 0}
            /100
          </S.ContentsLength>
          <S.Button
            onClick={props.isEdit ? props.onClickUpdate : props.onClickWrite}
          >
            {props.isEdit ? "수정하기" : "등록하기"}
          </S.Button>
        </S.BottomWrapper>
      </S.ContentsWrapper>
    </S.Wrapper>
  );
}
