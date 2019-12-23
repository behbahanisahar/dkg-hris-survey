import * as React from "react";
import { Radar } from "react-chartjs-2";

import AggregateServices from "../../../services/aggregate-service/aggregate-dashboard-service";
import RadarCoreValues from "../../../entities/aggregate-report/core-calues-radar";
import { DKPortlet } from "../../../core/components/portlet/portlet";
import { DKSpinner } from "../../../core/components/spinner/spinner";

interface IProps {
  reportType: string;
}

interface IState {
  data: RadarCoreValues;
  isFetching: boolean;
}
export default class RadarCoreValue extends React.Component<IProps, IState> {
  private AggregateServices: AggregateServices;
  public constructor(props: any) {
    super(props);
    this.AggregateServices = new AggregateServices();
    this.state = {
      isFetching: true,
      data: {
        averageValue: 0,
        labels: [],
        datasets: [],
      },
    };
  }
  public async componentWillReceiveProps(nextProps: any) {
    if (this.props.reportType !== nextProps.reportType) {
      this.getData(nextProps.reportType);
    }
  }
  public async getData(props: string) {
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
        averageValue: response.averageValue,
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
    this.getData(this.props.reportType);
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
      <div className="ltr">
        <DKPortlet title="Results based on DK Core Values">
          {this.state.isFetching === true && <DKSpinner></DKSpinner>}
          {this.state.isFetching === false && (
            <Radar data={this.state.data} options={options} width={400} height={350}></Radar>
          )}
        </DKPortlet>
      </div>
    );
  }
}