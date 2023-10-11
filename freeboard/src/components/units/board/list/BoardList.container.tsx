import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import {
  IBoard,
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
import { LoginUserInfo, accessTokenState } from "../../../../commons/store";
import { useRecoilState, useRecoilValue } from "recoil";
import { IBoardListPage } from "./BoardList.types";

export default function BoardListPage(props: IBoardListPage) {
  // const [accessToken, setAccessToken] = useRecoilState(accessTokenState);

  // console.log(accessToken);

  //현재 로그인한 사용자의 정보가져오기

  type IBaskets = Array<
    Pick<IBoard, "contents" | "title" | "_id" | "writer" | "createdAt">
  >;
  const router = useRouter();
  const [keyword, setChangeKeyword] = useState("");

  const { data: fetchUserLoggedInData } =
    useQuery<Pick<IQuery, "fetchUserLoggedIn">>(FETCH_USER_LOGGED_IN);

  // 로그인한 사용자 정보 가져오기

  const [LoginInfo, setAccessLoginInfo] = useRecoilState(LoginUserInfo);

  useEffect(() => {
    setAccessLoginInfo(() => ({ ...fetchUserLoggedInData }));
  }, [fetchUserLoggedInData]);
  console.log("test console");
  console.log(LoginInfo);

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

  const onClickBasket = (basket: IBoard) => () => {
    console.log(basket);

    // 1. 기존 장바구니 가져오기
    //    basket = []로 초기화 해버리면 기존에 있는 게시글 정보가 다 삭제되고 초기화댐
    //  ex : 3번게시글이 있으면 localstorage내용 push 없으면 [] 푸쉬
    const baskets: IBaskets = JSON.parse(
      localStorage.getItem("baskets") ?? "[]" // 배스킷이 없으면 빈배열 만들기
    ); //  가져온 예시 데이터 : const baskets = [{id:"6dsad854",writer: "철수", title: "안녕하세요", contents:"내용"}]

    // 2. 이미 담겼는지 확인하기(기존에 담겼던건 제외하기(또 클릭 했을때))
    const temp = baskets.filter((el) => el._id === basket._id); //  true인경우 1 반환 false는 0반환
    if (temp.length === 1) {
      alert("이미 담으신 물품입니다!!!");
      return; //  밑에 구문 실행안하고 호출한함수(onClickBasket) 탈출
    }

    // 3. 해당 장바구니에 담기
    baskets.push(basket);
    localStorage.setItem("baskets", JSON.stringify(baskets));
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
      onClickBasket={onClickBasket}
      MyPageBaskets={props.MyPageBaskets}
      isBoolean={props.isBoolean}
    ></BoardListUI>
  );
}
