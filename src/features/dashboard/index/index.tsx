import * as React from "react";
import ReportServices from "../../../services/report-services";
import { defaults } from "react-chartjs-2";
import IndexData from "../../../entities/reports/index-report";
import { Table, TableBody } from "@material-ui/core";
import "./index.css";
import { DKPortlet } from "../../../core/components/portlet/portlet";
import { DKSpinner } from "../../../core/components/spinner/spinner";
interface IProps {
  name?: string;
  match?: any;
  itemId: number;
  lang: string;
}
interface IState {
  isFetching: boolean;
  data: IndexData[];
  itemId: number;
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
      itemId: 0,
    };
  }
  public async componentWillReceiveProps(nextProps: any) {
    //  if (this.state.itemId !== nextProps.itemId) {
    this.getData(nextProps.itemId, nextProps.lang, true);
    // }
  }
  public async getData(NominationId: number, lang: string, isFetching: boolean) {
    this.setState(state => ({
      isFetching,
    }));
    await this.ReportServices.getIndex(NominationId, lang).then(response => {
      this.setState(current => ({
        ...current,
        isFetching: false,
        data: response,
        itemId: NominationId,
      }));
    });
  }
  public async componentDidMount() {
    this.getData(this.props.itemId, this.props.lang, this.state.isFetching);
  }

  public render() {
    return (
      <DKPortlet hasHeader={false} noborder={true}>
        {this.state.isFetching === true && <DKSpinner></DKSpinner>}
        {this.state.isFetching === false && (
          <Table
            className={this.props.lang === "IR" ? "table table-bordered mt-3 rtl" : "table table-bordered mt-3 ltr"}
          >
            <TableBody>{this.onRenderTable()}</TableBody>
          </Table>
        )}
      </DKPortlet>
    );
  }
  /******************************************* */
  private onRenderTable = () => {
    return this.state.data.map((n: IndexData, index: any) => {
      return (
        <tr key={index} className="table-row">
          <th className="table-dark">
            <div>{n.Title}</div>
          </th>
          <td align={this.props.lang === "IR" ? "right" : "left"}>
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
