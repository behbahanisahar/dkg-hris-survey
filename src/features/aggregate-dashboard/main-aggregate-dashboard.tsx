import * as React from "react";
import ParticipantComparison from "./participant-comparison/participant-comparison";
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
        <ParticipantComparison />
      </div>
    );
  }
}
