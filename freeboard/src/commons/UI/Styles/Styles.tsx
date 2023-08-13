import styled from "@emotion/styled";

export const BasicWrapper = styled.div<{
  //가장바깥틀
  width?: any;
  color?: any;
  Sort?: any;
  displayflex?: any;
  spacebetween?: any;
  aligncenter?: any;
  margin?: any;
  padding?: any;
}>`
  width: ${(props) => props.width};
  display: ${(props) => props.displayflex};
  flex-direction: ${(props) => props.Sort};
  justify-content: ${(props) => props.spacebetween};
  align-items: ${(props) => props.aligncenter};
  border: 1px solid ${(props) => props.color};
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
`;

export const BasicInnerWrapper = styled.div<{
  //가장바깥틀 안쪽 틀
  stylesprops?: any;
}>`
  width: ${(props) => props.stylesprops.width};
  height: ${(props) => props.stylesprops.height};
  border: 1px solid ${(props) => props.stylesprops.color};
  display: ${(props) => props.stylesprops.displayflex};
`;

export const ItemWrapper = styled.div<{
  //가장바깥틀
  stylesprops?: any;
}>`
  width: ${(props) => props.stylesprops.width};
  height: ${(props) => props.stylesprops.height};
  border: 1px solid ${(props) => props.stylesprops.color};
  display:${(props) => props.stylesprops.displayflex}
  flex-direction:${(props) => props.stylesprops.Sort}
`;

export const ImageWrapper = styled.div<{
  //가장바깥틀
  stylesprops?: any;
}>`
  width: ${(props) => props.stylesprops.width};
  height: ${(props) => props.stylesprops.height};
  border: 5px solid green;
  margin-top: ${(props) => props.stylesprops.margintop};
`;

export const ImageWriteDetailWrapper = styled.div<{
  //가장바깥틀
  stylesprops?: any;
}>`
  width: ${(props) => props.stylesprops.width};
  height: ${(props) => props.stylesprops.height};
  display: ${(props) => props.stylesprops.displayflex};
  flex-direction: ${(props) => props.stylesprops.Sort};

  border: 5px solid red;
`;

export const ImageWriteDetailInnerWrapper = styled.div<{
  //가장바깥틀
  stylesprops?: any;
}>`
  width: ${(props) => props.stylesprops.width};
  height: ${(props) => props.stylesprops.height};
  border: 5px solid green;
  display: ${(props) => props.stylesprops.displayflex};
  flex-direction: ${(props) => props.stylesprops.Sort};
  justify-content: ${(props) => props.stylesprops.justifycontent};
`;

export const Img = styled.img<{
  //가장바깥틀
  stylesprops?: any;
  imgsrc?: any;
}>`
  width: ${(props) => props.stylesprops.width};
  height: ${(props) => props.stylesprops.height};
  display: ${(props) => (props.stylesprops.truedata === " " ? "none" : "")};
`;
//  display: props로 전달받은 데이터값이 빈값이면 dipslay:none속성을 지정하여 액박깨짐현상을 숨겨줌
export const BasicText = styled.span<{ stylesprops?: any }>`
  width: ${(props) => props.stylesprops.width};
  text-align: ${(props) => props.stylesprops.textalign};
  font-size: ${(props) => props.stylesprops.FontSize};
  font-weight: ${(props) => props.stylesprops.Weight};
  margin-left: ${(props) => props.stylesprops.marginleft};
  margin-right: ${(props) => props.stylesprops.marginright};
  display: ${(props) => props.stylesprops.displayinline};
  margin-bottom: ${(props) => props.stylesprops.marginbottm};

  overflow: ${(props) => props.stylesprops.overflowhidden};
`;

export const BasicTextWrapper = styled.div<{
  //가장바깥틀
  stylesprops?: any;
}>`
  width: ${(props) => props.stylesprops.width};
  height: ${(props) => props.stylesprops.height};
  display: ${(props) => props.stylesprops.displayflex};
  flex-direction: ${(props) => props.stylesprops.flexdirecton};
  justify-content: ${(props) => props.stylesprops.end};
  align-items: ${(props) => props.stylesprops.center};
  padding: ${(props) => props.stylesprops.padding};
`;

export const CardWrapper = styled.div`
  border: 1px solid black;
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

export const Header = styled.div<{ stylesprops: any }>`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #bdbdbd;
  padding-bottom: 20px;
  margin-top: ${(props) => props.stylesprops.margintop};
`;

export const AvatarWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Avatar = styled.img`
  margin-right: 10px;
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Body = styled.div<{ stylesprops?: any }>`
  width: 100%;
  min-height: ${(props) => props.stylesprops.Minheight};
  border: 1px solid red;
`;

export const Button = styled.button`
  width: 179px;
  height: 45px;
  background-color: white;
  border: 1px solid gray;
  margin: 0px 12px;
  cursor: pointer;

  :hover {
    background-color: gold;
    border-color: white;
  }
`;

export const SliderWrapper = styled.div`
  width:100%
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  margin-top: 150px;
  
`;

export const SliderItem = styled.img`
  height: 300px;
  margin: auto;
`;

export const ButtonWrapper = styled.div<{ stylesprops?: any }>`
  width: ${(props) => props.stylesprops.width};
  height: ${(props) => props.stylesprops.height};
  display: ${(props) => props.stylesprops.displayflex};
  justify-content: ${(props) => props.stylesprops.justifycontent};
  align-items: ${(props) => props.stylesprops.alignitems};
  border: 1px solid red;
`;
// export const SliderWrapper = styled.div``;

export const KaKaoMapWrapper = styled.div`
  width: 100%;
  height: 100%;
`;
