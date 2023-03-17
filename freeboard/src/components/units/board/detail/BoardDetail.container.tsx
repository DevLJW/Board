import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import {
  IMutation,
  IMutationDislikeBoardArgs,
  IMutationLikeBoardArgs,
  IQuery,
  IQueryFetchBoardArgs,
} from "../../../../commons/types/generated/types";

import BoardDetailUI from "./BoardDetail.presenter";
import { FETCH_BOARD, DISLIKE_BOARD, LIKE_BOARD } from "./BoardDetail.quries";

export default function BoardDetail() {
  const router = useRouter();

  const { data } = useQuery<Pick<IQuery, "fetchBoard">, IQueryFetchBoardArgs>(
    FETCH_BOARD,
    {
      variables: { boardId: String(router.query.BoardId) },
    }
  );

  const [likeBoard] = useMutation<
    Pick<IMutation, "likeBoard">,
    IMutationLikeBoardArgs
  >(LIKE_BOARD);
  const [dislikeBoard] = useMutation<
    Pick<IMutation, "dislikeBoard">,
    IMutationDislikeBoardArgs
  >(DISLIKE_BOARD);

  const onClickLike = async () => {
    await likeBoard({
      variables: { boardId: String(router.query.BoardId) },
      refetchQueries: [
        {
          query: FETCH_BOARD,
          variables: { boardId: router.query.BoardId },
        },
      ],
    });
  };

  const onClickDislike = async () => {
    await dislikeBoard({
      variables: { boardId: String(router.query.BoardId) },
      refetchQueries: [
        {
          query: FETCH_BOARD,
          variables: { boardId: router.query.BoardId },
        },
      ],
    });
  };

  const onClickMoveToBoardList = () => {
    //목록으로가기
    router.push("/");
  };

  const onClickMoveToBoardEdit = () => {
    //수정하기 페이지
    router.push(`/boards/${router.query.BoardId}/edit`);
  };

  return (
    <BoardDetailUI
      data={data}
      onClickMoveToBoardList={onClickMoveToBoardList}
      onClickMoveToBoardEdit={onClickMoveToBoardEdit}
      onClickLike={onClickLike}
      onClickDisLike={onClickDislike}
    />
  );
}
