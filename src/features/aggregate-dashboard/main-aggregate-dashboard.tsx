import * as React from "react";

import { Grid, Select, MenuItem } from "@material-ui/core";

import CompetencyCompetency from "./competencies-comparison/competencies-comparison";
import ParticipantComparisonPie from "./participant-comparison/participant-comparison-pie";
import ClevelParticipation from "./clevel-participation/clevel-participation";
import ParticipantComparison from "./participant-comparison/participant-comparison";
import QuestionComparison from "./comparing-questions/comparing-questions";
import { DKPortlet } from "../../core/components/portlet/portlet";
import HeatMap from "./heatmap/heatmap";
import RadarCoreValue from "./radar-corevalue/radar-coreValue";
import CompetencyAvgComparison from "./competencies-average/competencies-avg-comparison";
import AggregateServices from "../../services/aggregate-service/aggregate-dashboard-service";
import DashboardInfo from "../../entities/aggregate-report/dashboard-info";
import DropDownModel from "./../../entities/dropdown";
interface IProps {
  match: any;
}
interface IState {
  reportType: number;
  reportTypeText: string;
  dashboardInfo: DashboardInfo;
  ReportTypes: DropDownModel[];
}
export default class MainAggregateDashboard extends React.Component<IProps, IState> {
  private AggregateServices: AggregateServices;
  public constructor(props: any) {
    super(props);
    this.AggregateServices = new AggregateServices();
    this.state = {
      reportType: 1,
      ReportTypes: [],
      reportTypeText: "clevel",
      dashboardInfo: {
        dropdownValues: [],
        userClevel: "",
      },
    };
  }

  public async componentDidMount() {
    //  const myelement = document.getElementsByClassName("kt-container") as HTMLCollectionOf<HTMLElement>;
    document.getElementsByClassName("kt-container")[0].className = "dashboardContainer";
    document.title = "DKDashboard";
    let username = this.props.match != undefined ? this.props.match.params.username : "";
    if (username == null) username = "";
    await this.AggregateServices.getInfo(username).then(response => {
      this.setState(prevState => {
        return {
          ...prevState,
          dashboardInfo: response,
        };
      });
    });
    if (this.state.dashboardInfo.dropdownValues !== undefined) {
      this.setState(prevState => {
        return {
          ...prevState,
          ReportTypes: this.state.dashboardInfo.dropdownValues,
        };
      });
    } else {
      this.setState(prevState => {
        return {
          ...prevState,
          reportTypeText: this.state.dashboardInfo.userClevel,
        };
      });
    }
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
          <Grid item xs={6} sm={6}>
            <DKPortlet title="Number of Participants">
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
            <DKPortlet hasHeader={false}>
              <QuestionComparison reportType={this.state.reportTypeText} comparingType="top" />
            </DKPortlet>
          </Grid>
          <Grid item xs={6} sm={6}>
            <DKPortlet hasHeader={false}>
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
          )}
        </Grid>
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
