import { ChangeEvent, Dispatch, SetStateAction } from "react";

export interface IBoardCommentWriteUIProps {
      onChangeWriter: (event: ChangeEvent<HTMLInputElement>) => void;
      onChangePassword: (event: ChangeEvent<HTMLInputElement>) => void;
      onChangeContents: (event: ChangeEvent<HTMLTextAreaElement>) => void;
      onClickWrite: () => void;
      Contents: string;
      setstars: Dispatch<SetStateAction<number>>;
}
