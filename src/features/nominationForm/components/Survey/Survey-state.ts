import UserInfoItem from "../../../../entities/user-info";
import SnackBarMode from "../../../../entities/snackbar-mode";

export default interface ISurveyState {
    UserInfo: UserInfoItem[];
    SelectedUserID:number;
    SelectedUser:string;
    order: string;
    orderBy: string;
    page: number;
    rowsPerPage: number;
    SelectedUsers: any[];
      /****** Snackbar message ********* */
      showSnackbarMessage: boolean;
      snackbarType: SnackBarMode;
      snackbarMessage: string;
}