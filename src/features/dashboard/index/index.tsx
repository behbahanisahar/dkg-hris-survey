import * as React from "react";
import ReportServices from "../../../services/report-services";
import { defaults } from "react-chartjs-2";
import IndexData from "../../../entities/reports/index-report";
import { Table, TableBody } from "@material-ui/core";
import "./index.css";
import { DKPortlet } from "../../../core/components/portlet/portlet";
interface IProps {
  name?: string;
  match?: any;
  itemId: number;
}
interface IState {
  isFetching: boolean;
  data: IndexData[];
}
export default class IndexReport extends React.Component<IProps, IState> {
  private ReportServices: ReportServices;
  public constructor(props: any) {
    super(props);
    defaults.global.defaultFontFamily = "IRANYekan,Poppins";
    this.ReportServices = new ReportServices();
    this.state = {
      isFetching: true,
      data: [],
    };
  }
  public async componentDidMount() {
    await this.ReportServices.getIndex(this.props.itemId).then(response => {
      this.setState(current => ({
        ...current,
        isFetching: false,
        data: response,
      }));
    });
  }

  public render() {
    return (
      <DKPortlet hasHeader={false} noborder={true}>
        <Table dir="rtl" className="table table-bordered mt-3">
          <TableBody>{this.onRenderTable()}</TableBody>
        </Table>
      </DKPortlet>
    );
  }
  /******************************************* */
  private onRenderTable = () => {
    return this.state.data.map((n: IndexData, index: any) => {
      return (
        <tr key={index}>
          <th className="table-dark">
            <div className="transform-header">{n.Title}</div>
          </th>
          <td align="right">
            <div className="desc-questions">{n.Description}:</div>
            <ul>{this.onRenderQuestions(n.Items)}</ul>
          </td>
        </tr>
      );
    });
  };

  /********************************************************** */
  private onRenderQuestions = (Items: any[]) => {
    return Items.map((n: any, index: any) => {
      return (
        <li>
          <span className="question" dangerouslySetInnerHTML={{ __html: n.Question }}></span>{" "}
        </li>
      );
    });
  };
}
