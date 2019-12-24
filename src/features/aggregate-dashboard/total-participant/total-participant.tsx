import * as React from "react";
import { DKSpinner } from "../../../core/components/spinner/spinner";
import { DKPortletSummary } from "../../../core/components/portlet/summary-portlet";
import pic from "./../../../assets/img/users.png";
import { AggregateReportProps } from "../aggregate-report-props";

interface IState {
  isFetching: boolean;
}
export default class TotalParticipant extends React.Component<AggregateReportProps, IState> {
  // private AggregateServices: AggregateServices;
  public constructor(props: any) {
    super(props);
    // this.AggregateServices = new AggregateServices();
    this.state = {
      isFetching: true,
    };
  }
  public async componentWillReceiveProps(nextProps: any) {
    this.getData(nextProps.reportType);
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
          <DKPortletSummary background="#FEC465" title="assessees">
            <div style={{ color: "black" }} className="kt-widget17__items">
              <div style={{ textAlign: "center" }} className="kt-widget17__item">
                <img style={{ width: "45%" }} src={pic} />
              </div>
            </div>
            <div style={{ color: "black", textAlign: "center" }} className="kt-widget17__items">
              <div className="kt-widget17__item">
                <span style={{ fontSize: "1rem", marginTop: "2%", fontWeight: 600 }}>Total</span>{" "}
                <h3 style={{ fontSize: "1.3rem", color: "#FEC465" }}>386</h3>
              </div>
              <div className="kt-widget17__item">
                <span style={{ fontSize: "1rem", marginTop: "2%", fontWeight: 600 }}>Participation Rate</span>{" "}
                <h3 style={{ fontSize: "1.3rem", color: "#FEC465" }}>87%</h3>
              </div>
            </div>
          </DKPortletSummary>
        )}
      </div>
    );
  }
}
