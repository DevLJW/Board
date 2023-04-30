import { Modal } from "antd";

export function checkValidationFile(file: File | undefined) {
  if (!file?.size) {
    alert("파일이 없습니다.");
    return false;
  }

  if (file?.size > 5 * 1024 * 1024) {
    Modal.error({ content: "파일이 너무 큽니다 제한(5mb)" });

    return false;
  }

  if (!file.type.includes("jpeg") && !file.type.includes("png")) {
    Modal.error({ content: "Jpeg또는Png파일만 가능 합니다." });
    return false;
  }

  return file;
}
