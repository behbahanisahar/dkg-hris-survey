import * as React from "react";
import { DKPortlet } from "../../../core/components/portlet/portlet";
import ReportServices from "../../../services/report-services";
import Util from "../.././../utilities/utilities";
import Raters from "../../../entities/raters";
import { Table, TableBody } from "@material-ui/core";
interface IProps {
  name?: string;
}
interface IState {
  itemId?: number;
  raters: Raters[];
}
// const RatersTable: React.SFC<IProps> = props => {
//   return (

//   );
// };
// RatersTable.defaultProps = {
//   name: "Guest User",
// };

// export default RatersTable;

class RatersTable extends React.Component<IProps, IState> {
  private ReportServices: ReportServices;
  private util: Util;
  public constructor(props: any) {
    super(props);
    this.ReportServices = new ReportServices();
    this.util = new Util();
    this.state = {
      itemId: 0,
      raters: [],
    };
  }
  public async componentDidMount() {
    const itemId = Number(this.util.getQueryStringValue("itemId"));
    const raters: Raters[] = await this.ReportServices.getraters(itemId);
    console.log(raters);
    this.setState(prevState => {
      return {
        ...prevState,
        raters,
        itemId,
      };
    });
  }
  public render() {
    return (
      <DKPortlet title="دسته بندی ارزیابان">
        <div>ارزیابان شما که این گزارش بر اساس نظرات آنها تهیه شده شامل این گروه ها می باشند:</div>
        {this.onRenderTable}

        <Table dir="rtl" className="table">
          <thead className="thead-light">
            <tr>
              {" "}
              <th>گروه ارزیاﺏ</th>
              <th># کل ارزیابان</th>
              <th># ارزیابی های تکمیل شده</th>
            </tr>
          </thead>
          <TableBody>{this.onRenderTable()}</TableBody>
        </Table>
      </DKPortlet>
    );
  }
  /******************************************* */
  private onRenderTable = () => {
    debugger;
    console.log("test");
    return this.state.raters.map((n: Raters, index: any) => {
      return (
        <tr key={index}>
          <th align="center">{n.RaterGroup}</th>
          <td align="center">{n.NominatedCount}</td>
          <td align="center">{n.CompletedCount}</td>
        </tr>
      );
    });
  };
}

export default RatersTable;
