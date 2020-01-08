import * as React from "react";
import upward from "../../../assets/img/line-chart-grey.svg";
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
    return (
      <>
        {this.state.isFetching === true && <DKSpinner></DKSpinner>}
        {this.state.isFetching === false && (
          <DKPortletSummary background="#77787B" title="Year-by-Year Change">
            <div style={{ color: "black", height: "165px" }} className="kt-widget17__items overall">
              <div style={{ textAlign: "center" }} className="kt-widget17__item">
                <div className="pb-5 mb-3 ">
                  <div className="pull-left mr-3">
                    <span className="year">1397</span>
                    <span className="kt-widget17__subtitle stat-value">{this.props.data.total97Score.toFixed(2)}</span>
                  </div>
                  <div className="pull-right ml-3">
                    <span className="year">1398</span>
                    <span className="kt-widget17__subtitle stat-value">{this.props.data.total98Score.toFixed(2)}</span>
                  </div>
                </div>
                {this.props.data.total98Score > this.props.data.total97Score && (
                  <img style={{ width: "30%" }} src={upward} />
                )}
                {this.props.data.total98Score < this.props.data.total97Score && (
                  <img style={{ width: "30%" }} src={downward} />
                )}
              </div>
            </div>
            <div style={{ color: "black", textAlign: "center" }} className="kt-widget17__items">
              <div className="kt-widget17__item" style={{ height: "147px" }}>
                <span className="kt-widget17__subtitle stat-value" style={{ fontSize: "2.8rem" }}>
                  {this.props.data.overallImprovement}%
                </span>
                <span className="kt-widget17__desc">Overall Improvement</span>{" "}
              </div>
            </div>
          </DKPortletSummary>
        )}
      </>
    );
  }
}
