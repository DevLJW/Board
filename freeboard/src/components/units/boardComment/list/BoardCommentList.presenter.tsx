import * as S from "./BoardCommentList.styles";

import { IBoardCommentListUIProps } from "./BoardCommentList.types";
import InfiniteScroll from "react-infinite-scroller";
import BoardCommentListUIItem from "./BoardCommentList.presenterItem";
//  Current 버블링에 의해 실행된 온클릭이 실행된 현재태그 아이디 가져오기
//  Target 현재 선택한 태그의 실행된 현재태그 아이디 가져오기
//  자식 태그, 부모태그에 id={el.writer} onClick={name} 설정하면 2번 실행이 된다.

export default function BoardCommentListUI(props: IBoardCommentListUIProps) {
  return (
    <div>
      <InfiniteScroll
        pageStart={0}
        loadMore={props.onLoadM}
        hasMore={true}
      ></InfiniteScroll>
      {props.data?.fetchBoardComments?.map((el) => (
        <BoardCommentListUIItem key={el.id} el={el}></BoardCommentListUIItem>
      ))}
    </div>
  );
}
