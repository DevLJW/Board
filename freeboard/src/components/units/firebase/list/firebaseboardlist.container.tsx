import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import FireBaseBoardListUI from "./firebaseboardlist.presenter";
import {
  DocumentData,
  collection,
  getDocs,
  getFirestore,
} from "firebase/firestore/lite";
import { firebaseApp } from "../../../../commons/libraries/firebase";

export default function FireBaseBoardList() {
  const router = useRouter();
  const [dataBoards, setDataBoards] = useState<DocumentData[]>([]);

  useEffect(() => {
    const fetchboard = async () => {
      //  Cloud Firestore는 컬렉션에 저장되는 문서에 데이터를 저장합니다.
      //  문서에 데이터를 처음 추가할 때 Cloud Firestore에서 암시적으로 컬렉션과 문서를 만듭니다.
      //  컬렉션이나 문서를 명시적으로 만들 필요가 없습니다.
      //  첫 번째 문서에는 나타나지 않는 키-값 쌍(중간 이름)이 문서에 포함된다는 점에 유의하세요.
      const board = collection(getFirestore(firebaseApp), "board");
      const result = await getDocs(board); //[{ ... },{ ... }, { ... }]
      const boards = result.docs.map((el) => el.data());
      setDataBoards(boards);
      console.log(dataBoards);
    };

    void fetchboard();
  });

  const onClickMoveBoardWrite = () => {
    router.push("/firebase/new");
  };
  return (
    <FireBaseBoardListUI
      onClickMoveBoardWrite={onClickMoveBoardWrite}
      dataBoards={dataBoards}
    ></FireBaseBoardListUI>
  );
}
