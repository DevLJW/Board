import { WithAuth } from "../src/commons/hocs/withAuth";
import BoardListPage from "../src/components/units/board/list/BoardList.container";

function BoardsPage() {
  return <BoardListPage isBoolean={true}></BoardListPage>;
}

export default WithAuth(BoardsPage); //  app.tsx Component에 묶어서 전달
