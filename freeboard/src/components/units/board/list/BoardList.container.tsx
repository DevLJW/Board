import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import {
  IQuery,
  IQueryFetchBoardArgs,
  IQueryFetchBoardsArgs,
  IQueryFetchBoardsCountArgs,
} from "../../../../commons/types/generated/types";
import BoardListUI from "./BoardList.presenter";
import { FETCH_BOARDS } from "./BoardListqueries";
import { MouseEvent } from "react";

export default function BoardListPage() {
  const router = useRouter();
  const { data, refetch } = useQuery<
    Pick<IQuery, "fetchBoards">,
    IQueryFetchBoardArgs
  >(FETCH_BOARDS); //바로 실행 후, 조회한 값을 data에 반환

  const { data: BoardsCount } = useQuery<
    Pick<IQuery, "fetBoardsCount">,
    IQueryFetchBoardsCountArgs
  >(FETCH_BOARDS_COUNT); //바로 실행 후, 조회한 값을 data에 반환

  //useQuery실행중 데이터가 다 안가져왔으면 안가져온 채로 넘기고 다가져와지면 다시 data에 값이 들어감
  // 화면에 보여줄때 조건부 렌더링? 달아서 보여주기 안가져온채면 아직안보여주고 가져오고 나서 보여줌

  const onClickNewBoard = () => {
    router.push("/boards/new");
  };

  const onClickBoardDetail = (event: MouseEvent<HTMLDivElement>) => {
    router.push(`boards/${event.target.id}`);
  };

  return (
    <BoardListUI
      data={data} //API 서버에서 조회한 값을 자식 props에게 넘겨주기
      onClickNewBoard={onClickNewBoard}
      onClickBoardDetail={onClickBoardDetail}
    ></BoardListUI>
  );
}
