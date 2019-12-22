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
interface IProps {}
interface IState {
  reportType: number;
  reportTypeText: string;
}
export default class MainAggregateDashboard extends React.Component<IProps, IState> {
  public constructor(props: any) {
    super(props);
    this.state = {
      reportType: 1,
      reportTypeText: "clevel",
    };
  }

  public async componentDidMount() {
    document.title = "DKDashboard";
  }
  public render() {
    console.log(this.state.reportTypeText);
    const ReportTypes = [
      {
        key: 1,
        text: "clevel",
      },
      {
        key: 2,
        text: "all",
      },
      {
        key: 3,
        text: "cto",
      },
      {
        key: 4,
        text: "chro",
      },
    ];
    return (
      <div className="ltr">
        <Grid container spacing={3} className="mt-4">
          <Grid item xs={3} sm={3}>
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
              {this.renderDropDown(ReportTypes)}
            </Select>
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
          <Grid item xs={6} sm={6}>
            <CompetencyCompetency reportType={this.state.reportTypeText} />
          </Grid>
          <Grid item xs={6} sm={6}>
            <DKPortlet hasHeader={false}>
              <QuestionComparison reportType={this.state.reportTypeText} comparingType="top" />

              <QuestionComparison reportType={this.state.reportTypeText} comparingType="bottom" />
            </DKPortlet>
          </Grid>
        </Grid>
        <Grid container spacing={3} className="mt-4">
          <HeatMap reportType={this.state.reportTypeText} />
        </Grid>
        <Grid container spacing={3} className="mt-4">
          <Grid item xs={6} sm={6}>
            <RadarCoreValue reportType={this.state.reportTypeText} />
          </Grid>
          <Grid item xs={6} sm={6} />
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
