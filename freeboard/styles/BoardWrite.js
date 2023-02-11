import styled from "@emotion/styled";

export const Wrapper = styled.div`
  width: 1200px;
  /* height: 1847px; */
  border: 1px solid black;
  margin: 100px;
  padding-top: 80px;
  padding-bottom: 100px;
  padding-left: 102px;
  padding-right: 102px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: none;
  box-shadow: 0px 0px 10px gray;
`;

export const WriterWrapper = styled.div`
  width: 100%; //1200px
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-top: 40px;
`;

export const Title = styled.div`
  font-family: Arial, Helvetica, sans-serif;
  font-size: 36px;
  font-weight: bold;
`;

export const InputWrapper = styled.div`
  padding-top: 40px;
  width: 100%;
`;

export const Label = styled.div`
  font-size: 16px;
  font-weight: 800;
  margin-bottom: 20px;
`;

export const Writer = styled.input`
  width: calc(100%);
  height: 52px;
  padding-left: 16px;
  border: 1px solid #bdbdbd;
`;

export const Subject = styled.input`
  width: calc(100%); //996px;
  height: 52px;
  padding-left: 16px;
`;
