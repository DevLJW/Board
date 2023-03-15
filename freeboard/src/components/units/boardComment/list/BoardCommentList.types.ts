import { IQuery } from "../../../../commons/types/generated/types";
import { ChangeEvent, MouseEvent } from "react";
export interface IBoardCommentListUIProps {
      data?: Pick<IQuery, "fetchBoardComments">;
      onClickDelete: (event: MouseEvent<HTMLElement>) => void;
      isOpenDeleteModal: boolean;
      onclickOpenDeleteModal: (event: MouseEvent<HTMLImageElement>) => void;
      onChangeDeletePassword: (event: ChangeEvent<HTMLInputElement>) => void;
}
