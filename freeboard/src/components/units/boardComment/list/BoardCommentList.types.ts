import {
  IBoardComment,
  IQuery,
} from "../../../../commons/types/generated/types";

export interface IBoardCommentListUIProps {
  data?: Pick<IQuery, "fetchBoardComments">;

  onLoadM: () => void;
}

export interface IBaoardCommentListUIItempProps {
  el: IBoardComment;
}
