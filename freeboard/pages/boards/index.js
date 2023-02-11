import {
  Title,
  Wrapper,
  WriterWrapper,
  Label,
  InputWrapper,
  Writer,
} from "../../styles/BoardWrite";

export default function BoardWrite() {
  return (
    <Wrapper>
      <Title>게시글 등록</Title>
      <WriterWrapper>
        <InputWrapper>
          <Label>작성자</Label>
          <Writer type="text" placeholder="이름을 입력 해주세요."></Writer>
        </InputWrapper>
        <InputWrapper>
          <Label>비밀번호</Label>
          <Writer
            type="password"
            placeholder="패스워드를 입력 해주세요."
          ></Writer>
        </InputWrapper>
      </WriterWrapper>
    </Wrapper>
  );
}
