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
  SelectedSubOrdinates: IUser[];
  UsersIsLoading: boolean;
  itemId: number;
  NominationData: NominationData;
  activeStep: number;
  showSpinner: boolean;
  errorSubordinate: boolean;
  errorOther: boolean;
  errorPeer: boolean;
  /****** Snackbar message ********* */
  snackbarType: SnackBarMode;
  showSnackbarMessagePeer: boolean;
  snackbarMessagePeer: string;
  showSnackbarMessageOther: boolean;
  snackbarMessageOther: string;
  showSnackbarMessageSubordinate: boolean;
  snackbarMessageSubordinate: string;
  showSnackbarMessage: boolean;
  snackbarMessage: string;
}
