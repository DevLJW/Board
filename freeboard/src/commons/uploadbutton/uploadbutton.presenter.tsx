import { InputImage, UploadButton, UploadImage } from "./uploadbutton.styles";
import { UploadButtonUIProps } from "./uploadbutton.types";

export default function UploadButtonUI(props: UploadButtonUIProps) {
  return (
    <>
      {props.FileUrl ? (
        <UploadImage
          onClick={props.UploadButtonClick}
          src={`https://storage.googleapis.com/${props.FileUrl}`}
        />
      ) : (
        <UploadButton onClick={props.UploadButtonClick}>+</UploadButton>
      )}

      <InputImage
        type="file"
        multiple={true}
        ref={props.fileRef}
        onChange={props.onChangeFile}
      ></InputImage>
    </>
  );
}
