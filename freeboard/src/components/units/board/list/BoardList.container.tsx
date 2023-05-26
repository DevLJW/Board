import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import {
  IQuery,
  IQueryFetchBoardsArgs,
  IQueryFetchBoardsCountArgs,
} from "../../../../commons/types/generated/types";
import BoardListUI from "./BoardList.presenter";
import {
  FETCH_BOARDS,
  FETCH_BOARDS_COUNT,
  FETCH_USER_LOGGED_IN,
} from "./BoardListqueries";
import { MouseEvent, useEffect, useState } from "react";
import { accessTokenState } from "../../../../commons/store";
import { useRecoilState, useRecoilValue } from "recoil";

export default function BoardListPage() {
  //const [accessToken, setAccessToken] = useRecoilState(accessTokenState);

  const { data: LoginUser } =
    useQuery<Pick<IQuery, "fetchUserLoggedIn">>(FETCH_USER_LOGGED_IN);
  console.log(LoginUser);

  const router = useRouter();
  const [keyword, setChangeKeyword] = useState("");

  // 로그인한 사용자 정보 가져오기

  //  프리렌더링 과정에서 프론트엔드는 localStorage 기능이 없기때문에 렌더링이 끝난 후 실행되는 useEffetc사용

  //  게시글 리스트 출력 쿼리 + 리패치쿼리 하나의 쿼리로 2개기능 사용
  const { data, refetch } = useQuery<
    Pick<IQuery, "fetchBoards">,
    IQueryFetchBoardsArgs
  >(FETCH_BOARDS); //바로 실행 후, 조회한 값을 data에 반환

  //  작성된 게시글 총 개수 쿼리
  const { data: BoardsCount, refetch: refetchBoardsCount } = useQuery<
    Pick<IQuery, "fetchBoardsCount">,
    IQueryFetchBoardsCountArgs
  >(FETCH_BOARDS_COUNT);
  //바로 실행 후, 조회한 값을 data에 반환

  //useQuery실행중 데이터가 다 안가져왔으면 안가져온 채로 넘기고 다가져와지면 다시 data에 값이 들어감
  // 화면에 보여줄때 조건부 렌더링? 달아서 보여주기 안가져온채면 아직안보여주고 가져오고 나서 보여줌

  const onClickNewBoard = () => {
    router.push("/boards/new");
  };

  const onClickBoardDetail = (event: MouseEvent<HTMLDivElement>) => {
    router.push(`boards/${event.currentTarget.id}`);
  };

  const onChangeKeyword = (value: any) => {
    setChangeKeyword(value);
  };

  return (
    <BoardListUI
      data={data} //API 서버에서 조회한 값을 자식 props에게 넘겨주기
      onClickNewBoard={onClickNewBoard}
      onClickBoardDetail={onClickBoardDetail}
      refetch={refetch}
      onChangeKeyword={onChangeKeyword}
      keyword={keyword}
      BoardsCount={BoardsCount?.fetchBoardsCount}
      refetchBoardsCount={refetchBoardsCount}
    ></BoardListUI>
  );
}
