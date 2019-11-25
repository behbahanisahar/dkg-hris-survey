import * as React from "react";
import ReportServices from "../../../services/report-services";

import { DKPortlet } from "../../../core/components/portlet/portlet";
import { Line } from "react-chartjs-2";
import { defaults } from "react-chartjs-2";
import { DKSpinner } from "../../../core/components/spinner/spinner";
interface IProps {
  name?: string;
  match?: any;
  itemId: number;
}
interface IState {
  isFetching: boolean;

  data: any;
}
export default class DKValueRadarChart extends React.Component<IProps, IState> {
  private ReportServices: ReportServices;
  public constructor(props: any) {
    super(props);
    defaults.global.defaultFontFamily = "IRANYekan,Poppins";
    // defaults.global.tooltips.enabled === true;
    this.ReportServices = new ReportServices();
    this.state = {
      isFetching: true,
      data: {
        averageValue: 0,
        labels: [],
        datasets: [],
      },
    };
  }
  public async componentDidMount() {
    await this.ReportServices.getCompareCompetency(this.props.itemId).then(response => {
      const data = {
        labels: response.labels,
        datasets: response.datasets,
      };
      this.setState(current => ({
        ...current,
        data: data,
        isFetching: false,
      }));
    });
  }
  public render() {
    const options = {
      tooltips: {
        enabled: true,
      },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: false,
              stepSize: 1,
              min: 1,
              max: 5,
            },
          },
        ],
        xAxes: [
          {
            ticks: {
              beginAtZero: false,
              stepSize: 1,

              min: 1,
              max: 5,
            },
          },
        ],
      },
    };
    return (
      <DKPortlet title="مقایسه امتیاز شما با سایر رهبران واحد">
        {this.state.isFetching === true && <DKSpinner></DKSpinner>}
        {this.state.isFetching === false && <Line options={options} height={60} data={this.state.data} />}
      </DKPortlet>
    );
  }
}
