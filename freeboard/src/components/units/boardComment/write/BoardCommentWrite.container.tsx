import { useMutation } from "@apollo/client";
import { useState } from "react";
import BoardCommentUI from "./BoardCommentWrite.presenter";
import { CREATE_BOARD_COMMENT } from "./BoardComment.quries";
import { useRouter } from "next/router";
import { FETCH_BOARD_COMMENTS } from "../list/BoardCommentList.queries";

export default function BoardCommentWrite() {
  const router = useRouter();
  const [writer, setWriter] = useState("");
  const [password, setPassWord] = useState("");
  const [contents, setContents] = useState("");
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
    try {
      const abc = await createBoardComment({
        variables: {
          createBoardCommentInput: {
            writer: writer,
            password: password,
            contents: contents,
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

      console.log(abc);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <BoardCommentUI
      onChangeWriter={onChangeWriter}
      onChangePassword={onChangePassword}
      onChangeContents={onChangeContents}
      onClickWrite={onClickWrite}
      Contents={contents}
    />
  );
}
