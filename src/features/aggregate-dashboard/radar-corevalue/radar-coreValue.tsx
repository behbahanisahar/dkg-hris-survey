// import "chartjs-plugin-datalabels";
import * as React from "react";
import { Radar } from "react-chartjs-2";
import { DKPortlet } from "../../../core/components/portlet/portlet";
import { DKSpinner } from "../../../core/components/spinner/spinner";
import RadarCoreValues from "../../../entities/aggregate-report/core-calues-radar";
import AggregateServices from "../../../services/aggregate-service/aggregate-dashboard-service";
import { AggregateReportProps } from "../aggregate-report-props";

interface IState {
  data: RadarCoreValues;
  isFetching: boolean;
}
export default class RadarCoreValue extends React.Component<AggregateReportProps, IState> {
  private AggregateServices: AggregateServices;
  public constructor(props: any) {
    super(props);
    this.AggregateServices = new AggregateServices();
    this.state = {
      isFetching: true,
      data: {
        averageValue: 5,
        labels: [],
        datasets: [],
      },
    };
  }

  public async componentWillReceiveProps(nextProps: AggregateReportProps) {
    if (JSON.stringify(nextProps) !== JSON.stringify(this.props)) {
      this.getData(nextProps);
    }
  }

  public async getData(props: AggregateReportProps) {
    this.setState(current => ({
      ...current,
      isFetching: true,
    }));
    await this.AggregateServices.getRadarCoreValues(props).then(response => {
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
        averageValue: Number(response.averageValue.toFixed(2)),
      };
      this.setState(prevState => {
        return {
          ...prevState,

          data,
          isFetching: false,
        };
      });
    });
  }
  public async componentDidMount() {
    this.getData(this.props);
  }
  public render() {
    const options = {
      plugins: {
        datalabels: {
          display: false,
          clamp: false,
          color: "#404244",
          font: {
            size: 12,
            weight: 500,
          },
          align: "start",
        },
      },
      scale: {
        reverse: false,
        ticks: {
          //display: false,
          beginAtZero: false,
          min: 0,
          max: 5,
          stepSize: 1,
        },
      },
    };
    return (
      <DKPortlet title="Results based on DK Core Values">
        {this.state.isFetching === true && <DKSpinner></DKSpinner>}
        {this.state.isFetching === false && (
          <Radar data={this.state.data} options={options} width={450} height={350}></Radar>
        )}
      </DKPortlet>
    );
  }
}
