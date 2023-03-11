import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import {
      IQuery,
      IQueryFetchBoardArgs,
} from "../../../../commons/types/generated/types";

import BoardDetailUI from "./BoardDetail.presenter";
import { FETCH_BOARD } from "./BoardDetail.quries";

export default function BoardDetail() {
      const router = useRouter();

      const { data } = useQuery<
            Pick<IQuery, "fetchBoard">,
            IQueryFetchBoardArgs
      >(FETCH_BOARD, {
            variables: { boardId: String(router.query.BoardId) },
      });

      console.log(data);

      const onClickMoveToBoardList = () => {
            //목록으로가기
            router.push("/");
      };

      const onClickMoveToBoardEdit = () => {
            //수정하기 페이지
            router.push(`/boards/${String(router.query.boardId)}/edit`);
      };

      return (
            <BoardDetailUI
                  data={data}
                  onClickMoveToBoardList={onClickMoveToBoardList}
                  onClickMoveToBoardEdit={onClickMoveToBoardEdit}
            />
      );
}
