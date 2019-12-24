import * as React from "react";
import { DKSpinner } from "../../../core/components/spinner/spinner";
import { statistics } from "../../../entities/aggregate-report/statistics";
import AggregateServices from "../../../services/aggregate-service/aggregate-dashboard-service";
import { AggregateReportProps } from "../aggregate-report-props";
import ParticipantComparisonPie from "./participant-comparison-pie";
import "./participant-comparison.css";
import { DKPortletSummary } from "../../../core/components/portlet/summary-portlet";

interface IState {
  data: statistics;
  isFetching: boolean;
}
export default class ParticipantComparisonSummary extends React.Component<AggregateReportProps, IState> {
  private AggregateServices: AggregateServices;
  public constructor(props: any) {
    super(props);
    this.AggregateServices = new AggregateServices();
    this.state = {
      isFetching: true,
      data: {
        completed: 0,
        uncompleted: 0,
        totalNominated: 0,
      },
    };
  }

  public async componentWillReceiveProps(nextProps: AggregateReportProps) {
    this.getData(nextProps);
  }

  public async getData(props: AggregateReportProps) {
    this.setState(current => ({
      ...current,
      isFetching: true,
    }));
    await this.AggregateServices.getStatistics(props).then(response =>
      this.setState(prevState => {
        return {
          ...prevState,

          data: response,
          isFetching: false,
        };
      }),
    );
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
                <span>Completed</span> <h3>{this.state.data?.completed}</h3>
              </div>
              <div style={{ textAlign: "center" }} className="kt-widget17__item">
                {" "}
                <span>UnCompleted</span> <h3>{this.state.data?.uncompleted}</h3>
              </div>
            </div>
            <div style={{ color: "black" }} className="kt-widget17__items">
              <div className="kt-widget17__item">
                <div>
                  <ParticipantComparisonPie viewAs={this.props.viewAs} level={this.props.level} />
                </div>
              </div>
            </div>
          </DKPortletSummary>
        )}
      </div>
    );
  }
}
