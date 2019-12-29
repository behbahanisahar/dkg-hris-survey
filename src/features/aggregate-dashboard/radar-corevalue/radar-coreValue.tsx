import * as React from "react";
import { Radar } from "react-chartjs-2";

import AggregateServices from "../../../services/aggregate-service/aggregate-dashboard-service";
import RadarCoreValues from "../../../entities/aggregate-report/core-calues-radar";
import { DKPortlet } from "../../../core/components/portlet/portlet";
import { DKSpinner } from "../../../core/components/spinner/spinner";
import "chartjs-plugin-datalabels";
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
    this.getData(nextProps);
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
      scale: {
        reverse: false,
        ticks: {
          beginAtZero: false,
          min: 0,
          max: 5,
          stepSize: 1,
        },
        scaleLabel: { fontFamily: "IRANYekan" },
        labels: {
          fontFamily: "IRANYekan",
        },
      },
      // legend: {
      //   labels: {
      //     fontFamily: "IRANYekan",
      //   },
      //   pointLabels: {
      //     fontFamily: "IRANYekan",
      //     anchor: "start",
      //     align: "right",
      //   },
      // },
      // datalabels: {
      //   //  anchor: "start",
      //   //   clamp: true,
      //   align: "right",
      //   Rotation: "10",
      // },
      datalabels: {
        anchor: "end",
        backgroundColor: null,
        borderColor: null,
        borderRadius: 4,
        borderWidth: 1,
        color: "#223388",
        font: {
          size: 11,
          weight: 600,
        },
        offset: 4,
        padding: 0,
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
