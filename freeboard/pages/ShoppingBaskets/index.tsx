import { useRecoilState } from "recoil";

import BoardListPage from "../../src/components/units/board/list/BoardList.container";
import { useEffect } from "react";
import { myPageBaskets } from "../../src/commons/store";

export default function ShoppingBasketsPage() {
  const [MyPageBaskets, setPageBaskets] = useRecoilState(myPageBaskets);
  useEffect(() => {
    setPageBaskets(JSON.parse(localStorage.getItem("baskets") ?? "[]")); //  가져온 예시 데이터 : const baskets = [{id:"6dsad854",writer: "철수", title: "안녕하세요", contents:"내용"}]
  }, []);

  return (
    <BoardListPage
      isBoolean={false}
      MyPageBaskets={MyPageBaskets}
    ></BoardListPage>
  );
}
