import IReportIntro from "../../../entities/reports/report-intro";
import UserInfoItem from "../../../entities/user-info";

export default interface IDashboardIntroState {
  showSpinner: boolean;
  items: IReportIntro;
  order: string;
  orderBy: string;
  filterName: string;
  page: number;
  rowsPerPage: number;
  users: UserInfoItem[];
}
