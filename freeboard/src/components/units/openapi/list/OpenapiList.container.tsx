import axios from "axios";
import { useEffect, useState } from "react";

export default function OpenapiList() {
  const [imgUrl, setImgUrl] = useState<string[]>([]);

  useEffect(() => {
    const ImgGet = async () => {
      new Array(9).fill(1).forEach(async () => {
        const result = await axios.get(
          "http://dog.ceo/api/breeds/image/random"
        );
        setImgUrl((prev) => [...prev, result.data.message]);
      });
    };
    void ImgGet();
  }, []);

  return <></>;
}
