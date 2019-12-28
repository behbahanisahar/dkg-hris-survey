import { Table, TableBody, TableCell, TableRow } from "@material-ui/core";
import * as React from "react";
import { DKPortlet } from "../../../core/components/portlet/portlet";
import { DKSpinner } from "../../../core/components/spinner/spinner";
import AggregateServices from "../../../services/aggregate-service/aggregate-dashboard-service";
import { NoContentEnglish } from "../../nominationForm/components/no-content/no-content-english";
import { AggregateReportProps } from "../aggregate-report-props";
import Heatmap from "./../../../entities/aggregate-report/heatmap";
import { HeataMapLegend } from "./heatmap-legend";
import "./heatmap.css";
import { HeataImprovement } from "./heatmap-improvement";

let allitems: any[] = [];

interface IState {
  data: Heatmap[];
  isFetching: boolean;
  buttonText: string;
  filterName: string;
}
export default class HeatMap extends React.Component<AggregateReportProps, IState> {
  private AggregateServices: AggregateServices;
  public constructor(props: any) {
    super(props);
    this.AggregateServices = new AggregateServices();
    this.state = {
      isFetching: true,
      data: [],
      buttonText: "Show All",
      filterName: "",
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
    console.log("heatmap", props);
    await this.AggregateServices.getHeatmap(props).then(response =>
      this.setState(prevState => {
        return {
          ...prevState,
          isFetching: false,
          data: response,
        };
      }),
    );
    allitems = this.state.data;
  }

  public async componentDidMount() {
    this.getData(this.props);
  }
  public render() {
    return (
      <DKPortlet title="Heatmap">
        {this.state.isFetching === true && <DKSpinner></DKSpinner>}
        {this.state.isFetching === false && (
          <>
            <HeataMapLegend></HeataMapLegend>
            <Table className="heatmap-table table mt-3 table-sm">
              <thead className="dk-brand-grey">
                <tr>
                  <th className="none-thead" style={{ backgroundColor: "#fff!important" }}>
                    {this.state.data?.length >= 40 && (
                      <button
                        className="btn btn-sm btn-bold btn-brand-hover"
                        onClick={(e: any) => {
                          this.onShowItem();
                          e.preventDefault();
                          return false;
                        }}
                      >
                        {this.state.buttonText}
                      </button>
                    )}
                  </th>
                  <th className="none-thead" style={{ backgroundColor: "#fff!important" }}>
                    <input
                      value={this.state.filterName}
                      onChange={this.onFilterTable}
                      placeholder="Search...    "
                      className="form-control input-search"
                    />
                  </th>
                  <th>Customer Centric</th>
                  <th>Builder approach and Result oriented</th>
                  <th>Drive for Excellence</th>
                  <th>Teamwork</th>
                  <th>Decision Making</th>
                  <th>Managing People</th>
                  <th>Developing Vision & Strategy</th>
                  <th>Business Acumen</th>
                  <th>Total Average Rate</th>
                  <th>#Assessors</th>
                  <th>Improvement</th>
                </tr>
              </thead>
              <TableBody>{this.onRenderTable()}</TableBody>
            </Table>
          </>
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
      return this.state.data?.map((n: Heatmap, index: any) => {
        return (
          <tr key={index} className={this.ChangeTrClass(index)}>
            <td style={{ width: "1%" }} align="center">
              {index + 1}
            </td>
            <td align="left">
              <a target="_blank" className="title-link" href={"#/dashboard/" + n.nominationId}>
                {n.title}
              </a>
            </td>
            <td style={{ width: "8%" }} className={this.averageClass(n.category1, false)} align="center">
              {n.category1.toFixed(2)}
            </td>
            <td style={{ width: "8%" }} className={this.averageClass(n.category2, false)} align="center">
              {n.category2.toFixed(2)}
            </td>
            <td style={{ width: "8%" }} className={this.averageClass(n.category3, false)} align="center">
              {n.category3.toFixed(2)}
            </td>
            <td style={{ width: "8%" }} className={this.averageClass(n.category4, false)} align="center">
              {n.category4.toFixed(2)}
            </td>
            <td style={{ width: "8%" }} className={this.averageClass(n.category5, false)} align="center">
              {n.category5.toFixed(2)}
            </td>
            <td style={{ width: "8%" }} className={this.averageClass(n.category6, false)} align="center">
              {n.category6.toFixed(2)}
            </td>
            <td style={{ width: "8%" }} className={this.averageClass(n.category7, false)} align="center">
              {n.category7.toFixed(2)}
            </td>
            <td style={{ width: "8%" }} className={this.averageClass(n.category8, false)} align="center">
              {n.category8.toFixed(2)}
            </td>
            <td style={{ width: "6%" }} className={this.averageClass(n.totalAverage, true)} align="center">
              {n.totalAverage.toFixed(2)}
            </td>
            <td style={{ width: "8%" }} align="center">
              {n.numberOfAssessors}
            </td>
            <td style={{ width: "6%" }} align="center">
              <HeataImprovement value={n.improvement}></HeataImprovement>
            </td>
          </tr>
        );
      });
    }
  };

  public averageClass = (category: number, isTotal: boolean) => {
    let avgClassName: string = "";
    if (isTotal) {
      if (category <= 2) {
        avgClassName = "average1 average-bold ";
      } else if (category > 2 && category <= 3) {
        avgClassName = "average2 average-bold ";
      } else if (category > 3 && category <= 4) {
        avgClassName = "average3 average-bold ";
      } else if (category > 4 && category <= 4.5) {
        avgClassName = "average4 average-bold ";
      } else if (category > 4.5 && category <= 5) {
        avgClassName = "average5 average-bold ";
      }
      return avgClassName;
    } else {
      if (category <= 2) {
        avgClassName = "averageBackground1 ";
      } else if (category > 2 && category <= 3) {
        avgClassName = "averageBackground2 ";
      } else if (category > 3 && category <= 4) {
        avgClassName = "averageBackground3 ";
      } else if (category > 4 && category <= 4.5) {
        avgClassName = "averageBackground4 ";
      } else if (category > 4.5 && category <= 5) {
        avgClassName = "averageBackground5 ";
      }
      return avgClassName;
    }
  };
  /****************************************************** */
  public ChangeTrClass = (index: number) => {
    if (index < 20 || index > this.state.data.length - 20) {
      return "";
    } else {
      return "hidden-row";
    }
  };

  public onShowItem = () => {
    const hideRow = document.getElementsByClassName("hidden-row").length;
    if (hideRow !== 0) {
      for (let i = 0; i < hideRow; ++i) {
        document.getElementsByClassName("hidden-row")[0].className = "show-row";
      }
      this.setState(prevState => {
        return {
          ...prevState,
          buttonText: "Show Tops",
        };
      });
      // var heatmapTable = document.getElementsByClassName("heatmap-table")[0] as HTMLTableElement;
      // heatmapTable.deleteRow(21);
      var row = document.getElementsByClassName("empty-row")[0] as HTMLTableRowElement;
      row?.parentNode?.removeChild(row);
    } else {
      const showRow = document.getElementsByClassName("show-row").length;

      var tableRef = document.getElementsByClassName("heatmap-table")[0].getElementsByTagName("tbody")[0];

      // Insert a row in the table at the last row
      var newRow = tableRef.insertRow(20);

      // Insert a cell in the row at index 0
      var newCell = newRow.insertCell(0);
      newCell.className = "empty-row";

      // Append a text node to the cell
      var newText = document.createTextNode("...");
      newCell.appendChild(newText);

      for (let i = 0; i < showRow; ++i) {
        document.getElementsByClassName("show-row")[0].className = "hidden-row";
      }
      this.setState(prevState => {
        return {
          ...prevState,
          buttonText: "Show All",
        };
      });
    }
  };
  /*************************************************************************** */
  private onFilterTable = (event: any) => {
    this.setState({
      filterName: event.target.value,
    });

    this.filterBox();
  };
  private filterBox = () => {
    this.setState(prevState => {
      let TableItems: Heatmap[] = allitems;
      if (prevState.filterName) {
        TableItems = prevState.filterName.toLowerCase()
          ? TableItems.filter(function(i) {
              return i.title?.toLowerCase().indexOf(prevState.filterName) > -1;
            })
          : TableItems;
      }
      return {
        ...prevState,
        data: TableItems,
      };
    });
  };
}
