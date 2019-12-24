import * as React from "react";
import { DKSpinner } from "../../../core/components/spinner/spinner";
import { DKPortletSummary } from "../../../core/components/portlet/summary-portlet";
import { Line } from "react-chartjs-2";
import { AggregateReportProps } from "../aggregate-report-props";
import { statistics } from "../../../entities/aggregate-report/statistics";

interface IState {
  isFetching: boolean;
}
interface IProps {
  data: statistics;
}
export default class OverallImprovement extends React.Component<IProps & AggregateReportProps, IState> {
  public constructor(props: any) {
    super(props);
    this.state = {
      isFetching: true,
    };
  }

  public async componentWillReceiveProps(nextProps: AggregateReportProps) {
    this.getData(nextProps);
  }

  public async getData(props: AggregateReportProps) {
    this.setState(current => ({
      ...current,
      isFetching: false,
    }));
  }

  public async componentDidMount() {
    //  Chart.defaults.global.elements.point = "triangle";
    this.getData(this.props);
  }
  public render() {
    const overallData = [this.props.data.total97Score, this.props.data.total98Score];
    const data = {
      labels: ["1397", "1398"],
      pointStyle: "triangle",
      datasets: [
        {
          fill: false,
          lineTension: 0.1,
          backgroundColor: "#4DBA6D",
          borderColor: "#4DBA6D",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderWidth: 5,
          borderJoinStyle: "miter",
          pointBorderColor: "rgba(75,192,192,1)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointStyle: "triangle",
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(75,192,192,1)",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: overallData,
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
                <span style={{ fontSize: "1.5rem", marginTop: "2%", fontWeight: 500 }}>Overall Improvement</span>{" "}
                <h3 style={{ fontSize: "1.3rem", color: "#4DBA6D" }}>{this.props.data.overallImprovement}%</h3>
              </div>
            </div>
          </DKPortletSummary>
        )}
      </div>
    );
  }
}
