import axios from "axios";
import { useEffect, useState } from "react";
import OpenapiListUI from "./OpenapiList.presenter";

export default function OpenapiList() {
  const [imgUrl, setImgUrl] = useState<string[]>([]);

  useEffect(() => {
    const ImgGet = async () => {
      // 이함순느 동기식이 적용된 함수다
      new Array(9).fill(1).forEach(async (_) => {
        // 동기함수다.
        const result = await axios.get(
          //   동기적용
          "https://dog.ceo/api/breeds/image/random"
        );
        setImgUrl((prev) => [...prev, result.data.message]);
      });
    };
    void ImgGet();
  }, []);

  return <OpenapiListUI imgUrl={imgUrl}></OpenapiListUI>;
}
