import * as React from "react";
import { DKSpinner } from "../../../core/components/spinner/spinner";
import { statistics } from "../../../entities/aggregate-report/statistics";

import { AggregateReportProps } from "../aggregate-report-props";

import "./participant-comparison.css";
import { DKPortletSummary } from "../../../core/components/portlet/summary-portlet";

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
          <DKPortletSummary background="#06BDCD" title="Number Of Assessors">
            <div style={{ color: "black" }} className="kt-widget17__items">
              <div style={{ textAlign: "center" }} className="kt-widget17__item">
                {" "}
                <span>Completed</span> <h3>{this.props.data?.completed}</h3>
              </div>
              <div style={{ textAlign: "center" }} className="kt-widget17__item">
                {" "}
                <span>UnCompleted</span> <h3>{this.props.data?.uncompleted}</h3>
              </div>
            </div>
            <div style={{ color: "black", textAlign: "center" }} className="kt-widget17__items">
              <div className="kt-widget17__item">
                <span style={{ fontSize: "1rem", marginTop: "2%", fontWeight: 600 }}>Total Nominated </span>{" "}
                <h3 style={{ fontSize: "1.3rem", color: "#FEC465" }}>{this.props.data.totalNominated}</h3>
              </div>
              <div className="kt-widget17__item">
                <span style={{ fontSize: "1rem", marginTop: "2%", fontWeight: 600 }}>Participation Rate</span>{" "}
                <h3 style={{ fontSize: "1.3rem", color: "#FEC465" }}>{this.props.data.participationRate}</h3>
              </div>
            </div>
          </DKPortletSummary>
        )}
      </div>
    );
  }
}
