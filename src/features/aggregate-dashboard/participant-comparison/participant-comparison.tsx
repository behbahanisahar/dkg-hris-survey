import { Table, TableBody } from "@material-ui/core";
import * as React from "react";
import { statistics } from "../../../entities/aggregate-report/statistics";
import AggregateServices from "../../../services/aggregate-service/aggregate-dashboard-service";
import "./participant-comparison.css";
interface IProps {
  reportType: string;
}
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
    );
  }
}
