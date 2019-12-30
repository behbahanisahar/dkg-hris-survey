import * as React from "react";
import { DKSpinner } from "../../../core/components/spinner/spinner";
import { DKPortletSummary } from "../../../core/components/portlet/summary-portlet";

import { AggregateReportProps } from "../aggregate-report-props";
import { statistics } from "../../../entities/aggregate-report/statistics";
import upward from "../../../assets/img/line-chart.svg";
import downward from "../../../assets/img/loss.svg";

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
    this.getData(this.props);
  }
  public render() {
    let color = "";
    if (this.props.data.total98Score < this.props.data.total97Score) {
      color = "#F05B71";
    } else {
      color = "#4DBA6D";
    }
    return (
      <div>
        {this.state.isFetching === true && <DKSpinner></DKSpinner>}
        {this.state.isFetching === false && (
          <DKPortletSummary background="#4DBA6D" title="Overall Improvement">
            <div style={{ color: "black" }} className="kt-widget17__items">
              <div style={{ textAlign: "center" }} className="kt-widget17__item">
                <div className="mb-3 ">
                  <span style={{ fontSize: "1.3rem", color: color, fontWeight: 600 }} className="pull-left">
                    {this.props.data.total97Score.toFixed(2)}
                  </span>
                  <span style={{ fontSize: "1.3rem", color: color, fontWeight: 600 }} className="pull-right">
                    {this.props.data.total98Score.toFixed(2)}
                  </span>
                </div>
                {this.props.data.total98Score > this.props.data.total97Score && (
                  <img style={{ width: "45%" }} src={upward} />
                )}
                {this.props.data.total98Score < this.props.data.total97Score && (
                  <img style={{ width: "45%" }} src={downward} />
                )}
                <div className="mb-3 ">
                  <span style={{ fontWeight: 600 }} className="pull-left">
                    1397
                  </span>
                  <span style={{ fontWeight: 600 }} className="pull-right">
                    1398
                  </span>
                </div>
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
      </div>
    );
  }
}
