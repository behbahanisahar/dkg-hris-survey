import * as React from "react";
import upward from "../../../assets/img/line-chart.svg";
import downward from "../../../assets/img/loss.svg";
import { DKPortletSummary } from "../../../core/components/portlet/summary-portlet";
import { DKSpinner } from "../../../core/components/spinner/spinner";
import { statistics } from "../../../entities/aggregate-report/statistics";
import { AggregateReportProps } from "../aggregate-report-props";
import "./overall-improvement.less";

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

  public async componentWillReceiveProps() {
    this.getData();
  }

  public async getData() {
    this.setState(current => ({
      ...current,
      isFetching: false,
    }));
  }

  public async componentDidMount() {
    this.getData();
  }

  public render() {
    let color = "";
    if (this.props.data.total98Score < this.props.data.total97Score) {
      color = "#F05B71";
    } else {
      color = "#4DBA6D";
    }
    return (
      <>
        {this.state.isFetching === true && <DKSpinner></DKSpinner>}
        {this.state.isFetching === false && (
          <DKPortletSummary background="#4DBA6D" title="Overall Improvement">
            <div style={{ color: "black" }} className="kt-widget17__items overall">
              <div style={{ textAlign: "center" }} className="kt-widget17__item">
                <div className="pb-5 mb-3 ">
                  <div className="pull-left mr-3">
                    <span className="year">1397</span>
                    <span className="value" style={{ color: color }}>
                      {this.props.data.total97Score.toFixed(2)}
                    </span>
                  </div>
                  <div className="pull-right ml-3">
                    <span className="year">1398</span>
                    <span style={{ fontSize: "1.3rem", color: color, fontWeight: 600 }}>
                      {this.props.data.total98Score.toFixed(2)}
                    </span>
                  </div>
                </div>
                {this.props.data.total98Score > this.props.data.total97Score && (
                  <img style={{ width: "40%" }} src={upward} />
                )}
                {this.props.data.total98Score < this.props.data.total97Score && (
                  <img style={{ width: "40%" }} src={downward} />
                )}
              </div>
            </div>
            <div style={{ color: "black", textAlign: "center" }} className="kt-widget17__items">
              <div className="kt-widget17__item">
                <span style={{ fontSize: "1.5rem", marginTop: "2%", fontWeight: 500 }}>Overall Improvement</span>{" "}
                <h3 style={{ fontSize: "1.3rem", color: color }}>{this.props.data.overallImprovement}%</h3>
              </div>
            </div>
          </DKPortletSummary>
        )}
      </>
    );
  }
}
