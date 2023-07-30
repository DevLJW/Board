import { useRouter } from "next/router";
import UsedMarketItemUploadUI from "./UsedMarketItemUpload_Edit.presenter";

export default function UsedMarketItemUpload() {
  const router = useRouter();

  return <UsedMarketItemUploadUI></UsedMarketItemUploadUI>;
}
