import * as S from "./BoardCommentList.styles";
import { getMyDate } from "../../../../commons/utils/utils";
import { IBoardCommentListUIProps } from "./BoardCommentList.types";
//  Current 버블링에 의해 실행된 온클릭이 실행된 현재태그 아이디 가져오기
//  Target 현재 선택한 태그의 실행된 현재태그 아이디 가져오기
//  자식 태그, 부모태그에 id={el.writer} onClick={name} 설정하면 2번 실행이 된다.

export default function BoardCommentListUI(props: IBoardCommentListUIProps) {
      return (
            <div>
                  {props.isOpenDeleteModal && (
                        <S.PasswordModal
                              visible={true}
                              onOk={props.onClickDelete}
                        >
                              <div>비밀번호 입력: </div>
                              <S.PasswordInput
                                    type="password"
                                    onChange={props.onChangeDeletePassword}
                              />
                        </S.PasswordModal>
                  )}

                  {props.data?.fetchBoardComments?.map((el) => (
                        <S.ItemWrapper id={el.writer}>
                              <S.FlexWrapper>
                                    <S.Avatar src="/images/avatar.png" />
                                    <S.MainWrapper>
                                          <S.WriterWrapper>
                                                <S.Writer id={"123"}>
                                                      {el.writer}
                                                </S.Writer>
                                                <S.Star
                                                      value={el.rating}
                                                      disabled
                                                />
                                          </S.WriterWrapper>
                                          <S.Contents>{el.contents}</S.Contents>
                                    </S.MainWrapper>
                                    <S.OptionWrapper>
                                          <S.UpdateIcon src="/images/boardComment/list/option_update_icon.png/" />
                                          <S.DeleteIcon
                                                id={el._id}
                                                src="/images/boardComment/list/option_delete_icon.png/"
                                                onClick={
                                                      props.onclickOpenDeleteModal
                                                }
                                          />
                                    </S.OptionWrapper>
                              </S.FlexWrapper>
                              <S.DateString>
                                    {getMyDate(el?.createdAt)}
                              </S.DateString>
                        </S.ItemWrapper>
                  ))}
            </div>
      );
}
