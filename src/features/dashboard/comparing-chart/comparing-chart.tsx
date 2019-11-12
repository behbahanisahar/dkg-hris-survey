import * as React from "react";
import ReportServices from "../../../services/report-services";
import Util from "../.././../utilities/utilities";
import { DKPortlet } from "../../../core/components/portlet/portlet";
import { Line } from "react-chartjs-2";
import { defaults } from "react-chartjs-2";
interface IProps {
  name?: string;
}
interface IState {
  itemId?: number;
  data: any;
}
export default class DKValueRadarChart extends React.Component<IProps, IState> {
  private ReportServices: ReportServices;
  private util: Util;
  public constructor(props: any) {
    super(props);
    defaults.global.defaultFontFamily = "IRANYekan,Poppins";
    this.ReportServices = new ReportServices();
    this.util = new Util();
    this.state = {
      itemId: 0,
      data: {
        averageValue: 0,
        labels: [],
        datasets: [],
      },
    };
  }
  public async componentDidMount() {
    const itemId = Number(this.util.getQueryStringValue("itemId"));
    const reportData: any = await this.ReportServices.getCompareCompetency(itemId);
    console.log(reportData);
    const data = {
      labels: reportData.labels,
      datasets: reportData.datasets,
    };
    // const data = {
    //   labels: ["January", "February", "March", "April", "May", "June", "July"],
    //   datasets: [
    //     {
    //       label: "My First dataset",
    //       fill: false,
    //       lineTension: 0.1,
    //       backgroundColor: "rgba(75,192,192,0.4)",
    //       borderColor: "rgba(75,192,192,1)",
    //       borderCapStyle: "butt",
    //       borderDash: [],
    //       borderDashOffset: 0.0,
    //       borderJoinStyle: "miter",
    //       pointBorderColor: "rgba(75,192,192,1)",
    //       pointBackgroundColor: "#fff",
    //       pointBorderWidth: 1,
    //       pointHoverRadius: 5,
    //       pointHoverBackgroundColor: "rgba(75,192,192,1)",
    //       pointHoverBorderColor: "rgba(220,220,220,1)",
    //       pointHoverBorderWidth: 2,
    //       pointRadius: 1,
    //       pointHitRadius: 10,
    //       data: [65, 59, 80, 81, 56, 55, 40],
    //     },
    //   ],
    // };

    this.setState(prevState => {
      return {
        ...prevState,
        data,
        itemId,
      };
    });
  }
  public render() {
    // const options = {
    //   scales: {
    //     yAxes: [
    //       {
    //         ticks: {
    //           beginAtZero: false,
    //           min: 1,
    //           max: 5,
    //           stepSize: 1,
    //         },
    //       },
    //     ],
    //     xAxes: [
    //       {
    //         ticks: {
    //           beginAtZero: false,
    //           min: 1,
    //           max: 5,
    //           stepSize: 1,
    //         },
    //       },
    //     ],
    //   },
    // };
    return (
      <DKPortlet title="مقایسه امتیاز شما با سایر رهبران واحد">
        <Line height={60} data={this.state.data} />
      </DKPortlet>
    );
  }
}
