import React from "react";
import { TableHead, TableRow, TableCell } from "@material-ui/core";
import { MDBTable, MDBTableBody } from "mdbreact";
import IDashboardIntroProps from "./dashboard-intro-props";
import IDashboardIntroState from "./dashboard-intro-state";
import { NoContent } from "../../nominationForm/components/no-content/no-content";
import ReportServices from "../../../services/report-services";
import Spinner from "../../spinner/spinner";

import IReportUsers from "../../../entities/reports/report-intro-users";

export default class DashboardIntroPage extends React.Component<IDashboardIntroProps, IDashboardIntroState> {
  private ReportServices: ReportServices;
  public constructor(props: IDashboardIntroProps) {
    super(props);
    this.ReportServices = new ReportServices();

    this.state = {
      showSpinner: true,
      items: {
        Users: [],
      },
    };
  }
  public async componentDidMount() {
    document.title = "Report Intro";
    const username = this.props.match.params.username;
    await this.ReportServices.getReportIntro(username).then(response => {
      this.setState(current => ({
        ...current,
        items: response,
      }));
    });
  }
  public render() {
    return (
      <div className="rtl survey-intro">
        <div>content</div>
        <div className="kt-portlet kt-portlet--height-fluid kt-sc-2">
          {this.state.showSpinner && <Spinner />}
          {!this.state.showSpinner && (
            <div>
              <div className="kt-portlet__head">
                <div className="kt-portlet__head-label">
                  <h3 className="kt-portlet__head-title">نیرو های تحت سرپرستی</h3>
                </div>
              </div>
              <div className="kt-portlet__body">
                <MDBTable className="kt-datatable__table" borderless>
                  <TableHead>{/* <TableRow>{this.renderHeader(this.tableHeaders)}</TableRow> */}</TableHead>
                  <MDBTableBody className="kt-datatable__body">{this.onRenderRows()}</MDBTableBody>
                </MDBTable>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  private onRenderRows = () => {
    if (this.state.items.Users == undefined || this.state.items.Users.length === 0) {
      return (
        <TableRow>
          <TableCell align="center" colSpan={3} className="emptyRowLog">
            <NoContent></NoContent>
          </TableCell>
        </TableRow>
      );
    } else {
      return this.state.items.Users.map((n: IReportUsers, index: any) => {
        return (
          <TableRow key={index} className="kt-datatable__row">
            <TableCell align="right" className="kt-datatable__cell">
              <div className="kt-user-card-v2">
                <div className="kt-user-card-v2__pic">
                  {n.User.AvatarUrl === null && <p className="NoAvatar">{n.User.AvatarTextPlaceholder}</p>}
                  {n.User.AvatarUrl !== null && <img alt={n.User.Title} src={n.User.AvatarUrl} />}
                </div>
                <div className="kt-user-card-v2__details">
                  <a
                    onClick={(e: any) => {
                      this.onShowItem(n.NominationId);
                      e.preventDefault();
                      return false;
                    }}
                    className="kt-user-card-v2__name pointer"
                  >
                    {n.User.Title}
                  </a>

                  <span className="kt-user-card-v2__name pointer">{n.User.Title}</span>
                </div>{" "}
              </div>
            </TableCell>

            <TableCell style={{ width: "2%" }} className="kt-datatable__cell" align="center">
              <button
                className="btn btn-sm btn-bold btn-brand-hover"
                onClick={(e: any) => {
                  this.onShowItem(n.NominationId);
                  e.preventDefault();
                  return false;
                }}
              >
                ارزیابی
              </button>
            </TableCell>
          </TableRow>
        );
      });
    }
  };

  private onShowItem = (ItemId: number) => {
    window.location.href = "#/surveyform/" + ItemId;
  };
}
