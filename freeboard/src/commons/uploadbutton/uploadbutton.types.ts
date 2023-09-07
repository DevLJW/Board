import { ChangeEvent, RefObject } from "react";

export interface UploadButtonProps {
  index: number;
  onChangeFileUrls: (FileUrl: string, index: number) => void;
  FileUrl: string;
}

export interface UploadButtonUIProps {
  fileRef?: RefObject<HTMLInputElement>;
  UploadButtonClick?: () => void;
  onChangeFile?: (event: ChangeEvent<HTMLInputElement>) => Promise<void>;
  FileUrl?: string;
}
