import NominationData from "../../../../entities/nomination";
import IUser from "../../../../entities/user";
import SnackBarMode from "../../../../entities/snackbar-mode";

export default interface IAdvanceSelectState {
  NominationData: NominationData;
  SelectedPeers: IUser[];
  SelectedOthers: IUser[];
  SelectedSubOrdinates: IUser[];
  SelectedPeerID: number;
  SelectedPeer: string;
  SelectedOtherID: number;
  SelectedOther: string;
  SelectedSubOrdinateID: number;
  SelectedSubOrdinate: string;
  /****** Snackbar message ********* */
  showSnackbarMessage: boolean;
  snackbarType: SnackBarMode;
  snackbarMessage: string;
}
