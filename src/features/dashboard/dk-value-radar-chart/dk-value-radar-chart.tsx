import * as React from "react";
import ReportServices from "../../../services/report-services";
import { DKPortlet } from "../../../core/components/portlet/portlet";
import { Radar } from "react-chartjs-2";
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
export default class ComparingChart extends React.Component<IProps, IState> {
  private ReportServices: ReportServices;
  public constructor(props: any) {
    super(props);
    defaults.global.defaultFontFamily = "IRANYekan,Poppins";
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
    await this.ReportServices.getComparingChartData(this.props.itemId).then(response => {
      const newDataSet = response.datasets.map(
        ({
          backgroundColor,
          borderColor,
          borderWidth,
          data,
          drilldownData,
          hoverBackgroundColor,
          hoverBorderColor,
          items,
          label,
        }) => {
          return {
            label,
            backgroundColor,
            borderColor,
            borderWidth,
            data: data.slice(0, 4),
            drilldownData,
            hoverBackgroundColor,
            hoverBorderColor,
            items,
          };
        },
      );

      const data = {
        labels: response.labels.slice(0, 4),
        datasets: newDataSet,
      };

      this.setState(current => ({
        ...current,
        raters: response,
        isFetching: false,
        data,
      }));
    });
  }

  public render() {
    const options = {
      scale: {
        reverse: false,
        ticks: {
          beginAtZero: false,
          min: 1,
          max: 5,
          stepSize: 1,
        },
        scaleLabel: { fontFamily: "IRANYekan" },
        labels: {
          fontFamily: "IRANYekan",
        },
      },
      legend: {
        labels: {
          fontFamily: "IRANYekan",
        },
        pointLabels: {
          fontFamily: "IRANYekan",
        },
      },
    };
    return (
      <DKPortlet title="امتیازات شما براساس ارزش های دیجی کالا">
        {this.state.isFetching === true && <DKSpinner></DKSpinner>}
        {this.state.isFetching === false && (
          <Radar data={this.state.data} options={options} width={400} height={350}></Radar>
        )}
      </DKPortlet>
    );
  }
}
