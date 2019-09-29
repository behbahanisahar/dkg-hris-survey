import UserInfoItem from "../../../../entities/user-info";
import SnackBarMode from "../../../../entities/snackbar-mode";
import NominationData from "../../../../entities/nomination";
import IUser from "../../../../entities/user";
import IHistory from "../../../../entities/history";

export default interface ISurveyState {
  UserInfo: UserInfoItem[];
  SelectedPeerID: number;
  SelectedPeer: string;
  SelectedOtherID: number;
  SelectedOther: string;
  SelectedSubOrdinateID: number;
  SelectedSubOrdinate: string;
  SelectedSubOrdinates: IUser[];
  order: string;
  orderBy: string;
  page: number;
  rowsPerPage: number;
  SelectedPeers: IUser[];
  showSpinner: boolean;
  SelectedOthers: IUser[];
  UsersIsLoading: boolean;
  itemId: number;
  NominationData: NominationData;
  NominationHistory: IHistory[];
  activeStep: number;
  HideSubordinateHistory: boolean;
  HideOtherHistory: boolean;
  HidePeerHistory: boolean;
  /****** Snackbar message ********* */
  showSnackbarMessage: boolean;
  snackbarType: SnackBarMode;
  snackbarMessage: string;
}
