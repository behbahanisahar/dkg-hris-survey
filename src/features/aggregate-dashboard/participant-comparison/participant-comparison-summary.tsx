import * as React from "react";
import { DKPortletSummary } from "../../../core/components/portlet/summary-portlet";
import { DKSpinner } from "../../../core/components/spinner/spinner";
import DKSVGIcon from "../../../core/components/svg-icon/svg-icon";
import { statistics } from "../../../entities/aggregate-report/statistics";
import { AggregateReportProps } from "../aggregate-report-props";

import "./participant-comparison.css";

interface IState {
  isFetching: boolean;
}
interface IProps {
  data: statistics;
}
export default class ParticipantComparisonSummary extends React.Component<IProps & AggregateReportProps, IState> {
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
    return (
      <div>
        {this.state.isFetching === true && <DKSpinner></DKSpinner>}
        {this.state.isFetching === false && (
          <DKPortletSummary background="#06BDCD" title="Response Statistics">
            <div style={{ color: "black", height: "160px" }} className="kt-widget17__items">
              <div className="kt-widget17__item">
                <span className="kt-widget17__icon">
                  <DKSVGIcon iconName="Star" width="28px" height="28px" color="blue"></DKSVGIcon>
                </span>
                <span className="kt-widget17__subtitle stat-value">{this.props.data?.completed}</span>
                <span className="kt-widget17__desc">#Completed Forms</span>
              </div>
              <div className="kt-widget17__item">
                <span className="kt-widget17__icon">
                  <DKSVGIcon iconName="Half-star" width="28px" height="28px" color="blue"></DKSVGIcon>
                </span>
                <span className="kt-widget17__subtitle stat-value">{this.props.data?.uncompleted}</span>
                <span className="kt-widget17__desc">#Incompleted Forms</span>
              </div>
              <div className="kt-widget17__item">
                <span className="kt-widget17__icon">
                  <DKSVGIcon iconName="User" width="28x" height="28px" color="blue"></DKSVGIcon>
                  <DKSVGIcon iconName="Chat-checking" width="16px" height="16px" color="blue"></DKSVGIcon>
                </span>
                <span className="kt-widget17__subtitle stat-value">{this.props.data?.totalNominated}</span>
                <span className="kt-widget17__desc">#Assessment Forms</span>
              </div>
            </div>
            <div className="kt-widget17__items" style={{ height: "160px" }}>
              <div className="kt-widget17__item">
                <span className="kt-widget17__icon">
                  <DKSVGIcon iconName="Sale1" width="28px" height="28px" color="blue"></DKSVGIcon>
                </span>
                <span className="kt-widget17__subtitle stat-value">{this.props.data?.participationRate}</span>
                <span className="kt-widget17__desc">Participation Rate</span>
              </div>
              <div className="kt-widget17__item">
                <span className="kt-widget17__icon">
                  <DKSVGIcon iconName="Group" width="28px" height="28px" color="blue"></DKSVGIcon>
                </span>
                <span className="kt-widget17__subtitle stat-value ">{this.props.data.numberOfAsseses}</span>
                <span className="kt-widget17__desc">#Assessed Leaders</span>
              </div>
            </div>
          </DKPortletSummary>
        )}
      </div>
    );
  }
}
