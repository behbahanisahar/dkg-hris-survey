import UserInfoItem from "../../../../entities/user-info";
import SnackBarMode from "../../../../entities/snackbar-mode";
import NominationData from "../../../../entities/nomination";

export default interface ISurveyState {
    UserInfo: UserInfoItem[];
    SelectedUserID:number;
    SelectedUser:string;
    order: string;
    orderBy: string;
    page: number;
    rowsPerPage: number;
    SelectedUsers: any[];
    UsersIsLoading:boolean;
    itemId:number;
    NominationData:NominationData;
    activeStep:number;
      /****** Snackbar message ********* */
      showSnackbarMessage: boolean;
      snackbarType: SnackBarMode;
      snackbarMessage: string;
}