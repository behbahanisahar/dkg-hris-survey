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
  lang: string;
}
interface IState {
  isFetching: boolean;
  data: any;
  itemId: number;
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
      itemId: 0,
    };
  }
  public async componentWillReceiveProps(nextProps: any) {
    //   if (this.state.itemId !== nextProps.itemId) {
    this.getData(nextProps.itemId, nextProps.lang, true);
    //   }
  }
  public async getData(NominationId: number, lang: string, isFetching: boolean) {
    this.setState(state => ({
      isFetching,
    }));
    await this.ReportServices.getComparingChartData(NominationId, lang).then(response => {
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
        itemId: NominationId,
      }));
    });
  }

  public async componentDidMount() {
    this.getData(this.props.itemId, this.props.lang, this.state.isFetching);
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
      <div className={this.props.lang === "IR" ? "rtl" : "ltr"}>
        <DKPortlet
          // className={this.props.lang === "IR" ? "rtl" : "ltr"}
          title={this.props.lang === "IR" ? "امتیازات شما براساس ارزش های دیجی کالا" : "Results Based on DK Values"}
        >
          {this.state.isFetching === true && <DKSpinner></DKSpinner>}
          {this.state.isFetching === false && (
            <Radar data={this.state.data} options={options} width={400} height={350}></Radar>
          )}
        </DKPortlet>
      </div>
    );
  }
}
