import { useRouter } from "next/router";
import { useState, ChangeEvent } from "react";
import FireBaseBoardWriteUI from "./firebaseboardwrite.presenter";
import { collection, getFirestore, addDoc } from "firebase/firestore/lite";
import { firebaseApp } from "../../../../../pages/_app";
export default function FireBaseBoardWrite() {
  const router = useRouter();
  const [writer, setwriter] = useState("");
  const [title, settitle] = useState("");
  const [content, setcontent] = useState("");

  const onChangeWriter = (event: ChangeEvent<HTMLInputElement>) => {
    setwriter(event.target.value);
  };

  const onChangetitle = (event: ChangeEvent<HTMLInputElement>) => {
    settitle(event.target.value);
  };

  const onChangecontent = (event: ChangeEvent<HTMLInputElement>) => {
    setcontent(event.target.value);
  };

  const onClickSubmit = async () => {
    const boardTableTopRoot = collection(getFirestore(firebaseApp), "board"); // firestore board테이블 경로를 가져오는 함수
    await addDoc(boardTableTopRoot, { writer, title, content }); // firestore board 테이블 경로에 작성자 타이틀 콘텐츠를 객체로 담아 넣는다.
    alert("게시글 등록에 성공");
    void router.push("/firebase");
  };

  return (
    <>
      <FireBaseBoardWriteUI
        onChangeWriter={onChangeWriter}
        onChangetitle={onChangetitle}
        onChangecontent={onChangecontent}
        onClickSubmit={onClickSubmit}
      ></FireBaseBoardWriteUI>
    </>
  );
}
