import * as React from "react";

import { DKPortlet } from "../../../core/components/portlet/portlet";
import AggregateServices from "../../../services/aggregate-service/aggregate-dashboard-service";
import { statistics } from "../../../entities/aggregate-report/statistics";
import "./participant-comparison.css";
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
    // const data = {
    //   labels: ["Red", "green"],
    //   datasets: [
    //     {
    //       data: [300, 50, 100],
    //       backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
    //       hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
    //     },
    //   ],
    // };
  }
  public render() {
    return <DKPortlet title="Number of Participants" noborder={true}></DKPortlet>;
  }
}
