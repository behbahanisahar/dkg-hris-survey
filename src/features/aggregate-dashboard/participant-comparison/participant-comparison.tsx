import * as React from "react";
import { Table, TableBody } from "@material-ui/core";
import { DKPortlet } from "../../../core/components/portlet/portlet";
import AggregateServices from "../../../services/aggregate-service/aggregate-dashboard-service";
import { statistics } from "../../../entities/aggregate-report/statistics";
import "./participant-comparison.css";
interface IProps {}
interface IState {
  data: statistics;
  isFetching: boolean;
}
export default class ParticipantComparison extends React.Component<IProps, IState> {
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

  public async componentDidMount() {
    await this.AggregateServices.getStatistics("Clevel").then(response =>
      this.setState(current => ({
        ...current,
        data: response,
        isFetching: false,
      })),
    );
  }
  public render() {
    return (
      <DKPortlet title="Number of Participants" noborder={true}>
        <Table className="table table-bordered mt-3 ltr">
          <TableBody className="table-row">
            <tr>
              <td>Completed</td>
              <td align="left">{this.state.data.completed}</td>
            </tr>
            <tr>
              <td>Uncompleted </td>
              <td align="left">{this.state.data.uncompleted}</td>
            </tr>
            <tr className="total">
              <td>Total Nominated </td>
              <td align="left">{this.state.data.totalNominated}</td>
            </tr>
          </TableBody>
        </Table>
      </DKPortlet>
    );
  }
}
