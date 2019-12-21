import * as React from "react";
import ParticipantComparison from "./participant-comparison/participant-comparison";
import ClevelParticipation from "./clevel-participation/clevel-participation";
import { Grid } from "@material-ui/core";
import ParticipantComparisonPie from "./participant-comparison/participant-comparison-pie";
interface IProps {}
interface IState {}
export default class MainAggregateDashboard extends React.Component<IProps, IState> {
  public constructor(props: any) {
    super(props);
  }

  public async componentDidMount() {
    document.title = "DKDashboard";
  }
  public render() {
    return (
      <div>
        <Grid container spacing={3} className="mt-4">
          <Grid item xs={6} sm={6}>
            <ParticipantComparisonPie />
            <ParticipantComparison />
          </Grid>
          <Grid item xs={6} sm={6}>
            <ClevelParticipation />
          </Grid>
        </Grid>
      </div>
    );
  }
}
