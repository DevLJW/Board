import { useForm } from "react-hook-form";
import UsedMarketItemUploadEditAddressWrapper from "../../../../commons/UsedMarket/UsedMarketItem_Upload_edit/UsedMarketItem_Upload_Edit_AddressWrapper/UsedMarketItem_Upload_Edit_AddressWrapper.container";
import UsedMarketItemUploadEditButton from "../../../../commons/UsedMarket/UsedMarketItem_Upload_edit/UsedMarketItem_Upload_Edit_Button/UsedMarketItem_Upload_Edit_Button.container";
import UsedMarketItemUploadEditButtonWrapper from "../../../../commons/UsedMarket/UsedMarketItem_Upload_edit/UsedMarketItem_Upload_Edit_ButtonWrapper/UsedMarketItem_Upload_Edit_ButtonWrapper.container";
import UsedMarketItemUploadEditGpsDiv from "../../../../commons/UsedMarket/UsedMarketItem_Upload_edit/UsedMarketItem_Upload_Edit_GpsDiv/UsedMarketItem_Upload_Edit_GpsDiv.container";
import UsedMarketItemUploadEditGpsWrapper from "../../../../commons/UsedMarket/UsedMarketItem_Upload_edit/UsedMarketItem_Upload_Edit_GpsWrapper/UsedMarketItem_Upload_Edit_GpsWrapper.container";
import UsedMarketItemUploadEditImageWrapper from "../../../../commons/UsedMarket/UsedMarketItem_Upload_edit/UsedMarketItem_Upload_Edit_ImageWrapper/UsedMarketItem_Upload_Edit_ImageWrapper.container";
import UsedMarketItemUploadEditInput from "../../../../commons/UsedMarket/UsedMarketItem_Upload_edit/UsedMarketItem_Upload_Edit_Input/UsedMarketItem_Upload_Edit_Input.container";
import UsedMarketItemUploadEditInputWrapper from "../../../../commons/UsedMarket/UsedMarketItem_Upload_edit/UsedMarketItem_Upload_Edit_InputWrapper/UsedMarketItem_Upload_Edit_InputWrapper.container";
import UsedMarketItemUploadEditInputAddress from "../../../../commons/UsedMarket/UsedMarketItem_Upload_edit/UsedMarketItem_Upload_Edit_Input_Address/UsedMarketItem_Upload_Edit_InputAddress.container";
import UsedMarketItemUploadEditLabel from "../../../../commons/UsedMarket/UsedMarketItem_Upload_edit/UsedMarketItem_Upload_Edit_Label/UsedMarketItem_Upload_Edit_Label.container";
import UsedMarketItemUploadEditMapImage from "../../../../commons/UsedMarket/UsedMarketItem_Upload_edit/UsedMarketItem_Upload_Edit_MapImage/UsedMarketItem_Upload_Edit_MapImage.container";
import UsedMarketItemUploadEditMapWrapper from "../../../../commons/UsedMarket/UsedMarketItem_Upload_edit/UsedMarketItem_Upload_Edit_MapWrapper/UsedMarketItem_Upload_Edit_MapWrapper.container";
import UsedMarketItemUploadEditRadioButton from "../../../../commons/UsedMarket/UsedMarketItem_Upload_edit/UsedMarketItem_Upload_Edit_RadioButton/UsedMarketItem_Upload_Edit_RadioButton.container";
import UsedMarketItemUploadEditRadioWrapper from "../../../../commons/UsedMarket/UsedMarketItem_Upload_edit/UsedMarketItem_Upload_Edit_RadioWrapper/UsedMarketItem_Upload_Edit_RadioWrapper.container";
import UsedMarketItemUploadEditTitle from "../../../../commons/UsedMarket/UsedMarketItem_Upload_edit/UsedMarketItem_Upload_Edit_Title/UsedMarketItem_Upload_Edit_Title.container";
import UsedMarketItemUploadEditWrapper from "../../../../commons/UsedMarket/UsedMarketItem_Upload_edit/UsedMarketItem_Upload_Edit_Wrapper/UsedMarketItem_Upload_Edit_Wrapper.container";
import UsedMarketItemUploadEditWriterWrapper from "../../../../commons/UsedMarket/UsedMarketItem_Upload_edit/UsedMarketItem_Upload_Edit_WriterWrapper/UsedMarketItem_Upload_Edit_WrterWrapper.container";
import UsedMarketItemUploadInnerMapWrapper from "../../../../commons/UsedMarket/UsedMarketItem_Upload_edit/UsedMarketItem_Upload_InnerMapWrapper/UsedMarketItem_Upload_InnerMapWrapper.container";
import UsedMarketItemUploadWrapper from "../../../../commons/UsedMarket/UsedMarketItem_Upload_edit/UsedMarketItem_Upload_ItemUploadWrapper/UsedMarketItem_Upload_ItemUploadWrapper.container";
import UploadButton from "../../../../commons/uploadbutton/uploadbutton.container";
import {
  ICreateItemSchema,
  IUsedMarketItemUploadUI,
} from "./UsedMarketItemUpload_Edit.types";
import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider } from "react-hook-form";

