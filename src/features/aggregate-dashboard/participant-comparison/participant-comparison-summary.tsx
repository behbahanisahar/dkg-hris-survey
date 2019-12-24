import * as React from "react";
import { DKSpinner } from "../../../core/components/spinner/spinner";
import { statistics } from "../../../entities/aggregate-report/statistics";
import AggregateServices from "../../../services/aggregate-service/aggregate-dashboard-service";
import "./participant-comparison.css";
import ParticipantComparisonPie from "./participant-comparison-pie";

interface IProps {
  reportType: string;
}
interface IState {
  data: statistics;
  isFetching: boolean;
}
export default class ParticipantComparisonSummary extends React.Component<IProps, IState> {
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
  public async componentWillReceiveProps(nextProps: any) {
    if (this.props.reportType !== nextProps.reportType) {
      this.getData(nextProps.reportType);
    }
  }
  public async getData(props: string) {
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
    this.getData(this.props.reportType);
  }
  public render() {
    return (
      <div>
        {this.state.isFetching === true && <DKSpinner></DKSpinner>}
        {this.state.isFetching === false && (
          <div className="kt-portlet kt-portlet--fit kt-portlet--head-lg kt-portlet--head-overlay kt-portlet--skin-solid kt-portlet--height-fluid">
            <div className="kt-portlet__head kt-portlet__head--noborder kt-portlet__space-x">
              <div className="header">Number of Assessors</div>
            </div>
            <div className="kt-portlet__body kt-portlet__body--fit">
              <div className="kt-widget17">
                <div
                  className="kt-widget17__visual kt-widget17__visual--chart kt-portlet-fit--top kt-portlet-fit--sides"
                  style={{ backgroundColor: "#F05B71" }}
                >
                  <div className="kt-widget17__chart"></div>
                </div>
                <div className="kt-widget17__stats">
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
                        <ParticipantComparisonPie reportType={this.props.reportType} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
