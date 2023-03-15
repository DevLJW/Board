import BoardWrite from "../../../../src/components/units/board/write/BoardWriter.container";
//  수정 페이지
import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";

import {
      IQuery,
      IQueryFetchBoardArgs,
} from "../../../../src/commons/types/generated/types";

const FETCH_BOARD = gql`
      query fetchBoard($boardId: ID!) {
            fetchBoard(boardId: $boardId) {
                  writer
                  title
                  contents
                  youtubeUrl
                  boardAddress {
                        zipcode
                        address
                        addressDetail
                  }
            }
      }
`;

export default function BoardWritePage() {
      const router = useRouter();
      const { data } = useQuery<
            Pick<IQuery, "fetchBoard">,
            IQueryFetchBoardArgs
      >(FETCH_BOARD, { variables: { boardId: String(router.query.BoardId) } });

      return <BoardWrite isEdit={true} data={data} />;
}
