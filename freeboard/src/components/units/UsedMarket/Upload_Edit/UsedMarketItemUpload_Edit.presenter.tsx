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
import { v4 as uuid4 } from "uuid";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider } from "react-hook-form";
import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_USED_ITEM } from "./UsedMarketItemUpload_Edit.queries";
import {
  IMutation,
  IMutationCreateUseditemArgs,
} from "../../../../commons/types/generated/types";
import { Modal } from "antd";
import DaumPostcodeEmbed, { Address } from "react-daum-postcode";
import { Title } from "../../board/write/BoardWrite.styles";
import Head from "next/head";
import { KaKaoMapWrapper } from "../../../../commons/UI/Styles/Styles";
import { useRecoilState, useRecoilValue } from "recoil";
import { KaKaoMap } from "../../../../commons/store";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

declare const window: typeof globalThis & {
  kakao: any;
};

const ReactQuill = dynamic(async () => await import("react-quill"), {
  ssr: false,
});

const CreateItemSchema = yup.object<ICreateItemSchema>({
  name: yup.string().required("필수 입력값입니다."),
  remarks: yup.string().min(4).max(15).required("필수 입력값 입니다."),
  contents: yup.string().required("필수 입력값 입니다."),
  price: yup.number().required("필수 입력값 입니다."),
  tags: yup.string().required("필수 입력값 입니다."),
  useditemAddress: yup.string().required("필수 입력값 입니다."),
  images: yup.string().required("필수 입력값 입니다."),
});
//  props.boolean이 true일경우 등록페이지
//  props.boolean이 false일경우 수정페이지

