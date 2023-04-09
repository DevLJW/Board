import { ChangeEvent } from "react";

export interface FireBaseBoardWriteUIIprops {
  onChangeWriter: (event: ChangeEvent<HTMLInputElement>) => void;
  onChangecontent: (event: ChangeEvent<HTMLInputElement>) => void;
  onChangetitle: (event: ChangeEvent<HTMLInputElement>) => void;
  onClickSubmit: () => void;
}
