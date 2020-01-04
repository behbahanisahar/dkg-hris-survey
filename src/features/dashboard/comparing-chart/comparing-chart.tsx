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
  lang: string;
}
interface IState {
  isFetching: boolean;
  itemId: number;
  data: any;
}
export default class DKValueRadarChart extends React.Component<IProps, IState> {
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
    this.getData(nextProps.itemId, nextProps.lang, true);
  }

  public async getData(NominationId: number, lang: string, isFetching: boolean) {
    this.setState(state => ({
      isFetching,
    }));
    await this.ReportServices.getCompareCompetency(NominationId, lang).then(response => {
      const data = {
        labels: response.labels,
        datasets: response.datasets,
      };
      this.setState(current => ({
        ...current,
        data: data,
        isFetching: false,
        itemId: NominationId,
      }));
    });
  }

  public async componentDidMount() {
    this.getData(this.props.itemId, this.props.lang, this.state.isFetching);
  }

  public render() {
    const options = {
      tooltips: {
        enabled: true,
      },
      legend: {
        labels: {
          fontFamily: "IRANYekan",
        },
        pointLabels: {
          fontFamily: "IRANYekan",
        },
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
      <DKPortlet
        title={
          this.props.lang === "fa" ? "مقایسه امتیاز شما با سایر رهبران واحد" : "Comparing your results with the others"
        }
      >
        <div>
          <div
            className={
              this.props.lang === "fa"
                ? "text-align-right alert alert-secondary"
                : "text-align-left alert alert-secondary"
            }
          >
            {" "}
            {this.props.lang === "fa"
              ? "	در نمودارهای زیر نتایج خودارزیابی افراد لحاظ نشده است. "
              : "The results of self-assessment are not included in the following chart."}{" "}
          </div>
        </div>
        {this.state.isFetching === true && <DKSpinner></DKSpinner>}
        {this.state.isFetching === false && <Line options={options} height={100} data={this.state.data} />}
      </DKPortlet>
    );
  }
}
