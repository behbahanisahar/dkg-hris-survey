import * as React from "react";
import { DKPortlet } from "../../../core/components/portlet/portlet";
import { Table, TableBody } from "@material-ui/core";
import { DKSpinner } from "../../../core/components/spinner/spinner";
import AggregateServices from "../../../services/aggregate-service/aggregate-dashboard-service";
import ParticipationRate from "./../../../entities/aggregate-report/paticipation-rate";
import "./clevel-participation.css";

interface IProps {
  reportType: string;
}
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
  public async componentWillReceiveProps(nextProps: any) {
    if (this.props.reportType !== nextProps.reportType) {
      this.getData(nextProps.reportType);
    }
  }
  public async getData(props: string) {
    await this.AggregateServices.getParticipationRate(props).then(response =>
      this.setState(current => ({
        ...current,
        data: response,
        isFetching: false,
      })),
    );
  }
  public async componentDidMount() {
    this.getData(this.props.reportType);
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
    if (this.state.data.length === 0) {
      return <tr>Nothing to Display</tr>;
    } else {
      return this.state.data.map((n: ParticipationRate, index: any) => {
        return (
          <tr className={n.isTotal ? "total" : ""} key={index}>
            <th align="center">{n.title}</th>
            {!n.isTotal && <td align="center">{n.rate}</td>}
            {n.isTotal && <td align="center">{n.rate}</td>}
          </tr>
        );
      });
    }
  };
}

export default ClevelParticipation;
