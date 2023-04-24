import { useMutation } from "@apollo/client";
import { useState } from "react";
import BoardCommentWriteUI from "./BoardCommentWrite.presenter";
import {
  CREATE_BOARD_COMMENT,
  UPDATE_BOARD_COMMENT,
} from "./BoardComment.quries";
import { useRouter } from "next/router";
import { FETCH_BOARD_COMMENTS } from "../list/BoardCommentList.queries";
import { ChangeEvent } from "react";
import {
  IMutation,
  IMutationCreateBoardCommentArgs,
  IMutationUpdateBoardCommentArgs,
  IUpdateBoardCommentInput,
} from "../../../../commons/types/generated/types";
import { IBoardCommentWriteProps } from "./BoardCommentWrite.types";

export default function BoardCommentWrite(props: IBoardCommentWriteProps) {
  const router = useRouter();
  const [writer, setWriter] = useState("");
  const [password, setPassWord] = useState("");
  const [contents, setContents] = useState("");
  const [star, setstars] = useState(0);

  const [createBoardComment] = useMutation<
    Pick<IMutation, "createBoardComment">,
    IMutationCreateBoardCommentArgs
  >(CREATE_BOARD_COMMENT);

  const [updateBoardComment] = useMutation<
    Pick<IMutation, "updateBoardComment">,
    IMutationUpdateBoardCommentArgs
  >(UPDATE_BOARD_COMMENT);

  const onChangeWriter = (event: ChangeEvent<HTMLInputElement>) => {
    //작성자 텍스트란 변경감지 함수
    setWriter(event.target.value);
  };

  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    //패스워드 텍스트란 변경감지 함수
    setPassWord(event.target.value);
  };

  const onChangeContents = (event: ChangeEvent<HTMLTextAreaElement>) => {
    //패스워드 텍스트란 변경감지 함수
    setContents(event.target.value);
  };

  const onClickWrite = async () => {
    //등록하기 버튼
    try {
      const abc = await createBoardComment({
        variables: {
          createBoardCommentInput: {
            writer: writer,
            password: password,
            contents: contents,
            rating: star,
          },
          boardId: String(router.query.BoardId),
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

      console.log(abc);
    } catch (error) {
      if (error instanceof Error) alert(error.message);
    }

    setWriter("");
    setPassWord("");
    setContents("");
  };

  const onClickUpdate = async () => {
    if (!contents) {
      //변화가 없을때 state가 빈값 이여서
      alert("내용이 수정되지 않았습니다.");
      return;
    }
    if (!password) {
      alert("비밀번호가 입력되지 않았습니다.");
      return;
    }

    try {
      const updateBoardCommentInput: IUpdateBoardCommentInput = {};
      if (contents) updateBoardCommentInput.contents = contents; // 콘텐츠에 내용이있다면 true(단순히 수정하기 누르고 수정버튼누르면 "" 값이 들어감) 무언가 입력을 해야함
      if (star !== props.el?.rating) updateBoardCommentInput.rating = star; //현재 내가준 점수와 DB에 있는 값이 같지 않다면

      if (typeof props.el?._id !== "string") return;
      await updateBoardComment({
        variables: {
          updateBoardCommentInput,
          password,
          boardCommentId: props.el?._id,
        },
        refetchQueries: [
          {
            query: FETCH_BOARD_COMMENTS,
            variables: { boardId: router.query.BoardId },
          },
        ],
      });
      props.setIsEdit?.(false); //수정창 꺼지게  하기
    } catch (error) {
      if (error instanceof Error) alert(error.message);
    }
  };

  return (
    //    게시글 작성 UI
    <BoardCommentWriteUI
      onChangeWriter={onChangeWriter}
      onChangePassword={onChangePassword}
      onChangeContents={onChangeContents}
      onClickWrite={onClickWrite}
      onClickUpdate={onClickUpdate}
      writer={writer} // 댓글 작성페이지의 작성자 입력란 데이터
      Contents={contents} // 댓글 작성페이지의 내용 입력란 데이터
      password={password} // 댓글 작성페이지의 패스워드 입력란 데이터
      setstars={setstars} // 댓글 작성페이지의 별점 입력란 데이터
      star={star}
      // BoardCommentListUIItem에서 전달해준 데이터들(아래)
      el={props.el} //10번찍힌 데이터(기존에 DB에 작성되있던 댓글 데이터 )
      isEdit={props.isEdit} //isEdit = true
    />
  );
}
