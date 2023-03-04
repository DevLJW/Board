import { useMutation } from "@apollo/client";
import { useState } from "react";
import BoardCommentUI from "./BoardCommentWrite.presenter";
import { CREATE_BOARD_COMMENT } from "./BoardComment.quries";
import { useRouter } from "next/router";
import { FETCH_BOARD_COMMENTS } from "../list/BoardCommentListqueries";

export default function BoardCommentWrite() {
  const router = useRouter();
  const [Writer, setWriter] = useState("");
  const [PassWord, setPassWord] = useState("");
  const [Contents, setContents] = useState("");
  const [createBoardComment] = useMutation(CREATE_BOARD_COMMENT);

  const onChangeWriter = (event) => {
    //작성자 텍스트란 변경감지 함수
    setWriter(event.target.value);
  };

  const onChangePassword = (event) => {
    //패스워드 텍스트란 변경감지 함수
    setPassWord(event.target.value);
  };

  const onChangeContents = (event) => {
    //패스워드 텍스트란 변경감지 함수
    setContents(event.target.value);
  };

  const onClickWrite = async () => {
    //등록하기 버튼

    await createBoardComment({
      variables: {
        createBoardCommentInput: {
          writer: Writer,
          password: PassWord,
          contents: Contents,
          rating: 0,
        },
        boardId: router.query.boardId,
      },

      refetchQueries: [
        {
          query: FETCH_BOARD_COMMENTS,
          variables: {
            boardId: router.query.boardId,
          },
        },
      ],
    });
    try {
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <BoardCommentUI
      onChangeWriter={onChangeWriter}
      onChangePassword={onChangePassword}
      onChangeContents={onChangeContents}
      onClickWrite={onClickWrite}
      Contents={Contents}
    />
  );
}
