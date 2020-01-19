import * as React from "react";
import { Doughnut } from "react-chartjs-2";
import { DKSpinner } from "../../../../core/components/spinner/spinner";
import { statistics } from "../../../../entities/aggregate-report/statistics";

import { AggregateReportProps } from "../aggregate-report-props";

interface IState {
  isFetching: boolean;
}
interface IProps {
  data: statistics;
}
export default class ParticipantComparisonPie extends React.Component<IProps & AggregateReportProps, IState> {
  public constructor(props: any) {
    super(props);

    this.state = {
      isFetching: true,
    };
  }

  public async componentWillReceiveProps(nextProps: AggregateReportProps) {
    this.getData(nextProps);
  }

  public async getData(props: AggregateReportProps) {
    this.setState(current => ({
      ...current,
      isFetching: false,
    }));
  }
  public async componentDidMount() {
    this.getData(this.props);
  }
  public render() {
    const Completed = ((this.props.data.completed / this.props.data.totalNominated) * 100).toFixed(2);
    const unCompleted = ((this.props.data.uncompleted / this.props.data.totalNominated) * 100).toFixed(2);

    const Piedata = {
      labels: ["Completed", "UnCompleted"],
      datasets: [
        {
          data: [Completed, unCompleted],
          backgroundColor: ["#19BFD3", "#EF394E"],
          hoverBackgroundColor: ["#19BFD3", "#EF394E"],
        },
      ],
    };
    return (
      <div>
        {this.state.isFetching === true && <DKSpinner></DKSpinner>}
        {this.state.isFetching === false && (
          <Doughnut
            options={{
              responsive: true,
              maintainAspectRatio: true,
              weight: 2,
            }}
            data={Piedata}
          />
        )}
      </div>
    );
  }
}
