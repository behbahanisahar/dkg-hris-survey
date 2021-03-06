import * as React from "react";
import ReportServices from "../../../../services/report-services";
import { defaults } from "react-chartjs-2";
import IndexData from "../../../../entities/reports/index-report";
import { Table, TableBody } from "@material-ui/core";
import "./index.css";
import { DKPortlet } from "../../../../core/components/portlet/portlet";
import { DKSpinner } from "../../../../core/components/spinner/spinner";
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
    this.getData(nextProps.itemId, nextProps.lang, true);
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
            className={this.props.lang === "fa" ? "table table-bordered mt-3 rtl" : "table table-bordered mt-3 ltr"}
          >
            <TableBody className="table-row">{this.onRenderTable()}</TableBody>
          </Table>
        )}
      </DKPortlet>
    );
  }

  private onRenderTable = () => {
    return this.state.data.map((n: IndexData, index: any) => {
      return (
        <tr key={index}>
          <th className={"table-dark-" + index}>
            <div className="transform-header">{n.title}</div>
          </th>
          <td align={this.props.lang === "fa" ? "right" : "left"}>
            <div className="question-box">
              <div className="desc-questions">{n.description}</div>
              <ul>{this.onRenderQuestions(n.items)}</ul>
            </div>
          </td>
        </tr>
      );
    });
  };

  private onRenderQuestions = (Items: any[]) => {
    return Items.map((n: any, index: any) => {
      return (
        <li>
          <span className="question" dangerouslySetInnerHTML={{ __html: n.question }}></span>{" "}
        </li>
      );
    });
  };
}
