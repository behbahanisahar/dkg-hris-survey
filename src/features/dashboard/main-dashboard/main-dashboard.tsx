import * as React from "react";
import ReportServices from "../../../services/report-services";
import { Grid } from "@material-ui/core";
import RatersTable from "../raters-table/raters-table";
import ComparingChart from "../comparing-chart/comparing-chart";
import DKValueRadarChart from "../dk-value-radar-chart/dk-value-radar-chart";
import CompetencySummaryClass from "../competency-summary/competency-summary";
import Comments from "../comments/comments";
import IndexReport from "../index";
import UkIcon from "../../../assets/img/en.png";
import IRIcon from "../../../assets/img/fa.png";
import DashboardHeader from "../dashboard-header/dashboard-header";
import Authentication from "../../authentication/authentication";

import "./main-dashboard.css";

interface IProps {
  match: any;
}
interface IState {
  hasAccess: boolean;
  itemId: number;
  lang: string;
  isFetched: boolean;
}
export default class MainDashboard extends React.Component<IProps, IState> {
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
    const itemId = nextProps.match.params.itemId;
    this.setState(current => ({
      ...current,
      itemId: itemId,
    }));
  }

  public async componentDidMount() {
    const itemId = this.props.match.params.itemId;
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
                  <Grid container spacing={3} className="mt-4">
                    <Grid item xs={12} sm={12}>
                      {/* <DashboardIntro></DashboardIntro> */}
                    </Grid>
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
