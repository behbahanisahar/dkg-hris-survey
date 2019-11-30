import IReportIntro from "../../../entities/reports/report-intro";

export default interface IDashboardIntroState {
  showSpinner: boolean;
  items: IReportIntro;
  order: string;
  orderBy: string;
  filterName: string;
  page: number;
  rowsPerPage: number;
  users: any[];
}
