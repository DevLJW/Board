import { ChangeEvent, useState } from "react";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import BoardWriteUI from "./BoardWrite.presenter";
import { CREATE_BOARD, UPDATE_BOARD } from "./BoardWrite.quries";
import {
      IMutation,
      IMutationCreateBoardArgs,
      IMutationUpdateBoardArgs,
      IUpdateBoardInput,
} from "../../../../commons/types/generated/types";
import { IBoardWriteProps } from "./BoardWrite.types";

export default function BoardWrite(props: IBoardWriteProps) {
      const [writer, setWriter] = useState("");
      const [password, setPassword] = useState("");
      const [title, setTitle] = useState("");
      const [contents, setContents] = useState("");
      const [isActive, setIsActive] = useState(false); //버튼 활성화 훅

      const [writerError, setWriterError] = useState("");
      const [passwordError, setPasswordError] = useState("");
      const [titleError, setTitleError] = useState("");
      const [contentsError, setContentsError] = useState("");

      const [BoardInfoAdd] = useMutation<
            Pick<IMutation, "createBoard">,
            IMutationCreateBoardArgs
      >(CREATE_BOARD); // API 통신 함수
      const [updateBoard] = useMutation<
            Pick<IMutation, "updateBoard">,
            IMutationUpdateBoardArgs
      >(UPDATE_BOARD);

      const router = useRouter();

      const onChangeWriter = (event: ChangeEvent<HTMLInputElement>) => {
            setWriter(event.target.value);
            if (event.target.value !== "") {
                  //  빈칸에서 버튼 클릭시 ,에러 메시지 출력 --> 내용입력시 에러메시지 없애주는 용도
                  setWriterError("");
            }

            if (event.target.value && password && title && contents) {
                  setIsActive(true);
            } else {
                  setIsActive(false);
            }
      };

      const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
            setPassword(event.target.value);
            if (event.target.value !== "") {
                  setPasswordError(""); //에러 초기화
            }

            if (event.target.value && writer && title && contents) {
                  setIsActive(true);
            } else {
                  setIsActive(false);
            }
      };

      const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
            setTitle(event.target.value);
            if (event.target.value !== "") {
                  setTitleError("");
            }

            if (event.target.value && writer && password && contents) {
                  setIsActive(true);
            } else {
                  setIsActive(false);
            }
      };

      const onChangeContents = (event: ChangeEvent<HTMLTextAreaElement>) => {
            setContents(event.target.value);
            if (event.target.value !== "") {
                  setContentsError("");
            }

            if (event.target.value && writer && password && title) {
                  setIsActive(true);
            } else {
                  setIsActive(false);
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
                        router.push(
                              `/boards/${String(result?.data?.createBoard._id)}`
                        );
                  } catch (error) {
                        // alert(error.message);
                  }
            }
      };

      const updateBoardInput: IUpdateBoardInput = {};
      if (title) updateBoardInput.title = title;
      if (contents) updateBoardInput.contents = contents;

      const onClickUpdate = async () => {
            try {
                  const result = await updateBoard({
                        variables: {
                              boardId: String(router.query.boardId),
                              password: password,
                              updateBoardInput: updateBoardInput,
                        },
                  });
                  router.push(
                        `/boards/${String(result?.data?.updateBoard._id)}`
                  );
            } catch (error) {
                  if (error instanceof Error) console.log(error);
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
                  onClickUpdate={onClickUpdate}
                  isEdit={props.isEdit}
                  isActive={isActive}
            />
      );
}
