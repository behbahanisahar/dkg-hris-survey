import React from "react";
import { TableHead, TableRow, TableCell, TablePagination } from "@material-ui/core";
import { MDBTable, MDBTableBody } from "mdbreact";
import IDashboardIntroProps from "./dashboard-intro-props";
import IDashboardIntroState from "./dashboard-intro-state";
import { NoContent } from "../../nominationForm/components/no-content/no-content";
import ReportServices from "../../../services/report-services";
import Spinner from "../../spinner/spinner";
import "./dashboard-intro.css";

import IReportUsers from "../../../entities/reports/report-intro-users";
import { DKPortlet } from "../../../core/components/portlet/portlet";
import DKSVGIcon from "../../../core/components/svg-icon/svg-icon";
let allitems: any[] = [];
export default class DashboardIntroPage extends React.Component<IDashboardIntroProps, IDashboardIntroState> {
  private ReportServices: ReportServices;
  public constructor(props: IDashboardIntroProps) {
    super(props);
    this.ReportServices = new ReportServices();

    this.state = {
      showSpinner: true,
      filterName: "",
      order: "asc",
      orderBy: "",
      page: 0,
      rowsPerPage: 10,
      items: {
        users: [],
      },
      users: [],
    };
  }
  public async componentDidMount() {
    var username = this.props.match.params.username;
    if (username == undefined) username = "";
    await this.ReportServices.getReportIntro(username).then(response => {
      document.title = "Dashoard Intro";
      this.setState(current => ({
        ...current,
        items: response,
        showSpinner: false,
        users: response.Users,
      }));
    });
    allitems = this.state.items.users;
  }

  public render() {
    const searchBox = (
      <input
        value={this.state.filterName}
        onChange={this.onFilterTable}
        placeholder="جستجو    "
        className="form-control input-search"
      />
    );

    return (
      <div className="rtl survey-intro">
        <div>content</div>
        {this.state.showSpinner && <Spinner />}
        {!this.state.showSpinner && (
          <DKPortlet headerToolbar={searchBox} title="">
            <MDBTable className="kt-datatable__table" borderless>
              <TableHead>{/* <TableRow>{this.renderHeader(this.tableHeaders)}</TableRow> */}</TableHead>
              <MDBTableBody className="kt-datatable__body">{this.onRenderRows()}</MDBTableBody>
            </MDBTable>
            {this.state.users?.length > this.state.rowsPerPage && (
              <TablePagination
                // dir="ltr"
                className="kt-pagination kt-pagination--brand"
                rowsPerPageOptions={[5, 15, 25]}
                component="div"
                count={this.state.items.users.length}
                rowsPerPage={this.state.rowsPerPage}
                page={this.state.page}
                backIconButtonProps={{
                  "aria-label": "Next Page",
                }}
                nextIconButtonProps={{
                  "aria-label": "Previous Page",
                }}
                onChangePage={this.handleChangePage}
                onChangeRowsPerPage={this.handleChangeRowsPerPage}
                labelRowsPerPage="تعداد آیتم در هر صفحه :"
                labelDisplayedRows={({ from, to, count }) => `${from}-${to} از ${count}`}
              />
            )}
          </DKPortlet>
        )}
      </div>
    );
  }

  private onRenderRows = () => {
    if (this.state.items.users?.length === 0) {
      return (
        <TableRow>
          <TableCell align="center" colSpan={3} className="emptyRowLog">
            <NoContent></NoContent>
          </TableCell>
        </TableRow>
      );
    } else {
      return this.stableSort(this.state.items.users, this.getSorting(this.state.order, this.state.orderBy))
        .slice(
          this.state.page * this.state.rowsPerPage,
          this.state.page * this.state.rowsPerPage + this.state.rowsPerPage,
        )
        .map((n: IReportUsers, index: any) => {
          return (
            <TableRow key={index} className="kt-datatable__row">
              <TableCell className="category-icon">
                {n.category == "1-Self" && (
                  <span title="Self">
                    <DKSVGIcon iconName="Star"></DKSVGIcon>
                  </span>
                )}
                {n.category == "2-Direct" && (
                  <span title="Direct">
                    <DKSVGIcon iconName="Group"></DKSVGIcon>
                  </span>
                )}
              </TableCell>
              <TableCell align="right" className="kt-datatable__cell">
                <div className="kt-user-card-v2">
                  <div className="kt-user-card-v2__pic">
                    {(n.user.avatarUrl === null || n.user.avatarUrl === undefined) && (
                      <p className="NoAvatar">{n.user.avatarTextPlaceholder}</p>
                    )}
                    {(n.user.avatarUrl !== null || n.user.avatarUrl !== undefined) && (
                      <img alt={n.user.sPLatinFullName} src={n.user.avatarUrl} />
                    )}
                  </div>
                  <div className="kt-user-card-v2__details">
                    <a
                      onClick={(e: any) => {
                        this.onShowItem(n.nominationId);
                        e.preventDefault();
                        return false;
                      }}
                      className="kt-user-card-v2__name pointer"
                    >
                      {n.user.title}
                    </a>
                    <a className="kt-user-card-v2__email kt-link">{n.user.emailAddress}</a>
                  </div>
                </div>
              </TableCell>
              <TableCell className={"kt-font-bold text-center " + n.user.cLevel}>
                {n.user.cLevel} <span className="kt-badge kt-badge--dot"></span>
              </TableCell>
              <TableCell className="kt-datatable__cell text-center">
                {n.user.reportedPost}
                {" @ "}
                {n.user.department}
              </TableCell>

              <TableCell style={{ width: "10%" }} className="kt-datatable__cell" align="center">
                <button
                  className="btn btn-sm btn-bold btn-brand-hover"
                  onClick={(e: any) => {
                    this.onShowItem(n.nominationId);
                    e.preventDefault();
                    return false;
                  }}
                >
                  مشاهده گزارش
                </button>
              </TableCell>
            </TableRow>
          );
        });
    }
  };
  private onShowItem = (ItemId: number) => {
    window.open("#/dashboard/" + ItemId, "_blank");
  };
  private onFilterTable = (event: any) => {
    this.setState({
      filterName: event.target.value,
    });

    this.filterBox();
  };
  private filterBox = () => {
    this.setState(prevState => {
      let TableItems: any[] = allitems; // this.state.items.Users;
      if (prevState.filterName) {
        TableItems = prevState.filterName.toLowerCase()
          ? TableItems.filter(function(i) {
              return (
                i.User.cLevel?.toLowerCase().indexOf(prevState.filterName) > -1 ||
                i.User.department?.toLowerCase().indexOf(prevState.filterName) > -1 ||
                i.User.sPLatinFullName?.toLowerCase().indexOf(prevState.filterName) > -1 ||
                i.User.title?.toLowerCase().indexOf(prevState.filterName) > -1 ||
                i.User.emailAddress?.toLowerCase().indexOf(prevState.filterName) > -1
              );
            })
          : TableItems;
      }
      return {
        ...prevState,
        items: {
          ...prevState.items,
          users: TableItems,
        },
      };
    });
  };
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
    const stabilizedThis = array?.map((el: any, index: any) => [el, index]);
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
  private handleChangePage = (event: any, page: any) => {
    this.setState({ page });
  };
  private handleChangeRowsPerPage = (event: any) => {
    this.setState({ rowsPerPage: event.target.value });
  };
}
