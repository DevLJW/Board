import {
  IBoard,
  IQuery,
  IQueryFetchBoardsArgs,
  IQueryFetchBoardsCountArgs,
} from "../../../../commons/types/generated/types";
import { MouseEvent } from "react";
import { ApolloQueryResult } from "@apollo/client";
type IBaskets = Array<
  Pick<IBoard, "contents" | "title" | "_id" | "writer" | "createdAt">
>;

export interface IBoardListUIProps {
  data?: Pick<IQuery, "fetchBoards">;
  onClickNewBoard: () => void;
  onClickBoardDetail: (event: MouseEvent<HTMLDivElement>) => void;
  refetch: (
    variables?: Partial<IQueryFetchBoardsArgs> | undefined
  ) => Promise<ApolloQueryResult<Pick<IQuery, "fetchBoards">>>;
  BoardsCount?: number | undefined;

  onChangeKeyword: (value: any) => void;
  keyword: string;
  refetchBoardsCount: (
    variables?: Partial<IQueryFetchBoardsCountArgs> | undefined
  ) => Promise<ApolloQueryResult<Pick<IQuery, "fetchBoardsCount">>>;
  onClickBasket: (basket: IBoard) => () => void;

  isBoolean: boolean;
  MyPageBaskets: IBaskets;
}

export interface ITextTokenProps {
  isMatched: boolean;
}

export interface IBoardListPage {
  isBoolean: boolean;
  MyPageBaskets?: IBaskets;
}
