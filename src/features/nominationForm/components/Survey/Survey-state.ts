import UserInfoItem from "../../../../entities/user-info";
import SnackBarMode from "../../../../entities/snackbar-mode";
import NominationData from "../../../../entities/nomination";

export default interface ISurveyState {
    UserInfo: UserInfoItem[];
    SelectedPeerID:number;
    SelectedPeer:string;
    SelectedOtherID:number;
    SelectedOther:string;
    order: string;
    orderBy: string;
    page: number;
    rowsPerPage: number;
    SelectedPeers: any[];
    SelectedOthers: any[];
    UsersIsLoading:boolean;
    itemId:number;
    NominationData:NominationData;
    activeStep:number;
      /****** Snackbar message ********* */
      showSnackbarMessage: boolean;
      snackbarType: SnackBarMode;
      snackbarMessage: string;
}