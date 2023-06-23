import { ChangeEvent, useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import BoardWriteUI from "./BoardWrite.presenter";
import { CREATE_BOARD, UPDATE_BOARD } from "./BoardWrite.quries";
import {
  IMutation,
  IMutationCreateBoardArgs,
  IMutationUpdateBoardArgs,
} from "../../../../commons/types/generated/types";
import { IBoardWriteProps, IUpdateBoardInput } from "./BoardWrite.types";

export default function BoardWrite(props: IBoardWriteProps) {
  const [writer, setWriter] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const [isActive, setIsActive] = useState(false); //버튼 활성화 훅

  const [writerError, setWriterError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [titleError, setTitleError] = useState("");
  const [contentsError, setContentsError] = useState("");
  const [ZoneCode, setZoneCode] = useState("");
  const [Address, setAddress] = useState("");
  const [addressDetail, setAddressDetail] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");

  const [isOpen, setIsOpen] = useState(false);

  const [FileUrls, setFileFileUrls] = useState(["", "", ""]);

  const [BoardInfoAdd] = useMutation<
    Pick<IMutation, "createBoard">,
    IMutationCreateBoardArgs
  >(CREATE_BOARD); // API 통신 함수
  const [updateBoard] = useMutation<
    Pick<IMutation, "updateBoard">,
    IMutationUpdateBoardArgs
  >(UPDATE_BOARD);

  const router = useRouter();

  const onChangeWriter = (event: ChangeEvent<HTMLInputElement>) => {
    setWriter(event.target.value);
    if (event.target.value !== "") {
      //  빈칸에서 버튼 클릭시 ,에러 메시지 출력 --> 내용입력시 에러메시지 없애주는 용도
      setWriterError("");
    }

    if (event.target.value && password && title && contents) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  };

  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    if (event.target.value !== "") {
      setPasswordError(""); //에러 초기화
    }

    if (event.target.value && writer && title && contents) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  };

  const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    if (event.target.value !== "") {
      setTitleError("");
    }

    if (event.target.value && writer && password && contents) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  };

  const onChangeContents = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContents(event.target.value);
    if (event.target.value !== "") {
      setContentsError("");
    }

    if (event.target.value && writer && password && title) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  };

  const onChangeAddressDetail = (event: ChangeEvent<HTMLInputElement>) => {
    setAddressDetail(event.target.value);
  };

  const onChangeYoutubeUrl = (event: ChangeEvent<HTMLInputElement>) => {
    setYoutubeUrl(event.target.value);
  };

  const onChangeFileUrls = (FileUrl: string, index: number) => {
    const newFileUrls = [...FileUrls]; //글작성 할때 빈값
    newFileUrls[index] = FileUrl;
    setFileFileUrls(newFileUrls); // 작성하고 나서 url값이 배열에 들어감
  };

  const onClickSubmit = async () => {
    if (!writer) {
      setWriterError("작성자를 입력해주세요.");
    }
    if (!password) {
      setPasswordError("비밀번호를 입력해주세요.");
    }
    if (!title) {
      setTitleError("제목을 입력 해주세요.");
    }
    if (!contents) {
      setContentsError("내용을 입력해주세요.");
    }
    if (writer && password && title && contents) {
      alert("게시글이 등록 되었습니다.");

      try {
        const result = await BoardInfoAdd({
          variables: {
            createBoardInput: {
              writer: writer,
              password: password,
              title: title,
              contents: contents,
              youtubeUrl: youtubeUrl,
              boardAddress: {
                zipcode: ZoneCode,
                address: Address,
                addressDetail: addressDetail,
              },
              images: [...FileUrls],
            },
          },
        });
        //console.log(result);
        router.push(`/boards/${String(result?.data?.createBoard._id)}`);
      } catch (error) {
        // alert(error.message);
      }
    }
  };
  console.log("rr");
  console.log(title);
  const onClickUpdate = async () => {
    const currentFiles = JSON.stringify(FileUrls);
    const defaultFiles = JSON.stringify(props.data?.fetchBoard.images);
    const isChangedFiles = currentFiles !== defaultFiles;
    //같지 않을때 파일이 변경됨(true) 반환

    if (
      !title &&
      !contents &&
      !youtubeUrl &&
      !Address &&
      !addressDetail &&
      !ZoneCode &&
      !isChangedFiles
    ) {
      alert("수정한 내용이 없습니다.");
      return;
    }

    if (!password) {
      alert("비밀번호를 입력해주세요.");
      return;
    }

    const updateBoardInput: IUpdateBoardInput = {};
    if (title) updateBoardInput.title = title;
    if (contents) updateBoardInput.contents = contents;
    if (youtubeUrl) updateBoardInput.youtubeUrl = youtubeUrl;

    if (ZoneCode || Address || addressDetail) {
      updateBoardInput.boardAddress = {};
      if (ZoneCode) updateBoardInput.boardAddress.zipcode = ZoneCode;
      if (Address) updateBoardInput.boardAddress.address = Address;
      if (addressDetail)
        updateBoardInput.boardAddress.addressDetail = addressDetail;
    }

    if (isChangedFiles) updateBoardInput.images = FileUrls;

    try {
      const result = await updateBoard({
        variables: {
          boardId: String(router.query.BoardId),

          password: password,
          updateBoardInput: updateBoardInput,
        },
      });
      router.push(`/boards/${String(result?.data?.updateBoard._id)}`);
    } catch (error) {
      if (error instanceof Error) console.log(error);
    }
  };

  const ModalOpen = () => {
    setIsOpen(true);
  };

  const ModalSearchComplete = (data: any) => {
    setZoneCode(data.zonecode);
    setAddress(data.address);
    setIsOpen(false);
  };

  //게시글 수정시 기존 이미지 가져오기
  useEffect(() => {
    if (props.data?.fetchBoard.images?.length) {
      setFileFileUrls([...props.data.fetchBoard.images]);
    }
  }, [props.data]); // props.data가 수정될때마다 리렌더링 해주기(처음API 통신을 통해 데이터를 받아옴(변경) 실행)

  return (
    <BoardWriteUI
      writerError={writerError}
      passwordError={passwordError}
      titleError1={titleError}
      contentsError={contentsError}
      onChangeWriter={onChangeWriter}
      onChangePassword={onChangePassword}
      onChangeTitle={onChangeTitle}
      onChangeContents={onChangeContents}
      onClickSubmit={onClickSubmit}
      onClickUpdate={onClickUpdate}
      isEdit={props.isEdit}
      isActive={isActive}
      ModalOpen={ModalOpen}
      isOpen={isOpen}
      ModalSearchComplete={ModalSearchComplete}
      ZoneCode={ZoneCode}
      Address={Address}
      data={props.data}
      onChangeAddressDetail={onChangeAddressDetail}
      addressDetail={addressDetail}
      onChangeYoutubeUrl={onChangeYoutubeUrl}
      youtubeUrl={youtubeUrl}
      FileUrls={FileUrls}
      onChangeFileUrls={onChangeFileUrls}
    />
  );
}
