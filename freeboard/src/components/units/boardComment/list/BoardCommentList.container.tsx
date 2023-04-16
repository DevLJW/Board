import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import {
  IQuery,
  IQueryFetchBoardCommentsArgs,
} from "../../../../commons/types/generated/types";
import BoardCommentListUI from "./BoardCommentList.presenter";

import { FETCH_BOARD_COMMENTS } from "./BoardCommentList.queries";

// 댓글 리스트 컴포넌트(페이지로 반환)(1)
export default function BoardCommentList() {
  const router = useRouter();

  const { data, fetchMore } = useQuery<
    Pick<IQuery, "fetchBoardComments">,
    IQueryFetchBoardCommentsArgs
  >(FETCH_BOARD_COMMENTS, {
    variables: { boardId: String(router.query.BoardId) }, // 현재 상세 게시글 아이디
  });
  console.log(data);

  //페이지가 스크롤에 닿을때 해당함수 실행
  const onLoadM = () => {
    if (!data) return;
    fetchMore({
      variables: { page: Math.ceil(data.fetchBoardComments.length / 10) + 1 }, // 그 다음다음 으로 넘어감 + 1씩
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult.fetchBoardComments)
          return { fetchBoardComments: [...prev.fetchBoardComments] };
        return {
          fetchBoardComments: [
            ...prev.fetchBoardComments,
            ...fetchMoreResult.fetchBoardComments,
          ],
        };
      },
    });
  };

  return <BoardCommentListUI data={data} onLoadM={onLoadM} />;
}
