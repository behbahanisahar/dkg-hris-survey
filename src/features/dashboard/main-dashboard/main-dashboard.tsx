import * as React from "react";
import ReportServices from "../../../services/report-services";
import { Grid } from "@material-ui/core";
import RatersTable from "../raters-table/raters-table";
import ComparingChart from "../comparing-chart/comparing-chart";
import DKValueRadarChart from "../dk-value-radar-chart/dk-value-radar-chart";
import ResponsiveBulletClass from "../competency-summary-category-detail/competency-category";
import Comments from "../comments/comments";
import IndexReport from "../index";
import UkIcon from "../../../assets/img/UK.png";
import IRIcon from "../../../assets/img/IR.png";
import DashboardHeader from "../dashboard-header/dashboard-header";
import Authentication from "../../authentication/authentication";

interface IProps {
  match: any;
}
interface IState {
  hasAccess: boolean;
  itemId: number;
  lang: string;
}
export default class MainDashboard extends React.Component<IProps, IState> {
  private ReportServices: ReportServices;
  public constructor(props: any) {
    super(props);
    this.ReportServices = new ReportServices();
    this.state = {
      hasAccess: false,
      itemId: 0,
      lang: "IR",
    };
  }
  public async componentWillReceiveProps(nextProps: any) {
    const itemId = nextProps.match.params.itemId;
    console.log(nextProps);
    console.log(itemId);

    this.setState(current => ({
      ...current,
      itemId: itemId,
    }));
  }

  public async componentDidMount() {
    const itemId = this.props.match.params.itemId;
    await this.ReportServices.getReportAuthentication(itemId).then(response => {
      this.setState(current => ({
        ...current,
        hasAccess: response.HasAccess,
        itemId: response.ItemId,
      }));
    });
  }
  public render() {
    const hasNoAccess: number = 401;
    return (
      <div>
        {this.state.hasAccess && (
          <div>
            <Grid style={{ marginRight: "80%" }}>
              <span className="kt-header__topbar-icon">
                <img style={{ width: "38px" }} src={UkIcon} onClick={(ev: any) => this.onChangeLang("UK")}></img>
                <img style={{ width: "38px" }} src={IRIcon} onClick={(ev: any) => this.onChangeLang("IR")}></img>
              </span>
            </Grid>
            <div className={this.state.lang === "IR" ? "rtl" : "ltr"}>
              <DashboardHeader lang={this.state.lang} itemId={this.state.itemId} />
              <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
                  {/* <DashboardIntro></DashboardIntro> */}
                </Grid>
                <Grid item xs={4}>
                  <RatersTable lang={this.state.lang} itemId={this.state.itemId} />
                </Grid>
                <Grid item xs={8}>
                  <ResponsiveBulletClass lang={this.state.lang} itemId={this.state.itemId} />
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
        {!this.state.hasAccess && <Authentication status={hasNoAccess} />}
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