const CreateItemSchema = yup.object<ICreateItemSchema>({
  //검증
  // name: yup.string().required("필수 입력값입니다."),
  // remarks: yup.string().min(4).max(15).required("필수 입력값 입니다."),
  // contents: yup.string().required("필수 입력값 입니다."),
  // price: yup.string().required("필수 입력값 입니다."),
  // tags: yup.string().required("필수 입력값 입니다."),
  // useditemAddress: yup.string().required("필수 입력값 입니다."),
  // images: yup.string().required("필수 입력값 입니다."),
});

const onSubmit = (data: ICreateItemSchema) => {
  const abc = data.tags.toString();

  const abc3 = abc.split("#");

  const abc4 = abc3.filter(function (item) {
    return item !== null && item !== undefined && item !== "";
  });
  // if (data.tags === abc4) {
  //   data.tags = [""];
  // }

  data.tags = [...abc4];

  console.log(data);
  console.log(data.tags);

  // StringTagsData123.map((el) => (data.tags[1] = JSON.parse(el[1])));

  // const replaceValue = StringTagsValue.replaceAll(
  //   StringTagsValue,
  // `!@${StringTagsValue}!@`
  // );
  // console.log(replaceValue);
  // const splitvalue = replaceValue.split("!@");
  // const max = splitvalue.map((el) => (data.tags = Array<string>(el)));
};

