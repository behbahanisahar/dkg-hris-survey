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
}
interface IState {
  isFetching: boolean;
  raters: Raters[];
  itemId: number;
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
    };
  }
  public async componentWillReceiveProps(nextProps: any) {
    console.log(nextProps);
    console.log(this.state.itemId);
    if (this.state.itemId !== nextProps.itemId) {
      this.getData(nextProps.itemId);
    }
  }
  public async getData(NominationId: number) {
    await this.ReportServices.getraters(NominationId).then(response =>
      this.setState(current => ({
        ...current,
        raters: response,
        isFetching: false,
        itemId: NominationId,
      })),
    );
  }
  public async componentDidMount() {
    this.getData(this.props.itemId);
  }

  public render() {
    return (
      <DKPortlet title="دسته بندی ارزیابان">
        <div>ارزیابان شما که این گزارش بر اساس نظرات آنها تهیه شده شامل این گروه ها می باشند:</div>
        {this.state.isFetching === true && <DKSpinner></DKSpinner>}
        {this.state.isFetching === false && (
          <Table dir="rtl" className="table table-bordered mt-3">
            <thead className="thead-dark">
              <tr>
                <th>گروه ارزیاﺏ</th>
                <th># کل ارزیابان</th>
                <th># ارزیابی های تکمیل شده</th>
              </tr>
            </thead>
            <TableBody>{this.onRenderTable()}</TableBody>
          </Table>
        )}
      </DKPortlet>
    );
  }
  /******************************************* */
  private onRenderTable = () => {
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
