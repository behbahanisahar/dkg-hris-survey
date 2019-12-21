import * as React from "react";
import { DKPortlet } from "../../../core/components/portlet/portlet";
import { Table, TableBody } from "@material-ui/core";
import { DKSpinner } from "../../../core/components/spinner/spinner";
import AggregateServices from "../../../services/aggregate-service/aggregate-dashboard-service";
import ParticipationRate from "./../../../entities/aggregate-report/paticipation-rate";
import "./clevel-participation.css";
interface IProps {}
interface IState {
  isFetching: boolean;
  data: ParticipationRate[];
}
class ClevelParticipation extends React.Component<IProps, IState> {
  private AggregateServices: AggregateServices;
  public constructor(props: any) {
    super(props);
    this.AggregateServices = new AggregateServices();
    this.state = {
      isFetching: true,
      data: [],
    };
  }

  public async componentDidMount() {
    await this.AggregateServices.getParticipationRate("clevel").then(response =>
      this.setState(current => ({
        ...current,
        data: response,
        isFetching: false,
      })),
    );
  }

  public render() {
    return (
      <DKPortlet hasHeader={false}>
        {this.state.isFetching === true && <DKSpinner></DKSpinner>}
        {this.state.isFetching === false && (
          <Table className="table table-bordered mt-3 ltr">
            <thead className="thead-dark">
              <tr>
                <th>CXO </th>
                <th> Participation Rate</th>
              </tr>
            </thead>
            <TableBody>{this.onRenderTable()}</TableBody>
          </Table>
        )}
      </DKPortlet>
    );
  }

  private onRenderTable = () => {
    return this.state.data.map((n: ParticipationRate, index: any) => {
      return (
        <tr className={n.isTotal ? "total" : ""} key={index}>
          <th align="center">{n.title}</th>
          {!n.isTotal && <td align="center">{n.rate}</td>}
          {n.isTotal && <td align="center">{n.rate}</td>}
        </tr>
      );
    });
  };
}

export default ClevelParticipation;
