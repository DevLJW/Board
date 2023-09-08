import { useRouter } from "next/router";
import UsedMarketItemUploadUI from "./UsedMarketItemUpload_Edit.presenter";
import { useState } from "react";

export default function UsedMarketItemUpload() {
  const router = useRouter();
  // const [FileUrls, setFileFileUrls] = useState(["", "", ""]);

  // const onChangeFileUrls = (FileUrl: string, index: number) => {
  //   const newFileUrls = [...FileUrls]; //글작성 할때 빈값
  //   newFileUrls[index] = FileUrl;
  //   setFileFileUrls(newFileUrls); // 작성하고 나서 url값이 배열에 들어감
  // };

  return <UsedMarketItemUploadUI></UsedMarketItemUploadUI>;
}
