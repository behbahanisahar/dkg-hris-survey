import * as React from "react";
import { DKSpinner } from "../../../core/components/spinner/spinner";
import { statistics } from "../../../entities/aggregate-report/statistics";
import AggregateServices from "../../../services/aggregate-service/aggregate-dashboard-service";
import { DKPortletSummary } from "../../../core/components/portlet/summary-portlet";
import pic from "./../../../assets/img/Artboards.png";
interface IProps {
  reportType: string;
}
interface IState {
  data: statistics;
  isFetching: boolean;
}
export default class DashboardSummary extends React.Component<IProps, IState> {
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
          <DKPortletSummary background="#F05B71" title=" 360̊ Feedback Aggregate Report">
            <div style={{ color: "black" }} className="kt-widget17__items">
              <div style={{ textAlign: "center", fontSize: "2.1rem" }} className="kt-widget17__item">
                Level Of Leaders
                <img src={pic} style={{ width: "50%" }} />
              </div>
            </div>
            <div style={{ color: "black", textAlign: "center" }} className="kt-widget17__items">
              <div className="kt-widget17__item">
                <span style={{ fontSize: "1.2rem", marginTop: "2%", fontWeight: 600 }}>Directors</span>{" "}
              </div>
              <div className="kt-widget17__item">
                <span style={{ fontSize: "1.2rem", marginTop: "2%", fontWeight: 600 }}>SMs</span>{" "}
              </div>
            </div>
            <div style={{ color: "black", textAlign: "center" }} className="kt-widget17__items">
              <div className="kt-widget17__item">
                <span style={{ fontSize: "1.2rem", marginTop: "2%", fontWeight: 600 }}>MMs</span>{" "}
              </div>
              <div className="kt-widget17__item">
                <span style={{ fontSize: "1.2rem", marginTop: "2%", fontWeight: 600 }}>Supervisors</span>{" "}
              </div>
            </div>
          </DKPortletSummary>
        )}
      </div>
    );
  }
}
