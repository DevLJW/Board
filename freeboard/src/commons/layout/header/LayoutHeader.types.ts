import { IQuery } from "../../types/generated/types";

export interface ILayoutHeaderUI {
  onClickLogo: () => void;
  onClickMoveToLogin: () => void;
  onClickMoveToUserJoin: () => void;
  onClickMoveToShoppingBaskets: () => void;
  UserInfoData: Pick<IQuery, "fetchUserLoggedIn"> | undefined;
}