export default function UsedMarketItemUploadUI(props: any) {
  const [Map, SetMap] = useState({});
  // const [KaKaoMapObject, SetKaKaoMap] = useRecoilState(KaKaoMap); // 글로벌 스테이트 연습

  useEffect(() => {
    const container = document.getElementById("map"); //    지도를 담을 영역의 DOM 레퍼런스
    // SetKaKaoMap(container);

    const options = {
      //    지도를 생성할 때 필요한 기본 옵션
      center: new window.kakao.maps.LatLng(33.450701, 126.570667), //    지도의 중심좌표.
      level: 3, // 지도의 레벨(확대, 축소 정도)
    };
    //글로벌 스테이트로 뺴보기

    SetMap(new window.kakao.maps.Map(container, options)); //  지도 생성 및 객체 리턴(컨테이너 디자인안에 옵션넣는다생각)

    if (props?.fetchUseditemData?.fetchUseditem?.images)
      setFileFileUrls([...props?.fetchUseditemData?.fetchUseditem?.images]);
  }, []);

  // useEffect(() => {

  // }, [props.fetchUseditemData]); // props.data가 수정될때마다 리렌더링 해주기(처음API 통신을 통해 데이터를 받아옴(변경) 실행)

  const handleChange = (value: string) => {
    CreateItemMethods.setValue("contents", value);
    CreateItemMethods.trigger("contents");
  };

  const onToggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  //  상품 등록하기 폼
  const [FileUrls, setFileFileUrls] = useState(["", "", ""]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [CreateUsedItem] = useMutation<
    Pick<IMutation, "createUseditem">,
    IMutationCreateUseditemArgs
  >(CREATE_USED_ITEM);

  const onSubmit = async (data: ICreateItemSchema) => {
    data.useditemAddress.addressDetail = CreateItemMethods.getValues(
      "useditemAddress.addressDetail"
    );

    data.useditemAddress.lat = CreateItemMethods.getValues(
      "useditemAddress.lat"
    );
    data.useditemAddress.lng = CreateItemMethods.getValues(
      "useditemAddress.lng"
    );

    console.log("주소");

    console.log(data.useditemAddress);

    // const abc = JSON.stringify(data.tags)
    const abc = data.tags.toString();

    const abc3 = abc.split("#");

    const abc4 = abc3.filter(function (item) {
      return item !== null && item !== undefined && item !== "";
    });

    data.tags = [...abc4];

    data.images = [...FileUrls];

    const useditem = await CreateUsedItem({
      variables: {
        createUseditemInput: {
          name: data.name,
          remarks: data.remarks,
          contents: data.contents,
          price: Number(data.price),
          tags: data.tags,
          useditemAddress: data.useditemAddress,
          images: data.images,
        },
      },
    });

    console.log(useditem);
  };

  const onChangeFileUrls = (FileUrl: string, index: number) => {
    const newFileUrls = [...FileUrls]; //글작성 할때 빈값  ["", "", ""]
    newFileUrls[index] = FileUrl;
    setFileFileUrls(newFileUrls); // 작성하고 나서 url값이 배열에 들어감
  };

  const CreateItemMethods = useForm<ICreateItemSchema>({
    defaultValues: {
      name: props?.boolean ? "" : props?.fetchUseditemData?.fetchUseditem?.name,
      remarks: props?.boolean
        ? ""
        : props?.fetchUseditemData?.fetchUseditem?.remarks,
      contents: props?.boolean
        ? ""
        : props?.fetchUseditemData?.fetchUseditem?.contents,
      price: props?.boolean
        ? 0
        : props?.fetchUseditemData?.fetchUseditem?.price,
      tags: props?.boolean ? [] : props?.fetchUseditemData?.fetchUseditem?.tags,
      useditemAddress: props?.boolean
        ? {}
        : props?.fetchUseditemData?.fetchUseditem?.useditemAddress,
      images: props?.boolean ? [""] : FileUrls,
    },
  });

  const handleComplete = (address: Address) => {
    const geocoder = new window.kakao.maps.services.Geocoder(); // 한글주소 위경도 변환용도

    CreateItemMethods.setValue("useditemAddress.address", address.address);
    console.log("현재 들어있는 위치 값"); //  실제주소값
    console.log(CreateItemMethods.getValues("useditemAddress.address"));

    //카카오맵 부분
    const callback = function (result, status) {
      if (status === window.kakao.maps.services.Status.OK) {
        console.log(result);
        CreateItemMethods.setValue(
          "useditemAddress.lat",
          parseFloat(result[0].y)
        );
        CreateItemMethods.setValue(
          "useditemAddress.lng",
          parseFloat(result[0].x)
        );
        panto(result[0].y, result[0].x); // lat 위도 : 34.... [y] lng 경도 127....[x]
      }
    };

    const panto = (Lat: any, Lng: any) => {
      // 이동할 위도 경도 위치를 생성합니다
      console.log(Lat, Lng);
      const moveLatLon = new window.kakao.maps.LatLng(Lat, Lng);

      Map.panTo(moveLatLon);
    };

    geocoder.addressSearch(
      CreateItemMethods.getValues("useditemAddress.address"),
      callback
    );

    onToggleModal();
  };

  return (
    <>
      <Head>
        <script
          type="text/javascript"
          src="//dapi.kakao.com/v2/maps/sdk.js?appkey=effc3eae32c3943b497f75d115db9c59&libraries=services"
        ></script>
      </Head>

      <FormProvider {...CreateItemMethods}>
        <UsedMarketItemUploadEditWrapper
          onSubmit={CreateItemMethods.handleSubmit(onSubmit)}
        >
          <UsedMarketItemUploadEditTitle>
            {props.boolean ? "상품 등록하기" : "상품 수정하기"}
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
            <ReactQuill onChange={handleChange}></ReactQuill>
          </UsedMarketItemUploadEditInputWrapper>

          <UsedMarketItemUploadEditWriterWrapper>
            <UsedMarketItemUploadEditInputWrapper>
              <UsedMarketItemUploadEditLabel>
                판매가격
              </UsedMarketItemUploadEditLabel>
              <UsedMarketItemUploadEditInput
                name="price"
                placeholder="판매가격을 입력 해주세요."
                type="number"
              ></UsedMarketItemUploadEditInput>
            </UsedMarketItemUploadEditInputWrapper>
            <UsedMarketItemUploadEditInputWrapper>
              <UsedMarketItemUploadEditLabel>
                태그입력
              </UsedMarketItemUploadEditLabel>
              <UsedMarketItemUploadEditInput
                name="tags"
                placeholder="태그를 입력 해주세요."
                type="text"
              ></UsedMarketItemUploadEditInput>
            </UsedMarketItemUploadEditInputWrapper>
          </UsedMarketItemUploadEditWriterWrapper>

          <UsedMarketItemUploadEditWriterWrapper></UsedMarketItemUploadEditWriterWrapper>

          <UsedMarketItemUploadEditMapWrapper>
            <UsedMarketItemUploadInnerMapWrapper>
              <UsedMarketItemUploadEditLabel>
                거래위치
              </UsedMarketItemUploadEditLabel>

              <UsedMarketItemUploadEditMapImage>
                <KaKaoMapWrapper id="map"></KaKaoMapWrapper>
              </UsedMarketItemUploadEditMapImage>
            </UsedMarketItemUploadInnerMapWrapper>

            <UsedMarketItemUploadInnerMapWrapper>
              <UsedMarketItemUploadEditLabel>GPS</UsedMarketItemUploadEditLabel>
              <UsedMarketItemUploadEditGpsWrapper>
                <UsedMarketItemUploadEditGpsDiv
                  name="AddressSearch"
                  onClickAddressSearch={onToggleModal}
                >
                  주소 검색하기
                </UsedMarketItemUploadEditGpsDiv>
                {isModalOpen && (
                  <Modal
                    title="Basic Modal"
                    open={true}
                    onOk={onToggleModal}
                    onCancel={onToggleModal}
                  >
                    비밀번호 입력 : <input type="password"></input>
                    <DaumPostcodeEmbed onComplete={handleComplete} />
                  </Modal>
                )}
              </UsedMarketItemUploadEditGpsWrapper>

              <UsedMarketItemUploadEditLabel>
                주소
              </UsedMarketItemUploadEditLabel>
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
              {FileUrls.map(
                (
                  el,
                  index //기본 파일 URL["" "" "" ] 3개이므로 3회전
                ) => (
                  <UploadButton
                    key={uuid4()}
                    index={index}
                    onChangeFileUrls={onChangeFileUrls}
                    FileUrl={el}
                  />
                )
              )}
            </UsedMarketItemUploadEditImageWrapper>
          </UsedMarketItemUploadWrapper>

          <UsedMarketItemUploadEditRadioWrapper>
            <UsedMarketItemUploadEditLabel>사진1</UsedMarketItemUploadEditLabel>
            <UsedMarketItemUploadEditRadioButton></UsedMarketItemUploadEditRadioButton>

            <UsedMarketItemUploadEditLabel>사진2</UsedMarketItemUploadEditLabel>
            <UsedMarketItemUploadEditRadioButton></UsedMarketItemUploadEditRadioButton>
          </UsedMarketItemUploadEditRadioWrapper>
          <UsedMarketItemUploadEditButtonWrapper>
            <UsedMarketItemUploadEditButton type="submit">
              {props.boolean ? "상품 등록하기" : "상품 수정하기"}
            </UsedMarketItemUploadEditButton>
          </UsedMarketItemUploadEditButtonWrapper>
        </UsedMarketItemUploadEditWrapper>
      </FormProvider>
    </>
  );
}
