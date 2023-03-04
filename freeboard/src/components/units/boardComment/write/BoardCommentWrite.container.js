import { useMutation } from "@apollo/client";
import BoardCommentUI from "./BoardCommentWrite.presenter";

export default function BoardCommentWrite() {
  const [Writer, setWriter] = useMutation("");
  const [PassWord, setPassWord] = useMutation("");
  const [Contents, setContents] = useMutation("");

  return <BoardCommentUI />;
}
