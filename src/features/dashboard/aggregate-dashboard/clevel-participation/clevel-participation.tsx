import * as React from "react";
import ParticipationRate from "../../../../entities/aggregate-report/paticipation-rate";
import AggregateServices from "../../../../services/aggregate-service/aggregate-dashboard-service";
import { NoContent } from "../../../nominationForm/components/no-content/no-content";
import { AggregateReportProps } from "../aggregate-report-props";
import "./clevel-participation.css";
import { DKPortlet } from "../../../../core/components/portlet/portlet";
import { DKSpinner } from "../../../../core/components/spinner/spinner";

interface IState {
  isFetching: boolean;
  data: ParticipationRate[];
}
class ClevelParticipation extends React.Component<AggregateReportProps, IState> {
  private AggregateServices: AggregateServices;
  public constructor(props: any) {
    super(props);
    this.AggregateServices = new AggregateServices();
    this.state = {
      isFetching: true,
      data: [],
    };
  }
  public async componentWillReceiveProps(nextProps: AggregateReportProps) {
    if (JSON.stringify(nextProps) !== JSON.stringify(this.props)) {
      this.getData(nextProps);
    }
  }

  public async getData(props: AggregateReportProps) {
    this.setState(current => ({
      ...current,
      isFetching: true,
    }));

    await this.AggregateServices.getParticipationRate(props).then(response =>
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
      <DKPortlet title="Participation Rate">
        {this.state.isFetching === true && <DKSpinner></DKSpinner>}
        {this.state.isFetching === false && (
          <table className="table table-striped table-sm table-bordered table-hover">
            <thead className="dk-brand-grey">
              <tr>
                <th>CXO </th>
                <th>Participation Rate</th>
              </tr>
            </thead>
            <tbody>{this.onRenderTable()}</tbody>
          </table>
        )}
      </DKPortlet>
    );
  }

  private onRenderTable = () => {
    if (this.state.data?.length === 0) {
      return (
        <tr>
          <td align="center" colSpan={3} className="emptyRowLog">
            <NoContent language="en" showPicture={false}></NoContent>
          </td>
        </tr>
      );
    } else {
      return this.state.data?.map((n: ParticipationRate, index: any) => {
        return (
          <tr className={n.isTotal ? "footer" : ""} key={index}>
            <td align="center">{n.title}</td>
            <td align="center">{n.rate} %</td>
          </tr>
        );
      });
    }
  };
}

export default ClevelParticipation;
