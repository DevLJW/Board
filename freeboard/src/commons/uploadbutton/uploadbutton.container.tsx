import { ChangeEvent, useRef } from "react";
import UploadButtonUI from "./uploadbutton.presenter";
import { useMutation } from "@apollo/client";
import { UPLOAD_FILE } from "./uploadbutton.quries";
import { checkValidationFile } from "../libraries/checkValidationFile";
import { Modal } from "antd";
import { UploadButtonProps } from "./uploadbutton.types";

export default function UploadButton(props: UploadButtonProps) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploadFile] = useMutation(UPLOAD_FILE);

  const UploadButtonClick = () => {
    fileRef?.current?.click();
  };

  const onChangeFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = checkValidationFile(event?.target?.files?.[0]);
    if (!file) return;

    try {
      const result = await uploadFile({ variables: { file } });
      props.onChangeFileUrls(result.data.uploadFile.url, props.index); // 파일 Url Hooks 변경
    } catch (error) {
      if (error instanceof Error) Modal.error({ content: error.message });
    }
  };

  return (
    <UploadButtonUI
      fileRef={fileRef}
      FileUrl={props.FileUrl}
      UploadButtonClick={UploadButtonClick}
      onChangeFile={onChangeFile}
    ></UploadButtonUI>
  );
}
