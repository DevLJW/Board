import { useRouter } from "next/router";
import * as S from "./BoardCommentList.styles";
import { IBaoardCommentListUIItempProps } from "./BoardCommentList.types";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { IQuery } from "../../../../commons/types/generated/types";
import {
  DELETE_BOARD_COMMENT,
  FETCH_BOARD_COMMENTS,
} from "./BoardCommentList.queries";
import { ChangeEvent, MouseEvent } from "react";
import { getMyDate } from "../../../../commons/utils/utils";
import BoardCommentWrite from "../write/BoardCommentWrite.container";

//  댓글 리스트 아이템 하나하나를 보여주는 컴포넌트
export default function BoardCommentListUIItem(
  props: IBaoardCommentListUIItempProps
) {
  const router = useRouter();
  const [isEdit, setIsEdit] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [myBoardCommentId, setMyBoardCommentId] = useState("");
  const [myPassword, setMyPassword] = useState("");
  const [deleteBoardComment] = useMutation<IQuery>(DELETE_BOARD_COMMENT);

  const onclickOpenDeleteModal = (event: MouseEvent<HTMLImageElement>) => {
    //  X버튼을 클릭했을때
    setMyBoardCommentId(event.target.id);
    setIsOpenDeleteModal(true); //오픈모달 true로 변경하여
  };

  const onChangeDeletePassword = (event: ChangeEvent<HTMLInputElement>) => {
    //
    setMyPassword(event.target.value);
  };

  const onClickUpdate = () => {
    // 수정하기 아이콘 눌렀을때
    setIsEdit(true);
  };
  const onCancel = () => {
    setIsOpenDeleteModal(false);
  };
  const onClickDelete = async (event: MouseEvent<HTMLElement>) => {
    //  Delete
    //삭제 확인하기 버튼
    if (!(event.target instanceof HTMLElement)) return;
    try {
      await deleteBoardComment({
        variables: {
          password: myPassword,
          boardCommentId: myBoardCommentId,
        },
        refetchQueries: [
          {
            query: FETCH_BOARD_COMMENTS,
            variables: {
              boardId: String(router.query.BoardId),
            },
          },
        ],
      });
      setIsOpenDeleteModal(false);
    } catch (error) {
      if (error instanceof Error) alert(error.message);
    }
  };

  return (
    <>
      {isOpenDeleteModal && (
        <S.PasswordModal
          visible={true}
          onOk={onClickDelete}
          onCancel={onCancel}
        >
          <div>비밀번호 입력: </div>
          <S.PasswordInput type="password" onChange={onChangeDeletePassword} />
        </S.PasswordModal>
      )}
      {!isEdit && ( //  isEdit가 NOT일떄 댓글리스트 한개가 수정 페이지로 보여짐
        <S.ItemWrapper id={props.el.writer}>
          <S.FlexWrapper>
            <S.Avatar src="/images/avatar.png" />
            <S.MainWrapper>
              <S.WriterWrapper>
                <S.Writer id={"123"}>{props.el.writer}</S.Writer>
                <S.Star value={props.el.rating} disabled />
              </S.WriterWrapper>
              <S.Contents>{props.el.contents}</S.Contents>
            </S.MainWrapper>
            <S.OptionWrapper>
              <S.UpdateIcon // 댓글 수정하기 버튼
                src="/images/boardComment/list/option_update_icon.png/"
                onClick={onClickUpdate}
              />
              <S.DeleteIcon //  댓글 삭제하기 버튼
                id={props.el._id}
                src="/images/boardComment/list/option_delete_icon.png/"
                onClick={onclickOpenDeleteModal}
              />
            </S.OptionWrapper>
          </S.FlexWrapper>
          <S.DateString>{getMyDate(props.el?.createdAt)}</S.DateString>
        </S.ItemWrapper>
      )}
      {/* 수정하기 버튼을 클릭하면 setisEdit가 true가 되며 해당구문실행 리스트화면을 열었을때 가져온 데이터 10개를 게시글 작성컴포넌트에 전달하여 데이터를 뿌려줌  */}
      {isEdit && (
        <BoardCommentWrite isEdit={true} setIsEdit={setIsEdit} el={props.el} />
        //el: 게시글 상세보기 화면을 열었을때 실행되는 BoardCommentList(container) --> BoardCommentListUI(presenter) 컴포넌트의 10개의 데이터 --> BoardCommentListUIItem 전달
        //수정하기로 들어올때는 props로 전달이 안된다(?).
        //댓글리스트로 들어와 게시글 작성을 리턴할떄는 props값이 전달
      )}
      ;
    </>
  );
}
