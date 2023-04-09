import * as A from "./firebaseboardwrite.styles";
import { FireBaseBoardWriteUIIprops } from "./firebaseboardwrite.types";

export default function FireBaseBoardWriteUI(
  props: FireBaseBoardWriteUIIprops
) {
  return (
    <A.Wrapper>
      <div>
        작성자: <A.MyInput type="text" onChange={props.onChangeWriter} />
      </div>
      <div>
        제 목: <A.MyInput type="text" onChange={props.onChangetitle} />
      </div>
      <div>
        내 용: <A.MyInput type="text" onChange={props.onChangecontent} />
      </div>
      <div>
        <button onClick={props.onClickSubmit}>등록하기</button>
      </div>
    </A.Wrapper>
  );
}
