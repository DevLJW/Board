import PaginationsUI from "./paginations.presenter";
import { IPaginationsMain } from "./paginations.types";
import { MouseEvent, useState } from "react";
export default function PaginationsMain(props: IPaginationsMain) {
  const [ClickPage, setClickPage] = useState(1);
  const [startPage, setStartPage] = useState(1);
  const lastPage = props?.BoardsCount ? Math.ceil(props.BoardsCount / 10) : 0;

  const onClickPage = (event: MouseEvent<HTMLSpanElement>) => {
    const ClickPage = Number(event.currentTarget.id);
    setClickPage(ClickPage);
    props.refetch({ page: ClickPage });
  };

  //  이전 페이지
  const onClickPrevPage = () => {
    if (startPage === 1) return;
    setStartPage((prev) => prev - 10);
    props.refetch({ page: startPage - 10 });
  };

  //  다음 페이지
  const onClickNextPage = () => {
    setStartPage((prev) => prev + 10);
    props.refetch({ page: startPage + 10 });
  };

  return (
    <PaginationsUI
      onClickPage={onClickPage}
      onClickPrevPage={onClickPrevPage}
      onClickNextPage={onClickNextPage}
      ClickPage={ClickPage}
      lastPage={lastPage}
      startPage={startPage}
    ></PaginationsUI>
  );
}
