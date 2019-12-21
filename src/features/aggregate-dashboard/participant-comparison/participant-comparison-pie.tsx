import * as React from "react";

import AggregateServices from "../../../services/aggregate-service/aggregate-dashboard-service";
import { statistics } from "../../../entities/aggregate-report/statistics";
import { Pie } from "react-chartjs-2";
interface IProps {}

interface IState {
  data: statistics;
  isFetching: boolean;
}
export default class ParticipantComparisonPie extends React.Component<IProps, IState> {
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
      },
    };
  }

  public async componentDidMount() {
    await this.AggregateServices.getStatistics("Clevel").then(response =>
      this.setState(current => ({
        ...current,
        data: response,
        isFetching: false,
      })),
    );
  }
  public render() {
    const Completed = ((this.state.data.completed / this.state.data.totalNominated) * 100).toFixed(2);
    const unCompleted = ((this.state.data.uncompleted / this.state.data.totalNominated) * 100).toFixed(2);
    console.log(Completed);
    console.log(unCompleted);
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
    return <Pie data={Piedata} />;
  }
}
