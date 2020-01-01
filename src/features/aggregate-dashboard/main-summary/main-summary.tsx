import * as React from "react";
import { DKSpinner } from "../../../core/components/spinner/spinner";
import { statistics } from "../../../entities/aggregate-report/statistics";
import AggregateServices from "../../../services/aggregate-service/aggregate-dashboard-service";
import { AggregateReportProps } from "../aggregate-report-props";

import ParticipantComparisonSummary from "../participant-comparison/participant-comparison-summary";
import { Grid } from "@material-ui/core";
import OverallImprovement from "../overall-improvement/overall-improvement";

interface IState {
  data: statistics;
  isFetching: boolean;
}
export default class MainSummary extends React.Component<AggregateReportProps, IState> {
  private AggregateServices: AggregateServices;
  public constructor(props: any) {
    super(props);
    this.AggregateServices = new AggregateServices();
    this.state = {
      isFetching: true,
      data: {
        completed: 0,
        uncompleted: 0,
        totalNominated: 0,
        participationRate: 0,
        overallImprovement: 0,
        total98Score: 0,
        total97Score: 0,
        numberOfAsseses: 0,
      },
    };
  }

  public async componentWillReceiveProps(nextProps: AggregateReportProps) {
    this.getData(nextProps);
  }

  public async getData(props: AggregateReportProps) {
    this.setState(current => ({
      ...current,
      isFetching: true,
    }));
    await this.AggregateServices.getStatistics(props).then(response =>
      this.setState(prevState => {
        return {
          ...prevState,

          data: response,
          isFetching: false,
        };
      }),
    );
  }

  public async componentDidMount() {
    this.getData(this.props);
  }
  public render() {
    return (
      <div>
        {this.state.isFetching === true && <DKSpinner></DKSpinner>}
        {this.state.isFetching === false && (
          <Grid container spacing={3}>
            {/* <Grid item xs={4} sm={4}>
              <TotalParticipant data={this.state.data} viewAs={this.props.viewAs} level={this.props.level} />
            </Grid> */}
            {/* <Grid item xs={4} sm={4}>
              <OverallImprovement data={this.state.data} viewAs={this.props.viewAs} level={this.props.level} />
            </Grid> */}
            <Grid item xs={8} sm={8}>
              <ParticipantComparisonSummary
                data={this.state.data}
                viewAs={this.props.viewAs}
                level={this.props.level}
                subDepLevel={this.props.subDepLevel}
                depLevel={this.props.depLevel}
              />
            </Grid>
            <Grid item xs={4} sm={4}>
              <OverallImprovement
                subDepLevel={this.props.subDepLevel}
                depLevel={this.props.depLevel}
                data={this.state.data}
                viewAs={this.props.viewAs}
                level={this.props.level}
              />
            </Grid>
          </Grid>
        )}
      </div>
    );
  }
}
