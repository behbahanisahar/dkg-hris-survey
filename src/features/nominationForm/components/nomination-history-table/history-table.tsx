import React from "react";
import IHistoryTableProps from "./history-table-props";
import IHistoryTableState from "./history-state";
import { Table, TableRow, TableBody, TableCell } from "@material-ui/core";
import ITableHeader from "../../../../entities/table-headers";

class HistoryTable extends React.Component<IHistoryTableProps, IHistoryTableState> {
  private HistorytableHeaders: ITableHeader[];
  constructor(props: IHistoryTableProps) {
    super(props);
    this.HistorytableHeaders = [
      { id: "ModifiedBy", label: "ModifiedBy" },
      { id: "ModifiedDate", label: "ModifiedDate" },
      { id: "Added", label: "Added" },
      { id: "Deleted", label: "Deleted" },
    ];
    this.state = {
      NominationHistory: [],
    };
  }

  public async componentDidMount() {
    this.setState(prevState => {
      return {
        ...prevState,
        NominationHistory: this.props.NominationHistory,
      };
    });
  }

  public render() {
    return (
      <div>
        <div className="kt-portlet__body">
          <Table dir="rtl" className="kt-datatable__table">
            <thead className="kt-datatable__head">
              <TableRow>{this.renderHistoryHeader(this.HistorytableHeaders)}</TableRow>
            </thead>
            <TableBody>{this.onRenderHistoryRows(this.props.tableName)}</TableBody>
          </Table>
        </div>
      </div>
    );
  }
  /**************************** Repeat Table ****************************** */
  private renderHistoryHeader = (columnDetail: any[]) => {
    return columnDetail.map(
      row => (
        <TableCell className="LogPadding" key={row.id} sortDirection="desc">
          {row.label}
        </TableCell>
      ),
      this,
    );
  };

  private onRenderHistoryRows = (tableName: string) => {
    const Subordinates = this.state.NominationHistory.filter(el => el.Field === "Subordinate");
    const Peer = this.state.NominationHistory.filter(el => el.Field === "Peer");
    const Other = this.state.NominationHistory.filter(el => el.Field === "Other");
    let items: any[] = [];
    switch (tableName) {
      case "Subordinate": {
        items = Subordinates;
        break;
      }
      case "Other": {
        items = Other;
        break;
      }
      case "Peer": {
        items = Peer;
        break;
      }
      default:
        items = Subordinates;
    }

    for (let i = 0; i < items.length; ++i) {
      return items[i].Changes.map((n: any, index: any) => {
        let DeletedStr: string = "";
        let AddedStr: string = "";
        if (n.Added !== null) {
          AddedStr = n.Added.join();
        }
        if (n.Deleted !== null) {
          DeletedStr = n.Deleted.join();
        }

        return (
          <TableRow key={index}>
            <TableCell align="center">{n.ModifiedBy}</TableCell>
            <TableCell align="center">{n.ModifiedDateShamsi}</TableCell>
            <TableCell align="center" className={AddedStr !== "" ? "kt-font-bold kt-font-success" : ""}>
              {AddedStr}
            </TableCell>
            <TableCell align="center" className={DeletedStr !== "" ? "kt-font-bold kt-font-danger" : ""}>
              {DeletedStr}
            </TableCell>
          </TableRow>
        );
      });
    }
  };
}

export default HistoryTable;