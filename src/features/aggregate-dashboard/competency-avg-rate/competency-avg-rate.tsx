import { Table, TableBody, TableCell, TableRow } from "@material-ui/core";
import * as React from "react";
import { DKPortlet } from "../../../core/components/portlet/portlet";
import { DKSpinner } from "../../../core/components/spinner/spinner";
import AggregateServices from "../../../services/aggregate-service/aggregate-dashboard-service";
import { NoContentEnglish } from "../../nominationForm/components/no-content/no-content-english";
import { AggregateReportProps } from "../aggregate-report-props";
import CompetencyAvg from "../../../entities/aggregate-report/competency-avg";

interface IState {
  data: CompetencyAvg[];
  isFetching: boolean;
}
export default class CompetencyAvgRate extends React.Component<AggregateReportProps, IState> {
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

    await this.AggregateServices.getCompetencyAverageRate(props).then(response =>
      this.setState(prevState => {
        return {
          ...prevState,
          isFetching: false,
          data: response,
        };
      }),
    );
  }

  public async componentDidMount() {
    this.getData(this.props);
  }
  public render() {
    return (
      <DKPortlet title="Competency Average Rates">
        {this.state.isFetching === true && <DKSpinner></DKSpinner>}
        {this.state.isFetching === false && (
          <div>
            <Table className=" table mt-3 table-sm">
              <thead className="dk-brand-grey">
                <tr>
                  <th className="none-thead" style={{ backgroundColor: "#fff!important" }}></th>

                  <th>1397</th>
                  <th>1398</th>
                </tr>
              </thead>
              <TableBody>{this.onRenderTable()}</TableBody>
            </Table>
          </div>
        )}
      </DKPortlet>
    );
  }
  private onRenderTable = () => {
    if (this.state.data.length === 0) {
      return (
        <TableRow>
          <TableCell align="center" colSpan={12}>
            <NoContentEnglish />
          </TableCell>
        </TableRow>
      );
    } else {
      return this.state.data?.map((n: CompetencyAvg, index: any) => {
        return (
          <tr key={index}>
            <td align="left">{n.title}</td>
            <td align="center">{n.average97}</td>
            <td align="center">{n.average98}</td>
          </tr>
        );
      });
    }
  };
}
