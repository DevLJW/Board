import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import {
  IQuery,
  IQueryFetchBoardCommentsArgs,
} from "../../../../commons/types/generated/types";
import BoardCommentListUI from "./BoardCommentList.presenter";
import { ChangeEvent, MouseEvent, useState } from "react";

import {
  FETCH_BOARD_COMMENTS,
  DELETE_BOARD_COMMENT,
} from "./BoardCommentList.queries";

export default function BoardCommentList() {
  const router = useRouter();
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [myBoardCommentId, setMyBoardCommentId] = useState("");
  const [myPassword, setMyPassword] = useState("");

  const [deleteBoardComment] = useMutation<IQuery>(DELETE_BOARD_COMMENT);

  const { data, fetchMore } = useQuery<
    Pick<IQuery, "fetchBoardComments">,
    IQueryFetchBoardCommentsArgs
  >(FETCH_BOARD_COMMENTS, {
    variables: { boardId: String(router.query.BoardId) }, // 현재 상세 게시글 아이디
  });
  console.log(data);

  const onClickDelete = async (event: MouseEvent<HTMLElement>) => {
    if (!(event.target instanceof HTMLElement)) return;
    try {
      await deleteBoardComment({
        variables: {
          password: myPassword,
          boardCommentId: myBoardCommentId,
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
      setIsOpenDeleteModal(false);
    } catch (error) {
      if (error instanceof Error) alert(error.message);
    }
  };
  // X버튼 클릭시

  const onclickOpenDeleteModal = (event: MouseEvent<HTMLImageElement>) => {
    setMyBoardCommentId(event.target.id);
    setIsOpenDeleteModal(true);
  };

  const onChangeDeletePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setMyPassword(event.target.value);
  };

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

  return (
    <BoardCommentListUI
      data={data}
      isOpenDeleteModal={isOpenDeleteModal}
      onClickDelete={onClickDelete}
      onclickOpenDeleteModal={onclickOpenDeleteModal}
      onChangeDeletePassword={onChangeDeletePassword}
      onLoadM={onLoadM}
    />
  );
}
