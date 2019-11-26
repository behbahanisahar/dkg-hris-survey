import * as React from "react";
import "./dashboard-header.css";

import { DKPortlet } from "../../../core/components/portlet/portlet";
import "./dashboard-header.css";
import CategorySummary from "../../../entities/reports/category-summary";
import { Grid, LinearProgress } from "@material-ui/core";
import SummarySubordinates from "../../../entities/reports/category-summary-subordinate";
import ReportServices from "../../../services/report-services";

interface IProps {
  itemId: number;
  match?: any;
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
        Subordinates: [],
      },
    };
  }
  public async componentWillReceiveProps(nextProps: any) {
    console.log(nextProps);
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
    //  const itemId = this.props.match.params.itemId;
    this.getData(this.props.itemId);
  }
  public render() {
    return (
      <>
        <DKPortlet hasHeader={false}>
          <Grid container spacing={3}>
            <Grid item xs={8}>
              <div className="kt-widget__media kt-hidden-">
                <div className="kt-user-card-v2__pic">
                  {this.state.userInfo.User.AvatarUrl === null && (
                    <p className="NoAvatar">{this.state.userInfo.User.AvatarTextPlaceholder}</p>
                  )}
                  {this.state.userInfo.User.AvatarUrl !== null && (
                    <img
                      className="has-image"
                      alt={this.state.userInfo.User.Title}
                      src={this.state.userInfo.User.AvatarUrl}
                    />
                  )}
                </div>
              </div>
              <div className="kt-widget__content">
                <div className="kt-widget__head">
                  <span className="dk-username">{this.state.userInfo.User.SPLatinFullName}</span>
                </div>

                <div className="kt-widget__subhead">
                  <span>{this.state.userInfo.User.EmailAddress} | </span>
                  <span>{this.state.userInfo.User.Department} | </span>
                  <span>{this.state.userInfo.User.ReportedPost}</span>
                </div>
              </div>
            </Grid>
            <Grid item xs={4}>
              <br />
              <Grid>
                <span className="dk-username">:نفراتی که فرم را پر کرده اند</span>
                <span style={{ float: "left" }}>{this.state.userInfo.SurveyProgress} %</span>
                <LinearProgress variant="determinate" value={this.state.userInfo.SurveyProgress} />
                <br />
                {this.state.userInfo.Subordinates.length !== 0 && (
                  <div className="kt-media-group">
                    <span>نیروهای تحت سرپرستی</span>
                    {this.onRenderSubordinates()}
                  </div>
                )}
              </Grid>
            </Grid>
          </Grid>
        </DKPortlet>
      </>
    );
  }
  /******************************************************** */
  private onRenderSubordinates = () => {
    return this.state.userInfo.Subordinates.map((n: SummarySubordinates) => {
      return (
        // <a
        //   href={"#/dashboard/" + n.NominationId}
        //   className="kt-media kt-media--sm kt-media--circle"
        //   data-toggle="kt-tooltip"
        //   data-skin="brand"
        //   data-placement="top"
        //   title=""
        //   data-original-title="John Myer"
        // >
        <a
          onClick={(ev: any) => this.onClickSubOrdinate(n.NominationId)}
          className="kt-media kt-media--md kt-media--circle gradient"
        >
          {n.User.AvatarUrl === null && <span>{n.User.AvatarTextPlaceholder}</span>}
          {n.User.AvatarUrl !== null && <img alt={n.User.Title} src={n.User.AvatarUrl} />}
        </a>
        // </a>
      );
    });
  };
  /****************************************************** */
  private onClickSubOrdinate = (NominationId: number) => {
    this.setState(current => ({
      ...current,
      itemId: NominationId,
    }));
    window.location.href = "#/dashboard/" + NominationId;
  };
}
