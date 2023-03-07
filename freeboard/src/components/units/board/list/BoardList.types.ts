import { IQuery } from "../../../../commons/types/generated/types";
import { MouseEvent } from "react";

export interface IBoardListUIProps {
  data?: Pick<IQuery, "fetchBoards">;
  onClickNewBoard: () => void;
  onClickBoardDetail: (event: MouseEvent<HTMLDivElement>) => void;
}

export interface ITextTokenProps {
  isMatched: boolean;
}
