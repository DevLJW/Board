import styled from "@emotion/styled";
import { ITextTokenProps } from "./BoardList.types";

export const Wrapper = styled.div`
  width: 1800px;
  margin: 100px;
`;

export const TableTop = styled.div`
  border-top: 2px solid gray;
  margin-top: 20px;
`;

export const TableBottom = styled.div`
  border-bottom: 2px solid gray;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  height: 52px;
  line-height: 52px;
  border-bottom: 1px solid gray;
`;

export const ColumnHeaderBasic = styled.div`
  width: 10%;
  text-align: center;
`;

export const ColumnHeaderTitle = styled.div`
  width: 60%;
  text-align: center;
`;

export const ColumnTitle = styled.div`
  width: 60%;
  text-align: center;
  cursor: pointer;

  :hover {
    color: blue;
  }
`;

export const ColumnBasic = styled.div`
  width: 10%;
  text-align: center;
`;

export const ColumnBuy = styled.div`
  width: 10%;
  text-align: center;
  cursor: pointer;

  :hover {
    background-color: #f5f2fc;
  }
`;

export const Footer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-top: 50px;
`;

export const PencilIcon = styled.img``;

export const Button = styled.button`
  width: 171px;
  height: 52px;
  background-color: white;
  border-radius: 15px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  cursor: pointer;
`;

export const SearchBar = styled.input`
  width: 200px;
  height: 50px;
`;

export const TextToken = styled.span`
  color: ${(props: ITextTokenProps) => (props.isMatched ? "red" : "black")};
`;
