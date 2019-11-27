import * as React from "react";
import "./dashboard-header.css";

import { DKPortlet } from "../../../core/components/portlet/portlet";
import "./dashboard-header.css";
import CategorySummary from "../../../entities/reports/category-summary";
import ReportServices from "../../../services/report-services";

interface IProps {
  itemId: number;
  match?: any;
  lang: string;
}
interface IState {
  itemId: number;
  userInfo: CategorySummary;
}

export default class DashboardHeader extends React.Component<IProps, IState> {
  private ReportServices: ReportServices;
  public constructor(props: any) {
    super(props);
    this.ReportServices = new ReportServices();
    this.state = {
      itemId: 0,

      userInfo: {
        User: {},
        SurveyProgress: 0,
      },
    };
  }
  public async componentWillReceiveProps(nextProps: any) {
    if (this.state.itemId !== nextProps.itemId) {
      this.getData(this.state.itemId);
    }
  }
  public async getData(NominationId: number) {
    await this.ReportServices.getReportHeaderData(NominationId).then(response => {
      this.setState(current => ({
        ...current,
        userInfo: response,
        itemId: NominationId,
      }));
    });
  }
  public async componentDidMount() {
    this.getData(this.props.itemId);
  }
  public render() {
    return (
      <DKPortlet hasHeader={false}>
        <>
          <div className="kt-widget kt-widget--user-profile-3">
            <div className="kt-widget__top">
              <div className="kt-widget__media mx-3">
                {this.state.userInfo.User.AvatarUrl === null && (
                  <span className="gradient">{this.state.userInfo.User.AvatarTextPlaceholder}</span>
                )}
                {this.state.userInfo.User.AvatarUrl !== null && (
                  <img alt={this.state.userInfo.User.Title} src={this.state.userInfo.User.AvatarUrl}></img>
                )}
              </div>

              <div className="kt-widget__content">
                <div className="kt-widget__head">
                  <span className="kt-widget__username">{this.state.userInfo.User.SPLatinFullName}</span>
                </div>

                <div
                  className={
                    this.props.lang === "fa"
                      ? "kt-widget__subhead text-align-right"
                      : "kt-widget__subhead text-align-left"
                  }
                >
                  <span>{this.state.userInfo.User.EmailAddress} | </span>
                  <span>{this.state.userInfo.User.Department} | </span>
                  <span>{this.state.userInfo.User.ReportedPost}</span>
                </div>
              </div>
            </div>
          </div>
        </>
      </DKPortlet>
    );
  }
}
