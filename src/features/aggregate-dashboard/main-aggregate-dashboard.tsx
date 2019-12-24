import { Grid, MenuItem, Select } from "@material-ui/core";
import * as React from "react";
import { DKPortlet } from "../../core/components/portlet/portlet";
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
import ParticipantComparison from "./participant-comparison/participant-comparison";
import ParticipantComparisonPie from "./participant-comparison/participant-comparison-pie";
import ParticipantComparisonSummary from "./participant-comparison/participant-comparison-summary";
import RadarCoreValue from "./radar-corevalue/radar-coreValue";

import ParticipantComparisonSummary from "./participant-comparison/participant-comparison-summary";
import TotalParticipant from "./total-participant/total-participant";
import OverallImprovement from "./overall-improvement/overall-improvement";
import DashboardSummary from "./dashboard-summary/dashboard-summary";
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
        <Grid container spacing={3} className="mt-4">
          <Grid item xs={3} sm={3}>
            {this.state.dashboardInfo.dropdownValues !== undefined && (
              <Select
                margin="dense"
                dir="ltr"
                value={this.state.reportType}
                fullWidth={true}
                onChange={event => this.onChangeFields("reportTypeText", "reportType", event)}
                inputProps={{
                  name: "ReportType",
                  id: "demo-controlled-open-select",
                }}
                // IconComponent={KeyboardArrowDown}
                variant="outlined"
              >
                {this.renderDropDown(this.state.ReportTypes)}
              </Select>
            )}
          </Grid>
        </Grid>
        <Grid container spacing={3} className="mt-4">
          <Grid item xs={3} sm={3}>
            <DashboardSummary reportType={this.state.reportTypeText} />
          </Grid>
          <Grid item xs={3} sm={3}>
            <TotalParticipant reportType={this.state.reportTypeText} />
          </Grid>
          <Grid item xs={3} sm={3}>
            <OverallImprovement reportType={this.state.reportTypeText} />{" "}
          </Grid>
          <Grid item xs={3} sm={3}>
            {" "}
            <ParticipantComparisonSummary reportType={this.state.reportTypeText} />
          </Grid>
        </Grid>
        <Grid container spacing={3} className="mt-4">
          <Grid item xs={6} sm={6}>
            <DKPortlet title="Number of Assessors">
              <ParticipantComparisonPie reportType={this.state.reportTypeText} />
              <ParticipantComparison reportType={this.state.reportTypeText} />
            </DKPortlet>
          </Grid>
          <Grid item xs={6} sm={6}>
            <ClevelParticipation reportType={this.state.reportTypeText} />
          </Grid>
        </Grid>
        <Grid container spacing={3} className="mt-4">
          <Grid item xs={6} sm={8}>
            <CompetencyCompetency reportType={this.state.reportTypeText} />
          </Grid>
          <Grid item xs={6} sm={4}>
            <RadarCoreValue reportType={this.state.reportTypeText} />
          </Grid>
        </Grid>
        <Grid container spacing={3} className="mt-4">
          <Grid item xs={6} sm={6}>
            <DKPortlet title="Top5-Strengths">
              <QuestionComparison reportType={this.state.reportTypeText} comparingType="top" />
            </DKPortlet>
          </Grid>
          <Grid item xs={6} sm={6}>
            <DKPortlet title="Bottom5-Improvement Areas">
              <QuestionComparison reportType={this.state.reportTypeText} comparingType="bottom" />
            </DKPortlet>
          </Grid>
        </Grid>

        <Grid container spacing={3} className="mt-4">
          <HeatMap reportType={this.state.reportTypeText} />
        </Grid>
        <Grid container spacing={3} className="mt-4">
          {this.state.reportTypeText === "All" && (
            <Grid item xs={12} sm={12}>
              <CompetencyAvgComparison reportType={this.state.reportTypeText} />
            </Grid>
            <Grid container spacing={3} className="mt-4">
              <Grid item xs={6} sm={6}>
                <DKPortlet title="Top5-Strengths">
                  <QuestionComparison
                    viewAs={this.state.reportProps.viewAs}
                    level={this.state.reportProps.level}
                    comparingType="top"
                  />
                </DKPortlet>
              </Grid>
              <Grid item xs={6} sm={6}>
                <DKPortlet title="Bottom5-Improvement Areas">
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
            <Grid container spacing={3} className="mt-4">
              {this.state.reportTypeText === "All" && (
                <Grid item xs={12} sm={12}>
                  <CompetencyAvgComparison reportType={this.state.reportTypeText} />
                </Grid>
              )}
            </Grid>
          </>
        )}
      </div>
    );
  }

  private onChangeFields = (Field: string, key: string, event: any): void => {
    this.setState(prevState => {
      return {
        ...prevState,
        [Field]: event.nativeEvent.target.outerText,
        [key]: event.target.value,
      };
    });
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
