import * as React from "react";
import ReportServices from "../../../services/report-services";
import { Grid } from "@material-ui/core";
import RatersTable from "../raters-table/raters-table";
import ComparingChart from "../comparing-chart/comparing-chart";
import DKValueRadarChart from "../dk-value-radar-chart/dk-value-radar-chart";
import ResponsiveBulletClass from "../competency-summary-category-detail/competency-category";
import Comments from "../comments/comments";
import IndexReport from "../index";

import DashboardHeader from "../dashboard-header/dashboard-header";
import Authentication from "../../authentication/authentication";

interface IProps {
  match: any;
}
interface IState {
  hasAccess: boolean;
  itemId: number;
}
export default class MainDashboard extends React.Component<IProps, IState> {
  private ReportServices: ReportServices;
  public constructor(props: any) {
    super(props);
    this.ReportServices = new ReportServices();
    this.state = {
      hasAccess: false,
      itemId: 0,
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
          <div className="rtl">
            <DashboardHeader itemId={this.state.itemId} />
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12}>
                {/* <DashboardIntro></DashboardIntro> */}
              </Grid>
              <Grid item xs={4}>
                <RatersTable itemId={this.state.itemId} />
              </Grid>
              <Grid item xs={8}>
                <ResponsiveBulletClass itemId={this.state.itemId} />
              </Grid>
              <Grid item xs={8}>
                <IndexReport itemId={this.state.itemId} />
              </Grid>
              <Grid item xs={4}>
                <DKValueRadarChart itemId={this.state.itemId} />
              </Grid>
              <Grid item xs={12}>
                <ComparingChart itemId={this.state.itemId} />
              </Grid>
              <Grid item xs={12}>
                <Comments itemId={this.state.itemId} />
              </Grid>
            </Grid>
          </div>
        )}
        {!this.state.hasAccess && <Authentication status={hasNoAccess} />}
      </div>
    );
  }
}
