import internal from "stream";

export interface IUsedItemAddress {
  //주소 타입
  zipcode: string;
  address: string;
  addressDetail: string;
  lat: GLfloat;
  lng: GLfloat;
}

export interface ICreateItemSchema {
  //폼 반환 값 타입
  name: string;
  remarks: string;
  contents: string;
  price: number;
  tags: string[];
  useditemAddress: IUsedItemAddress;
  images: string[];
}

export interface IUsedMarketItemUploadUI {
  onSubmit: (data: ICreateItemSchema) => void;
}
