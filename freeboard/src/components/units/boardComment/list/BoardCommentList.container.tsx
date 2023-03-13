import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import {
      IQuery,
      IQueryFetchBoardCommentsArgs,
} from "../../../../commons/types/generated/types";
import BoardCommentListUI from "./BoardCommentList.presenter";
import { MouseEvent } from "react";

import {
      FETCH_BOARD_COMMENTS,
      DELETE_BOARD_COMMENT,
} from "./BoardCommentList.queries";

export default function BoardCommentList() {
      const router = useRouter();

      const [deleteBoardComment] = useMutation<IQuery>(DELETE_BOARD_COMMENT);

      const { data } = useQuery<
            Pick<IQuery, "fetchBoardComments">,
            IQueryFetchBoardCommentsArgs
      >(FETCH_BOARD_COMMENTS, {
            variables: { boardId: String(router.query.BoardId) },
      });
      console.log(data);

      const onClickDelete = async (event: MouseEvent<HTMLImageElement>) => {
            const myPassword = prompt("비밀번호를 입력하세요.");
            try {
                  await deleteBoardComment({
                        variables: {
                              password: myPassword,
                              boardCommentId: event.currentTarget.id,
                        },
                        refetchQueries: [
                              {
                                    query: FETCH_BOARD_COMMENTS,
                                    variables: {
                                          boardId: String(router.query.BoardId),
                                    },
                              },
                        ],
                  });
            } catch (error) {
                  if (error instanceof Error) alert(error.message);
            }
      };

      return <BoardCommentListUI data={data} onClickDelete={onClickDelete} />;
}
