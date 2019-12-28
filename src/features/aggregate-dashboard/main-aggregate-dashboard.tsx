import { Grid, MenuItem, Select } from "@material-ui/core";
import * as React from "react";
import { DKPortlet } from "../../core/components/portlet/portlet";
import { DKPortletSummary } from "../../core/components/portlet/summary-portlet";
import { DKSpinner } from "../../core/components/spinner/spinner";
import DashboardInfo from "../../entities/aggregate-report/dashboard-info";
import AggregateServices from "../../services/aggregate-service/aggregate-dashboard-service";
import DropDownModel from "./../../entities/dropdown";
import { AggregateReportProps } from "./aggregate-report-props";
import ClevelParticipation from "./clevel-participation/clevel-participation";
import QuestionComparison from "./comparing-questions/comparing-questions";
import CompetencyAvgComparison from "./competencies-average/competencies-avg-comparison";
import CompetencyCompetency from "./competencies-comparison/competencies-comparison";
import HeatMap from "./heatmap/heatmap";
import MainSummary from "./main-summary/main-summary";
import RadarCoreValue from "./radar-corevalue/radar-coreValue";
import avatar from "./../../assets/img/DefaultAvatar.png";
import "./aggregate-dashboard.css";
import TotalLeaders from "./number-of-leaders/num-of-leaders";
import CompetencyAvgRate from "./competency-avg-rate/competency-avg-rate";
interface IProps {
  match: any;
}
interface IState {
  reportProps: AggregateReportProps;
  isFetching: boolean;
  reportType: number;
  reportTypeText: string;
  dashboardInfo: DashboardInfo;
  reportTypes: DropDownModel[];
}
export default class MainAggregateDashboard extends React.Component<IProps, IState> {
  private AggregateServices: AggregateServices;
  public constructor(props: any) {
    super(props);
    this.AggregateServices = new AggregateServices();
    this.state = {
      reportProps: {
        level: "",
        viewAs: "",
      },
      isFetching: true,
      reportType: 1,
      reportTypes: [],
      reportTypeText: "clevel",
      dashboardInfo: {
        dropdownValues: [],
        title: "",
        userClevel: "",
      },
    };
  }

  public async componentDidMount() {
    document.getElementsByClassName("kt-container")[0].className = "dashboardContainer";
    document.title = "Digikala - 360-Degree Dashboard";

    await this.getInfoData();
  }

  public async getInfoData() {
    let username = this.props.match != undefined ? this.props.match.params.username : "";
    if (username == null) username = "";

    await this.AggregateServices.getInfo(username).then(response => {
      this.setState(prevState => {
        return {
          ...prevState,
          isFetching: false,
          dashboardInfo: response,
          reportProps: {
            level: response.dropdownValues[0]?.text,
            viewAs: username,
          },
          reportTypes: response.dropdownValues,
          reportTypeText: response.dropdownValues[0]?.text,
        };
      });
    });
  }

