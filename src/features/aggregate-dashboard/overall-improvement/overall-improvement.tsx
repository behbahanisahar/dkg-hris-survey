import * as React from "react";
import { DKSpinner } from "../../../core/components/spinner/spinner";
import { DKPortletSummary } from "../../../core/components/portlet/summary-portlet";
import { Line } from "react-chartjs-2";
import { AggregateReportProps } from "../aggregate-report-props";

interface IState {
  isFetching: boolean;
}
export default class OverallImprovement extends React.Component<AggregateReportProps, IState> {
  // private AggregateServices: AggregateServices;
  public constructor(props: any) {
    super(props);
    // this.AggregateServices = new AggregateServices();
    this.state = {
      isFetching: true,
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
      isFetching: false,
    }));
    // await this.AggregateServices.getStatistics(props).then(response =>
    //   this.setState(prevState => {
    //     return {
    //       ...prevState,

    //       data: response,
    //       isFetching: false,
    //     };
    //   }),
    // );
  }

  public async componentDidMount() {
    this.getData(this.props.reportType);
  }
  public render() {
    const data = {
      labels: ["1396", "1397"],
      datasets: [
        {
          fill: false,
          lineTension: 0.1,
          backgroundColor: "#4DBA6D",
          borderColor: "#4DBA6D",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgba(75,192,192,1)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(75,192,192,1)",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: [3.58, 3.86],
        },
      ],
    };
    const options = {
      scales: {
        showScale: false,
        yAxes: [
          {
            gridLines: {
              display: false,
            },
            ticks: {
              display: false,
            },
          },
        ],
        xAxes: [
          {
            gridLines: {
              display: false,
            },
          },
        ],
      },
      legend: {
        display: false,
      },
    };
    return (
      <div>
        {this.state.isFetching === true && <DKSpinner></DKSpinner>}
        {this.state.isFetching === false && (
          <DKPortletSummary background="#4DBA6D" title="Overall Improvement">
            <div style={{ color: "black" }} className="kt-widget17__items">
              <div style={{ textAlign: "center" }} className="kt-widget17__item">
                <Line data={data} options={options} />
              </div>
            </div>
            <div style={{ color: "black", textAlign: "center" }} className="kt-widget17__items">
              <div className="kt-widget17__item">
                <span style={{ fontSize: "1.9rem", marginTop: "2%" }}>Overall Improvement</span>{" "}
                <h3 style={{ fontSize: "1.3rem", color: "#4DBA6D" }}>9%</h3>
              </div>
            </div>
          </DKPortletSummary>
        )}
      </div>
    );
  }
}
