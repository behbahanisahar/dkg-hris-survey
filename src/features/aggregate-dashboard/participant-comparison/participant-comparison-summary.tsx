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
            <div style={{ color: "black" }} className="kt-widget17__items">
              <div className="kt-widget17__item">
                <span className="kt-widget17__icon">
                  <DKSVGIcon iconName="Star" width="24px" height="24px" color="blue"></DKSVGIcon>
                </span>
                <span className="kt-widget17__subtitle">{this.props.data?.completed}</span>
                <span className="kt-widget17__desc">Completed</span>
              </div>
              <div className="kt-widget17__item">
                <span className="kt-widget17__icon">
                  <DKSVGIcon iconName="Half-star" width="24px" height="24px" color="blue"></DKSVGIcon>
                </span>
                <span className="kt-widget17__subtitle">{this.props.data?.uncompleted}</span>
                <span className="kt-widget17__desc">Uncompleted</span>
              </div>
              {/* <div style={{ textAlign: "center" }} className="kt-widget17__item">
                <span></span>
                <h3>{this.props.data?.completed}</h3>
              </div> */}
              {/* <div style={{ textAlign: "center" }} className="kt-widget17__item">
                <span>UnCompleted</span> <h3>{this.props.data?.uncompleted}</h3>
              </div> */}
            </div>
            <div className="kt-widget17__items">
              <div className="kt-widget17__item">
                <span className="kt-widget17__icon">
                  <DKSVGIcon iconName="Group" width="24px" height="24px" color="blue"></DKSVGIcon>
                </span>
                <span className="kt-widget17__subtitle">{this.props.data?.totalNominated}</span>
                <span className="kt-widget17__desc">Total Nominated</span>
              </div>
              <div className="kt-widget17__item">
                <span className="kt-widget17__icon">
                  <DKSVGIcon iconName="Sale1" width="24px" height="24px" color="blue"></DKSVGIcon>
                </span>
                <span className="kt-widget17__subtitle">{this.props.data?.participationRate}</span>
                <span className="kt-widget17__desc">Participation Rate</span>
              </div>
              {/* <div className="kt-widget17__item">
                <span style={{ fontSize: "1rem", marginTop: "2%", fontWeight: 600 }}>Total Nominated </span>{" "}
                <h3 style={{ fontSize: "1.3rem", color: "#06BDCD" }}>{this.props.data.totalNominated}</h3>
              </div> */}
              {/* <div className="kt-widget17__item">
                <span style={{ fontSize: "1rem", marginTop: "2%", fontWeight: 600 }}>Participation Rate</span>{" "}
                <h3 style={{ fontSize: "1.3rem", color: "#06BDCD" }}>{this.props.data.participationRate}</h3>
              </div> */}
            </div>
          </DKPortletSummary>
        )}
      </div>
    );
  }
}
