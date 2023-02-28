import { useState } from "react";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import BoardWriteUI from "./BoardWrite.presenter";
import { CREATE_BOARD } from "./BoardWrite.quries";

export default function BoardWrite() {
  const [writer, setWriter] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");

  const [writerError, setWriterError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [titleError, setTitleError] = useState("");
  const [contentsError, setContentsError] = useState("");

  const [BoardInfoAdd] = useMutation(CREATE_BOARD); //API 통신 함수

  const router = useRouter();

  const onChangeWriter = (event) => {
    setWriter(event.target.value);
    if (event.target.value !== "") {
      //빈칸에서 버튼 클릭시 ,에러 메시지 출력 --> 내용입력시 에러메시지 없애주는 용도
      setWriterError("");
    }
  };

  const onChangePassword = (event) => {
    setPassword(event.target.value);
    if (event.target.value !== "") {
      setPasswordError(""); //에러 초기화
    }
  };

  const onChangeTitle = (event) => {
    setTitle(event.target.value);
    if (event.target.value !== "") {
      setTitleError("");
    }
  };

  const onChangeContents = (event) => {
    setContents(event.target.value);
    if (event.target.value !== "") {
      setContentsError("");
    }
  };

  const onClickSubmit = async () => {
    if (!writer) {
      setWriterError("작성자를 입력해주세요.");
    }
    if (!password) {
      setPasswordError("비밀번호를 입력해주세요.");
    }
    if (!title) {
      setTitleError("제목을 입력 해주세요.");
    }
    if (!contents) {
      setContentsError("내용을 입력해주세요.");
    }
    if (writer && password && title && contents) {
      alert("게시글이 등록 되었습니다.");
    }

    try {
      const result = await BoardInfoAdd({
        variables: {
          createBoardInput: {
            writer: writer,
            password: password,
            title: title,
            contents: contents,
          },
        },
      });
      //console.log(result);
      router.push(`/boards/${result.data.createBoard._id}`);
    } catch (error) {
      // alert(error.message);
    }
  };

  return (
    <BoardWriteUI
      writerError={writerError}
      passwordError={passwordError}
      titleError1={titleError}
      contentsError={contentsError}
      onChangeWriter={onChangeWriter}
      onChangePassword={onChangePassword}
      onChangeTitle={onChangeTitle}
      onChangeContents={onChangeContents}
      onClickSubmit={onClickSubmit}
    />
  );
}