export default function UsedMarketItemUploadUI(props: IUsedMarketItemUploadUI) {
  //  상품 등록하기 폼

  const CreateItemMethods = useForm<ICreateItemSchema>({
    resolver: yupResolver(CreateItemSchema),

    defaultValues: {
      name: "",
      remarks: "",
      contents: "",
      price: 0,
      tags: [],
      useditemAddress: {},
      images: [""],
    },
  });

  return (
    <FormProvider {...CreateItemMethods}>
      <UsedMarketItemUploadEditWrapper
        onSubmit={CreateItemMethods.handleSubmit(onSubmit)}
      >
        <UsedMarketItemUploadEditTitle>
          상품 등록하기
        </UsedMarketItemUploadEditTitle>

        <UsedMarketItemUploadEditWriterWrapper>
          <UsedMarketItemUploadEditInputWrapper>
            <UsedMarketItemUploadEditLabel>
              상품명
            </UsedMarketItemUploadEditLabel>
            <UsedMarketItemUploadEditInput
              name="name"
              type="text"
              placeholder="상품명을 입력 해주세요."
            ></UsedMarketItemUploadEditInput>
          </UsedMarketItemUploadEditInputWrapper>
          <UsedMarketItemUploadEditInputWrapper>
            <UsedMarketItemUploadEditLabel>
              한줄요약
            </UsedMarketItemUploadEditLabel>
            <UsedMarketItemUploadEditInput
              name="remarks"
              type="text"
              placeholder="한줄요약을 작성 해주세요."
            ></UsedMarketItemUploadEditInput>
          </UsedMarketItemUploadEditInputWrapper>
        </UsedMarketItemUploadEditWriterWrapper>

        <UsedMarketItemUploadEditInputWrapper>
          <UsedMarketItemUploadEditLabel>
            상품설명
          </UsedMarketItemUploadEditLabel>
          <UsedMarketItemUploadEditInput
            name="contents"
            type="text"
            placeholder="상품설명을 작성 해주세요."
          ></UsedMarketItemUploadEditInput>
        </UsedMarketItemUploadEditInputWrapper>

        <UsedMarketItemUploadEditWriterWrapper>
          <UsedMarketItemUploadEditInputWrapper>
            <UsedMarketItemUploadEditLabel>
              판매가격
            </UsedMarketItemUploadEditLabel>
            <UsedMarketItemUploadEditInput
              name="price"
              type="number"
              placeholder="판매가격을 입력 해주세요."
            ></UsedMarketItemUploadEditInput>
          </UsedMarketItemUploadEditInputWrapper>
          <UsedMarketItemUploadEditInputWrapper>
            <UsedMarketItemUploadEditLabel>
              태그입력
            </UsedMarketItemUploadEditLabel>
            <UsedMarketItemUploadEditInput
              name="tags"
              type="text"
              placeholder="태그를 입력 해주세요."
            ></UsedMarketItemUploadEditInput>
          </UsedMarketItemUploadEditInputWrapper>
        </UsedMarketItemUploadEditWriterWrapper>

        <UsedMarketItemUploadEditWriterWrapper></UsedMarketItemUploadEditWriterWrapper>

        <UsedMarketItemUploadEditMapWrapper>
          <UsedMarketItemUploadInnerMapWrapper>
            <UsedMarketItemUploadEditLabel>
              거래위치
            </UsedMarketItemUploadEditLabel>

            <UsedMarketItemUploadEditMapImage></UsedMarketItemUploadEditMapImage>
          </UsedMarketItemUploadInnerMapWrapper>

          <UsedMarketItemUploadInnerMapWrapper>
            <UsedMarketItemUploadEditLabel>GPS</UsedMarketItemUploadEditLabel>
            <UsedMarketItemUploadEditGpsWrapper>
              <UsedMarketItemUploadEditGpsDiv name="lat">
                위도
              </UsedMarketItemUploadEditGpsDiv>
              <UsedMarketItemUploadEditGpsDiv name="lng">
                경도
              </UsedMarketItemUploadEditGpsDiv>
            </UsedMarketItemUploadEditGpsWrapper>

            <UsedMarketItemUploadEditLabel>주소</UsedMarketItemUploadEditLabel>
            <UsedMarketItemUploadEditAddressWrapper>
              <UsedMarketItemUploadEditInputAddress
                type="text"
                name="useditemAddress.address"
              ></UsedMarketItemUploadEditInputAddress>
              <UsedMarketItemUploadEditInputAddress
                type="text"
                name="useditemAddress.addressDetail"
              ></UsedMarketItemUploadEditInputAddress>
            </UsedMarketItemUploadEditAddressWrapper>
          </UsedMarketItemUploadInnerMapWrapper>
        </UsedMarketItemUploadEditMapWrapper>

        <UsedMarketItemUploadWrapper>
          <UsedMarketItemUploadEditLabel>
            사진 업로드하기
          </UsedMarketItemUploadEditLabel>

          <UsedMarketItemUploadEditImageWrapper>
            <UploadButton></UploadButton>
            <UploadButton></UploadButton>
            <UploadButton></UploadButton>
          </UsedMarketItemUploadEditImageWrapper>
        </UsedMarketItemUploadWrapper>

        <UsedMarketItemUploadEditRadioWrapper>
          <UsedMarketItemUploadEditLabel>사진1</UsedMarketItemUploadEditLabel>
          <UsedMarketItemUploadEditRadioButton></UsedMarketItemUploadEditRadioButton>

          <UsedMarketItemUploadEditLabel>사진2</UsedMarketItemUploadEditLabel>
          <UsedMarketItemUploadEditRadioButton></UsedMarketItemUploadEditRadioButton>
        </UsedMarketItemUploadEditRadioWrapper>
        <UsedMarketItemUploadEditButtonWrapper>
          <UsedMarketItemUploadEditButton type="submit"></UsedMarketItemUploadEditButton>
        </UsedMarketItemUploadEditButtonWrapper>
      </UsedMarketItemUploadEditWrapper>
    </FormProvider>
  );
}
