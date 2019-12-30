import * as React from "react";
import { DKPortletSummary } from "../../../core/components/portlet/summary-portlet";
import { DKSpinner } from "../../../core/components/spinner/spinner";
import DKSVGIcon from "../../../core/components/svg-icon/svg-icon";
import { statistics } from "../../../entities/aggregate-report/statistics";
import { AggregateReportProps } from "../aggregate-report-props";

interface IState {
  isFetching: boolean;
}
interface IProps {
  data: statistics;
}
export default class TotalParticipant extends React.Component<IProps & AggregateReportProps, IState> {
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
          <DKPortletSummary background="#FEC465" title="Assessees">
            <div style={{ color: "black" }} className="kt-widget17__items">
              <div style={{ textAlign: "center", height: "190px" }} className="kt-widget17__item">
                <DKSVGIcon iconName="Group" width="96px" height="96px" color="yellow"></DKSVGIcon>
              </div>
            </div>
            <div style={{ color: "black", textAlign: "center" }} className="kt-widget17__items">
              <div className="kt-widget17__item">
                <span className="mb-2" style={{ fontSize: "1.5rem", marginTop: "2%", fontWeight: 500 }}>
                  Number of Assessees
                </span>
                <h3 style={{ fontSize: "1.3rem", color: "#FEC465" }}>{this.props.data.numberOfAsseses}</h3>
              </div>
            </div>
          </DKPortletSummary>
        )}
      </div>
    );
  }
}