  public render() {
    return (
      <div className="ltr">
        {this.state.isFetching === true && <DKSpinner></DKSpinner>}
        {this.state.isFetching === false && (
          <>
            <Grid container spacing={3} className="mt-4">
              <Grid item xs={3} sm={3}></Grid>
            </Grid>
            <Grid container spacing={3} className="mt-4">
              <Grid item xs={3} sm={3}>
                {/* <DashboardSummary viewAs={this.state.reportProps.viewAs} level={this.state.reportProps.level} /> */}
                <DKPortletSummary background="#F05B71" title=" 360̊ Feedback Aggregate Report">
                  <div style={{ color: "black" }} className="kt-widget17__items">
                    <div className="kt-widget17__item">
                      <Grid container>
                        <Grid item xs={3} sm={3}>
                          <div className=".kt-widget.kt-widget--user-profile-3 .kt-widget__top .kt-widget__media">
                            <img style={{ width: "60px", borderRadius: "8px", float: "left" }} src={avatar} />
                          </div>
                        </Grid>
                        <Grid item xs={9} sm={9}>
                          <div className="kt-widget__content">
                            <div className="head">
                              <p className="kt-widget__username">Saeid Mohammadi</p>
                            </div>
                            <div className="sub-head">s.mohammadi@digikala.com / CEO</div>
                          </div>
                        </Grid>
                      </Grid>
                    </div>
                  </div>
                  <div style={{ color: "black", textAlign: "center" }} className="kt-widget17__items"></div>
                  <div style={{ color: "black", textAlign: "center" }} className="kt-widget17__items">
                    <div className="kt-widget17__item">
                      {this.state.dashboardInfo.dropdownValues.length > 1 && (
                        <Select
                          margin="dense"
                          dir="ltr"
                          value={this.state.reportType}
                          fullWidth={true}
                          onChange={event => this.onChangeFields(event)}
                          inputProps={{
                            name: "ReportType",
                            id: "demo-controlled-open-select",
                          }}
                          variant="outlined"
                        >
                          {this.renderDropDown(this.state.reportTypes)}
                        </Select>
                      )}
                      <h4>Level Of Leaders</h4>
                      <span>{this.state.dashboardInfo.title}</span>
                    </div>
                  </div>
                </DKPortletSummary>
              </Grid>
              <Grid item xs={9} sm={9}>
                <MainSummary viewAs={this.state.reportProps.viewAs} level={this.state.reportProps.level} />
              </Grid>
            </Grid>
            {this.state.reportProps.level == "All" && (
              <Grid container spacing={3} className="mt-4">
                <Grid item xs={9} sm={5}>
                  <CompetencyAvgComparison
                    viewAs={this.state.reportProps.viewAs}
                    level={this.state.reportProps.level}
                  />
                </Grid>
                <Grid item xs={6} sm={3}>
                  <ClevelParticipation viewAs={this.state.reportProps.viewAs} level={this.state.reportProps.level} />
                </Grid>
                <Grid item xs={6} sm={4}>
                  <CompetencyAvgRate viewAs={this.state.reportProps.viewAs} level={this.state.reportProps.level} />
                </Grid>
              </Grid>
            )}
            <Grid container spacing={3} className="mt-4">
              <Grid item xs={6} sm={8}>
                <CompetencyCompetency viewAs={this.state.reportProps.viewAs} level={this.state.reportProps.level} />
              </Grid>
              <Grid item xs={6} sm={4}>
                <RadarCoreValue viewAs={this.state.reportProps.viewAs} level={this.state.reportProps.level} />
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12}>
                <TotalLeaders />
              </Grid>
            </Grid>
            <Grid container spacing={3} className="mt-4">
              <Grid item xs={6} sm={6}>
                <DKPortlet title="Top5 / Strengths">
                  <QuestionComparison
                    viewAs={this.state.reportProps.viewAs}
                    level={this.state.reportProps.level}
                    comparingType="top"
                  />
                </DKPortlet>
              </Grid>
              <Grid item xs={6} sm={6}>
                <DKPortlet title="Bottom5 / Improvement Areas">
                  <QuestionComparison
                    viewAs={this.state.reportProps.viewAs}
                    level={this.state.reportProps.level}
                    comparingType="bottom"
                  />
                </DKPortlet>
              </Grid>
            </Grid>

            <Grid container spacing={3} className="mt-4">
              <HeatMap viewAs={this.state.reportProps.viewAs} level={this.state.reportProps.level} />
            </Grid>
          </>
        )}
      </div>
    );
  }

  private onChangeFields = (event: any): void => {
    this.setState(prevState => {
      return {
        ...prevState,
        reportProps: {
          ...prevState.reportProps,
          level: event.nativeEvent.target.outerText,
        },
      };
    });
    console.log(this.state.reportProps.level);
  };

  public renderDropDown = (items: any[]): JSX.Element[] => {
    return items.map(item => {
      return (
        <MenuItem value={item.key} key={item.key}>
          {item.text}
        </MenuItem>
      );
    });
  };
}
