import UserInfoItem from "../../../../entities/user-info";
import SnackBarMode from "../../../../entities/snackbar-mode";
import NominationData from "../../../../entities/nomination";
import IUser from "../../../../entities/user";

export default interface ISurveyState {
  UserInfo: UserInfoItem[];
  SelectedPeerID: number;
  SelectedPeer: string;
  SelectedOtherID: number;
  SelectedOther: string;
  SelectedSubOrdinateID: number;
  SelectedSubOrdinate: string;
  order: string;
  orderBy: string;
  page: number;
  rowsPerPage: number;
  SelectedPeers: IUser[];
  SelectedOthers: IUser[];
  UsersIsLoading: boolean;
  itemId: number;
  NominationData: NominationData;
  activeStep: number;
  showSpinner: boolean;
  /****** Snackbar message ********* */
  showSnackbarMessage: boolean;
  snackbarType: SnackBarMode;
  snackbarMessage: string;
}
