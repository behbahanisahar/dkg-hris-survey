import * as React from "react";
import "./dashboard-header.css";
import CategorySummary from "../../../../entities/reports/category-summary";
import ReportServices from "../../../../services/report-services";

interface IProps {
  itemId: number;
  match?: any;
  lang: string;
}
interface IState {
  itemId: number;
  userInfo: CategorySummary;
  isFetched: boolean;
}

export default class DashboardHeader extends React.Component<IProps, IState> {
  private ReportServices: ReportServices;
  public constructor(props: any) {
    super(props);
    this.ReportServices = new ReportServices();
    this.state = {
      itemId: 0,
      isFetched: false,
      userInfo: {
        user: {},
        surveyProgress: 0,
      },
    };
  }
  public async componentWillReceiveProps(nextProps: any) {
    this.getData(nextProps.itemId);
  }
  public async getData(NominationId: number) {
    await this.ReportServices.getReportHeaderData(NominationId).then(response => {
      this.setState(current => ({
        ...current,
        userInfo: response,
        itemId: NominationId,
        isFetched: true,
      }));
      document.title = `Dashboard - ${response.user?.spLatinFullName}` ?? "Dashboard";
    });
  }
  public async componentDidMount() {
    this.getData(this.props.itemId);
  }
  public render() {
    return (
      <>
        {this.state.isFetched && (
          <div className="kt-widget kt-widget--user-profile-3 pt-1">
            <div className="kt-widget__top">
              <div className="kt-widget__media kt-media avatar mx-3">
                {this.state.userInfo.user?.avatarUrl === undefined && (
                  <span className="gradient">{this.state.userInfo.user?.avatarTextPlaceholder}</span>
                )}
                {this.state.userInfo.user?.avatarUrl !== undefined && (
                  <img alt={this.state.userInfo.user?.title} src={this.state.userInfo.user?.avatarUrl}></img>
                )}
              </div>

              <div className="kt-widget__content mt-3">
                <div className="kt-widget__head">
                  <span className="kt-widget__username">{this.state.userInfo.user?.spLatinFullName}</span>
                </div>

                <div
                  className={
                    this.props.lang === "fa"
                      ? "kt-widget__subhead text-align-right"
                      : "kt-widget__subhead text-align-left"
                  }
                >
                  <span>{this.state.userInfo.user?.cLevel} | </span>
                  <span>{this.state.userInfo.user?.department} | </span>
                  <span>{this.state.userInfo.user?.reportedPost}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}
