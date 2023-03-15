import { ChangeEvent } from "react";
import { IQuery } from "../../../../commons/types/generated/types";
export interface IBoardWriteProps {
      isEdit: boolean;
      data?: Pick<IQuery, "fetchBoard">;
}

export interface ISubmitButtonProps {
      isActive: boolean;
}

export interface IBoardWriteUIProps {
      data?: Pick<IQuery, "fetchBoard">;
      writerError: string;
      passwordError: string;
      titleError1: string;
      contentsError: string;
      onChangeWriter: (event: ChangeEvent<HTMLInputElement>) => void;
      onChangePassword: (event: ChangeEvent<HTMLInputElement>) => void;
      onChangeTitle: (event: ChangeEvent<HTMLInputElement>) => void;
      onChangeContents: (event: ChangeEvent<HTMLTextAreaElement>) => void;
      onClickSubmit: () => void;
      onClickUpdate: () => void;
      isEdit: boolean;
      isActive: boolean;
      isOpen: boolean;
      ModalOpen: () => void;
      ModalSearchComplete: (data: any) => void;
      ZoneCode: string;
      Address: string;
      onChangeAddressDetail: (event: ChangeEvent<HTMLInputElement>) => void;
      addressDetail: string;
      onChangeYoutubeUrl: (event: ChangeEvent<HTMLInputElement>) => void;
      youtubeUrl: string;
}
