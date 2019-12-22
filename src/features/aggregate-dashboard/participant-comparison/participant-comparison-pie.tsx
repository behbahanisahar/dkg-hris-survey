import * as React from "react";
import { Pie } from "react-chartjs-2";
import { statistics } from "../../../entities/aggregate-report/statistics";
import AggregateServices from "../../../services/aggregate-service/aggregate-dashboard-service";

interface IProps {
  reportType: string;
}

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
  public async componentWillReceiveProps(nextProps: any) {
    if (this.props.reportType !== nextProps.reportType) {
      this.getData(nextProps.reportType);
    }
  }
  public async getData(props: string) {
    await this.AggregateServices.getStatistics(props).then(response =>
      this.setState(current => ({
        ...current,
        data: response,
        isFetching: false,
      })),
    );
  }
  public async componentDidMount() {
    this.getData(this.props.reportType);
  }
  public render() {
    const Completed = ((this.state.data.completed / this.state.data.totalNominated) * 100).toFixed(2);
    const unCompleted = ((this.state.data.uncompleted / this.state.data.totalNominated) * 100).toFixed(2);

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
