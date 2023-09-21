import UploadButton from "../../../../commons/uploadbutton/uploadbutton.container";
import * as W from "./BoardWrite.styles";
import { IBoardWriteUIProps } from "./BoardWrite.types";

export default function BoardWriteUI(props: IBoardWriteUIProps) {
  return (
    <>
      {props.isOpen && (
        <W.AddressModal visible={true}>
          <W.AddressSearchInput
            onComplete={props.ModalSearchComplete}
          ></W.AddressSearchInput>
        </W.AddressModal>
      )}
      <W.Wrapper>
        <W.Title>게시글 {props.isEdit ? "수정하기" : "등록하기"}</W.Title>
        <W.WriterWrapper>
          <W.InputWrapper>
            <W.Label>작성자</W.Label>

            <W.Writer
              type="text"
              placeholder="이름을 입력 해주세요."
              onChange={props.onChangeWriter}
              defaultValue={props.data?.fetchBoard.writer || ""}
              readOnly={!!props.data?.fetchBoard.writer}
            ></W.Writer>
            <W.Error>{props.writerError}</W.Error>
          </W.InputWrapper>
          <W.InputWrapper>
            <W.Label>비밀번호</W.Label>
            <W.Writer
              type="password"
              placeholder="패스워드를 입력 해주세요."
              onChange={props.onChangePassword}
            ></W.Writer>
            <W.Error>{props.passwordError}</W.Error>
          </W.InputWrapper>
        </W.WriterWrapper>
        <W.InputWrapper>
          <W.Label>제목</W.Label>
          <W.Subject
            type="text"
            placeholder="제목을 작성해주세요."
            onChange={props.onChangeTitle}
            defaultValue={props.data?.fetchBoard.title}
          />
          <W.Error>{props.titleError1}</W.Error>
        </W.InputWrapper>
        <W.InputWrapper>
          <W.Label>내용</W.Label>
          <W.Content
            placeholder="내용을 작성 해주세요."
            onChange={props.onChangeContents}
            defaultValue={props.data?.fetchBoard.contents}
          />
          <W.Error>{props.contentsError}</W.Error>
        </W.InputWrapper>

        <W.InputWrapper>
          <W.Label>주소</W.Label>
          <W.ZipcodeWrapper>
            <W.Zipcode
              placeholder="0000"
              value={
                props.ZoneCode ||
                props.data?.fetchBoard.boardAddress?.zipcode ||
                ""
              }
              readOnly
            ></W.Zipcode>
            <W.SearchButton onClick={props.ModalOpen}>
              우편번호검색
            </W.SearchButton>
          </W.ZipcodeWrapper>
          <W.Address
            value={
              props.Address ||
              props.data?.fetchBoard.boardAddress?.address ||
              ""
            }
            readOnly
          ></W.Address>
          <W.Address
            onChange={props.onChangeAddressDetail}
            defaultValue={
              props.data?.fetchBoard.boardAddress?.addressDetail || ""
            }
          ></W.Address>
        </W.InputWrapper>
        <W.InputWrapper>
          <W.Label>유튜브</W.Label>
          <W.Youtube
            onChange={props.onChangeYoutubeUrl}
            placeholder="링크를 복사해주세요."
            defaultValue={props.data?.fetchBoard.youtubeUrl || ""}
          />
        </W.InputWrapper>
        <W.ImageWrapper>
          {props.FileUrls.map(
            (
              el,
              index //기본 파일 URL["" "" "" ] 3개이므로 3회전
            ) => (
              <UploadButton
                key={"123"}
                index={index}
                onChangeFileUrls={props.onChangeFileUrls}
                FileUrl={el}
              />
            )
          )}
        </W.ImageWrapper>
        <W.OptionWrapper>
          <W.Label>메인설정</W.Label>
          <W.RadioButton type="radio" id="youtube" name="radio-button" />
          <W.RadioLabel htmlFor="youtube">유튜브</W.RadioLabel>
          <W.RadioButton type="radio" id="image" name="radio-button" />
          <W.RadioLabel htmlFor="image">사진</W.RadioLabel>
        </W.OptionWrapper>
        <W.ButtonWrapper>
          <W.SubmitButton
            onClick={props.isEdit ? props.onClickUpdate : props.onClickSubmit}
            isActive={props.isEdit ? true : props.isActive}
          >
            {props.isEdit ? "수정하기" : "등록하기"}
          </W.SubmitButton>
        </W.ButtonWrapper>
      </W.Wrapper>
    </>
  );
}
