import { Grid } from "@material-ui/core";
import * as React from "react";
import UkIcon from "../../../../assets/img/en.png";
import IRIcon from "../../../../assets/img/fa.png";
import ReportServices from "../../../../services/report-services";
import Authentication from "../../../authentication/authentication";
import Comments from "../comments/comments";
import ComparingChart from "../comparing-chart/comparing-chart";
import CompetencySummaryClass from "../competency-summary/competency-summary";
import DashboardHeader from "../dashboard-header/dashboard-header";
import DKValueRadarChart from "../dk-value-radar-chart/dk-value-radar-chart";
import IndexReport from "../index/index";
import RatersTable from "../raters-table/raters-table";
import "./individual-dashboard.css";
import DKSVGIcon from "../../../../core/components/svg-icon/svg-icon";

interface IProps {
  username?: string;
  itemId?: number;
  match?: any;
}
interface IState {
  hasAccess: boolean;
  itemId: number;
  lang: string;
  isFetched: boolean;
}
export default class IndividualDashboard extends React.Component<IProps, IState> {
  private ReportServices: ReportServices;
  public constructor(props: any) {
    super(props);
    this.ReportServices = new ReportServices();
    this.state = {
      hasAccess: false,
      itemId: 0,
      isFetched: false,
      lang: "fa",
    };
  }
  public async componentWillReceiveProps(nextProps: any) {
    const itemId = nextProps.itemId;
    this.setState(current => ({
      ...current,
      itemId: itemId,
    }));
  }

  public async componentDidMount() {
    const itemId = this.props.itemId || this.props.match.params.itemId;
    document.title = "Dashboard";
    document.getElementById("root")!.className = "bg-header";
    await this.ReportServices.getReportAuthentication(itemId).then(response => {
      this.setState(current => ({
        ...current,
        hasAccess: response.hasAccess,
        itemId: response.itemId,
        isFetched: true,
      }));
    });
  }
  public render() {
    const unauthorizedStatusCode: number = 401;
    return (
      <div>
        {this.state.isFetched === true && (
          <div>
            {this.state.hasAccess && (
              <div className={this.state.lang === "fa" ? "rtl" : "ltr"}>
                {this.state.lang === "en" && (
                  <div className="alert alert-elevate alert-light">
                    <div className="alert-icon p-0 pl-2">
                      <DKSVGIcon iconName="Info-circle" color="red" width="24px" height="24px"></DKSVGIcon>
                    </div>
                    <div className="alert-text">
                      This report is <b className="dk-brand-text-red">confidential</b> and it is only shared with the
                      assessee and his/her managers with the intention of supporting the individual on performing the
                      development programs.
                    </div>
                  </div>
                )}
                {this.state.lang === "fa" && (
                  <div className="alert alert-elevate alert-light">
                    <div className="alert-icon p-0 px-2">
                      <DKSVGIcon iconName="Info-circle" color="red" width="24px" height="24px"></DKSVGIcon>
                    </div>
                    <div className="alert-text">
                      این گزارش <b className="dk-brand-text-red">محرمانه</b> می باشد، فقط ارزیابی شونده و مدیران وی با
                      هدف حمایت از اجرای برنامه های توسعه ای مرتبط، در جریان آن قرار خواهند گرفت.
                    </div>
                  </div>
                )}
                <div className={this.state.lang === "fa" ? "mb-1 text-right" : "mb-1 text-left"}>
                  <img
                    className="mx-2 pointer"
                    alt="en"
                    src={UkIcon}
                    onClick={(ev: any) => this.onChangeLang("en")}
                  ></img>
                  <img
                    className="mx-2 pointer"
                    alt="fa"
                    src={IRIcon}
                    onClick={(ev: any) => this.onChangeLang("fa")}
                  ></img>
                </div>
                <div>
                  <DashboardHeader lang={this.state.lang} itemId={this.state.itemId} />
                  <Grid container spacing={3} className="mt-2">
                    <Grid item xs={4}>
                      <RatersTable lang={this.state.lang} itemId={this.state.itemId} />
                    </Grid>
                    <Grid item xs={8}>
                      <CompetencySummaryClass lang={this.state.lang} itemId={this.state.itemId} />
                    </Grid>
                    <Grid item xs={8}>
                      <IndexReport lang={this.state.lang} itemId={this.state.itemId} />
                    </Grid>
                    <Grid item xs={4}>
                      <DKValueRadarChart lang={this.state.lang} itemId={this.state.itemId} />
                    </Grid>
                    <Grid item xs={12}>
                      <ComparingChart lang={this.state.lang} itemId={this.state.itemId} />
                    </Grid>
                    <Grid item xs={12}>
                      <Comments lang={this.state.lang} itemId={this.state.itemId} />
                    </Grid>
                  </Grid>
                </div>
              </div>
            )}
            {!this.state.hasAccess && <Authentication status={unauthorizedStatusCode} />}
          </div>
        )}
      </div>
    );
  }
  /********************************************************* */
  private onChangeLang = (lang: string) => {
    this.setState(current => ({
      ...current,
      lang,
    }));
  };
}
