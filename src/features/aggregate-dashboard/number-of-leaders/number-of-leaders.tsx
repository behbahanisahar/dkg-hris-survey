import * as React from "react";
import { DKPortlet } from "../../../core/components/portlet/portlet";
import { DKSpinner } from "../../../core/components/spinner/spinner";
import AggregateServices from "../../../services/aggregate-service/aggregate-dashboard-service";
import { AggregateReportProps } from "../aggregate-report-props";
import NumberOfLeaders from "../../../entities/aggregate-report/leader-number";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import "./number-of-leaders.css";
import {
  TableRow,
  TableCell,
  ExpansionPanel,
  ExpansionPanelSummary,
  Typography,
  ExpansionPanelDetails,
  Table,
  TableBody,
} from "@material-ui/core";
import { NoContent } from "../../nominationForm/components/no-content/no-content";

interface IState {
  isFetching: boolean;
  data: NumberOfLeaders[];
}
class LeadersNum extends React.Component<AggregateReportProps, IState> {
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
    this.getData(nextProps);
  }

  public async getData(props: AggregateReportProps) {
    this.setState(current => ({
      ...current,
      isFetching: true,
    }));

    await this.AggregateServices.getNumberOfLeaders(props).then(response =>
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
      <DKPortlet hasHeader={false}>
        {this.state.isFetching === true && <DKSpinner></DKSpinner>}
        {this.state.isFetching === false && (
          <Table className="table table-bordered mt-3 ltr">
            <thead className="thead-dark">
              <tr>
                <th>Number of Leaders</th>
              </tr>
            </thead>
            <TableBody id="foods">{this.onRenderTable()}</TableBody>
          </Table>
        )}
      </DKPortlet>
    );
  }
  private onRenderTable = () => {
    if (this.state.data?.length === 0) {
      return (
        <TableRow>
          <TableCell align="center" colSpan={3} className="emptyRowLog">
            <NoContent></NoContent>
          </TableCell>
        </TableRow>
      );
    } else {
      return this.state.data?.map((n: NumberOfLeaders, index: any) => {
        return (
          <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
              <Typography>
                {n.title} <div className="count">({n.count})</div>
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Table className="table table-bordered mt-3 ltr">
                <TableBody>{this.onRenderSubDep(n.departments)}</TableBody>
              </Table>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        );
      });
    }
  };
  /************************************************************** */
  private onRenderSubDep = (departments?: NumberOfLeaders[]) => {
    return departments?.map((item: NumberOfLeaders, index: any) => {
      return (
        <tr>
          <td>
            {item.title} <p className="count"> ({item.count})</p>
          </td>
        </tr>
      );
    });
  };
}

export default LeadersNum;
