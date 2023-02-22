import { useRouter } from "next/router";
import { Wrapper } from "../../../styles/BoardDetail";
import { gql, useQuery } from "@apollo/client";

const BOARD_DETAIL_QURIES = gql`
  query fetchBoardType($id: ID!) {
    fetchBoard(boardId: $id) {
      _id
      writer
      title
      contents
      createdAt
    }
  }
`;

export default function BoardDetailPage() {
  const router = useRouter();
  const { data } = useQuery(BOARD_DETAIL_QURIES, {
    variables: {
      id: router.query.BoardId,
    },
  });

  console.log(data);

  return <Wrapper>123</Wrapper>;
}
