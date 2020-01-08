import { Tooltip } from "@material-ui/core";
import Sort from "@material-ui/icons/Sort";
import * as React from "react";
import { DKPortlet } from "../../../core/components/portlet/portlet";
import { DKSpinner } from "../../../core/components/spinner/spinner";
import DKSVGIcon from "../../../core/components/svg-icon/svg-icon";
import AggregateServices from "../../../services/aggregate-service/aggregate-dashboard-service";
import { AggregateReportProps } from "../aggregate-report-props";
import Heatmap from "./../../../entities/aggregate-report/heatmap";
import { HeataImprovement } from "./heatmap-improvement";
import { HeataMapLegend } from "./heatmap-legend";
import "./heatmap.css";
import { NoContent } from "../../nominationForm/components/no-content/no-content";

let allitems: any[] = [];

interface IState {
  data: Heatmap[];
  showAll: boolean;
  isFetching: boolean;
  buttonText: string;
  filterName: string;
  order: string;
  orderBy: string;
}
export default class HeatMap extends React.Component<AggregateReportProps, IState> {
  private AggregateServices: AggregateServices;
  public constructor(props: any) {
    super(props);
    this.AggregateServices = new AggregateServices();
    this.state = {
      showAll: false,
      isFetching: true,
      data: [],
      buttonText: "Show All",
      filterName: "",
      order: "asc",
      orderBy: "rank",
    };
  }
  public async componentWillReceiveProps(nextProps: AggregateReportProps) {
    if (JSON.stringify(nextProps) !== JSON.stringify(this.props)) {
      this.getData(nextProps);
    }
  }
  public async getData(props: AggregateReportProps) {
    this.setState(current => ({
      ...current,
      isFetching: true,
    }));
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
          <div style={{ width: "100%" }}>
            <HeataMapLegend></HeataMapLegend>
            <table className="heatmap-table table mt-3 table-sm">
              <thead style={{ position: "sticky" }} className=" dk-brand-grey">
                <tr>
                  <th className="heatmap-header none-thead" style={{ backgroundColor: "#fff!important" }}>
                    {/* {this.state.data?.length >= 40 && (
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
                    )} */}
                    <Tooltip title="Sort By Rank" aria-label="sort" arrow>
                      <Sort
                        style={{ color: "black", cursor: "pointer" }}
                        onClick={(event: any) => this.onChangeSorting()}
                      />
                    </Tooltip>
                  </th>
                  <th className="heatmap-header  none-thead"></th>
                  <th colSpan={1} className="heatmap-header  none-thead" style={{ backgroundColor: "#fff!important" }}>
                    <input
                      value={this.state.filterName}
                      onChange={this.onFilterTable}
                      placeholder="Search...    "
                      className="form-control input-search"
                    />
                  </th>

                  <th className="heatmap-header">Customer Centric</th>
                  <th className="heatmap-header">Builder approach and Result oriented</th>
                  <th className="heatmap-header">Drive for Excellence</th>
                  <th className="heatmap-header">Teamwork</th>
                  <th className="heatmap-header">Decision Making</th>
                  <th className="heatmap-header">Managing People</th>
                  <th className="heatmap-header">Developing Vision & Strategy</th>
                  <th className="heatmap-header">Business Acumen</th>
                  <th className="heatmap-header">Average Rate</th>
                  <th className="heatmap-header">#Assessors</th>
                  <th className="heatmap-header"></th>
                </tr>
              </thead>
              <tbody>{this.onRenderTable()}</tbody>
            </table>
          </div>
        )}
      </DKPortlet>
    );
  }
  private onRenderTable = () => {
    if (this.state.data.length === 0) {
      return (
        <tr>
          <td align="center" colSpan={12}>
            <NoContent language="en" showPicture={false} />
          </td>
        </tr>
      );
    } else {
      return this.stableSort(this.state.data, this.getSorting(this.state.order, this.state.orderBy)).map(
        (n: Heatmap, index: number) => {
          return (
            <>
              {this.state.data.length > 40 && this.state.showAll === false && index == 21 && (
                <tr className="showmore">
                  <td
                    className="text-center p-0"
                    onClick={(e: any) => {
                      this.onShowItem();
                      e.preventDefault();
                      return false;
                    }}
                    colSpan={13}
                  >
                    <DKSVGIcon iconName="Arrows-v" width="24" height="24" color="red"></DKSVGIcon>
                    {/* <section className="seeMore">
                      <span
                        onClick={(e: any) => {
                          this.onShowItem();
                          e.preventDefault();
                          return false;
                        }}
                      >
                        Show all
                      </span>
                    </section> */}
                  </td>
                </tr>
              )}
              <tr key={index} className={this.ChangeTrClass(index)}>
                <td style={{ width: "1%" }} align="center">
                  {n.rank + 1 ?? 0}
                </td>
                <td>
                  <span style={{ fontSize: "10px", fontStyle: "italic" }}>{n?.department}</span>
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
            </>
          );
        },
      );
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
          showAll: !prevState.showAll,
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
      filterName: event.target.value?.toLowerCase(),
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
  /**************************sorting functions*********************************************** */
  private desc(a: any, b: any, orderBy: any) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }
  private stableSort(array: any, cmp: any) {
    const stabilizedThis = array.map((el: any, index: any) => [el, index]);
    stabilizedThis.sort((a: any, b: any) => {
      const order = cmp(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el: any) => el[0]);
  }

  private getSorting(order: any, orderBy: any) {
    return order === "desc"
      ? (a: any, b: any) => this.desc(a, b, orderBy)
      : (a: any, b: any) => -this.desc(a, b, orderBy);
  }
  private onChangeSorting = () => {
    if (this.state.order === "asc") {
      this.setState(prevState => {
        return {
          ...prevState,
          order: "desc",
        };
      });
    } else {
      this.setState(prevState => {
        return {
          ...prevState,
          order: "asc",
        };
      });
    }
  };
}
