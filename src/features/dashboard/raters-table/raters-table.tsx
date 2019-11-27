import * as React from "react";
import ReportServices from "../../../services/report-services";
import Util from "../.././../utilities/utilities";
import Raters from "../../../entities/raters";
import { DKPortlet } from "../../../core/components/portlet/portlet";
import { Table, TableBody } from "@material-ui/core";
import { DKSpinner } from "../../../core/components/spinner/spinner";
interface IProps {
  match?: any;
  itemId: number;
  lang: string;
}
interface IState {
  isFetching: boolean;
  raters: Raters[];
  itemId: number;
  lang: string;
}
class RatersTable extends React.Component<IProps, IState> {
  private ReportServices: ReportServices;
  public constructor(props: any) {
    super(props);
    this.ReportServices = new ReportServices();
    this.state = {
      isFetching: true,
      raters: [],
      itemId: 0,
      lang: "",
    };
  }
  public async componentWillReceiveProps(nextProps: any) {
    this.getData(nextProps.itemId, nextProps.lang, true);
  }
  public async getData(NominationId: number, lang: string, isFetching: boolean) {
    this.setState(state => ({
      isFetching,
    }));
    await this.ReportServices.getraters(NominationId, lang).then(response =>
      this.setState(current => ({
        ...current,
        raters: response,
        isFetching: false,
        itemId: NominationId,
        lang,
      })),
    );
  }
  public async componentDidMount() {
    this.getData(this.props.itemId, this.props.lang, this.state.isFetching);
  }

  public render() {
    return (
      <DKPortlet title={this.props.lang === "IR" ? "دسته بندی ارزیابان" : "Rater Categories"}>
        <div className={this.props.lang === "IR" ? "text-align-right" : "text-align-left"}>
          {" "}
          {this.props.lang === "IR"
            ? " ارزیابان شما که این گزارش بر اساس نظرات آنها تهیه شده شامل این گروه ها می باشند:"
            : "Your feedback report is based on evaluations gathered from the following rater categories:"}{" "}
        </div>
        {this.state.isFetching === true && <DKSpinner></DKSpinner>}
        {this.state.isFetching === false && (
          <Table
            className={this.props.lang === "IR" ? "table table-bordered mt-3 rtl" : "table table-bordered mt-3 ltr"}
          >
            <thead className="thead-dark">
              {this.props.lang === "IR" ? (
                <tr>
                  <th>گروه ارزیاﺏ</th>
                  <th># کل ارزیابان</th>
                  <th># ارزیابی های تکمیل شده</th>
                </tr>
              ) : (
                <tr>
                  <th>Rater Group</th>
                  <th># NominatedRater </th>
                  <th># Completed</th>
                </tr>
              )}
            </thead>
            <TableBody>{this.onRenderTable()}</TableBody>
          </Table>
        )}
      </DKPortlet>
    );
  }
  /******************************************* */
  private onRenderTable = () => {
    console.log(this.state.raters);
    return this.state.raters.map((n: Raters, index: any) => {
      return (
        <tr key={index}>
          <th align="center">{n.RaterGroup}</th>
          <td align="center">{Util.toPersianNumber(n.NominatedCount.toString())}</td>
          <td align="center">{Util.toPersianNumber(n.CompletedCount.toString())}</td>
        </tr>
      );
    });
  };
}

export default RatersTable;
