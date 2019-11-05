import React from "react";
import "./survey-intro.less";
import ISurveyIntroState from "./survey-intro-state";
import ListServices from "../../../../services/list-services";
import Spinner from "../../../spinner/spinner";
import { IAppraisee } from "../../../../entities/appraisee";
import { TableHead, TableRow, TableCell, LinearProgress } from "@material-ui/core";
import { MDBTable, MDBTableBody } from "mdbreact";
import { getIntroTextFa, getIntroTextEn } from "./survey-intro-text";

export default class SurveyIntroPage extends React.Component<{}, ISurveyIntroState> {
  private ListService: ListServices;
  public constructor(props: any) {
    super(props);
    this.ListService = new ListServices();

    this.state = {
      appraisee: [],
      showSpinner: true,
    };
  }
  public async componentDidMount() {
    document.title = "Survey Intro";
    await this.ListService.getAppraisee().then(appraisee => {
      this.setState(prevState => {
        return {
          ...prevState,
          appraisee,
          showSpinner: false,
        };
      });
    });
  }
  public render() {
    return (
      <div className="rtl survey-intro">
        <div className="kt-portlet kt-sc-2">
          <div className="kt-portlet__body">
            <div className="row">
              <div className="col-sm">
                <div className="kt-sc__content">
                  <div className="intro">
                    <p dangerouslySetInnerHTML={{ __html: getIntroTextFa() }}></p>
                  </div>
                </div>
              </div>
              <div className="col-sm">
                <div className="kt-sc__content">
                  <div className="intro-en">
                    <p dangerouslySetInnerHTML={{ __html: getIntroTextEn() }}></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="kt-portlet kt-portlet--height-fluid kt-sc-2">
          {this.state.showSpinner && <Spinner />}
          {!this.state.showSpinner && (
            <div>
              <div className="kt-portlet__head">
                <div className="kt-portlet__head-label">
                  <h3 className="kt-portlet__head-title">لیست ارزیابی</h3>
                </div>
              </div>
              <div className="kt-portlet__body">
                <MDBTable className="kt-datatable__table" borderless>
                  <TableHead>{/* <TableRow>{this.renderHeader(this.tableHeaders)}</TableRow> */}</TableHead>
                  <MDBTableBody clssName="kt-datatable__body">{this.onRenderRows()}</MDBTableBody>
                </MDBTable>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  private onRenderRows = () => {
    if (this.state.appraisee.length === 0) {
      return (
        <TableRow>
          <TableCell align="center" colSpan={3} className="emptyRowLog">
            موردی جهت نمایش وجود ندارد!
          </TableCell>
        </TableRow>
      );
    } else {
      return this.state.appraisee.map((n: IAppraisee, index: any) => {
        return (
          <TableRow key={index} className="kt-datatable__row">
            <TableCell align="right" className="kt-datatable__cell">
              <div className="kt-user-card-v2">
                <div className="kt-user-card-v2__pic">
                  {n.User.AvatarUrl === null && <p className="NoAvatar">{n.User.AvatarTextPlaceholder}</p>}
                  {n.User.AvatarUrl !== null && <img alt={n.User.Title} src={n.User.AvatarUrl} />}
                </div>
                <div className="kt-user-card-v2__details">
                  {n.Status.Status !== "تکمیل شده" && (
                    <a
                      onClick={(e: any) => {
                        this.onShowItem(n.NominationItemId);
                        e.preventDefault();
                        return false;
                      }}
                      className="kt-user-card-v2__name pointer"
                    >
                      {n.User.Title}
                    </a>
                  )}

                  {n.Status.Status === "تکمیل شده" && (
                    <span className="kt-user-card-v2__name pointer">{n.User.Title}</span>
                  )}

                  <span className="kt-user-card-v2__desc">{n.HasCoworker === true ? "همکار" : n.Relation}</span>
                </div>{" "}
              </div>
            </TableCell>

            <TableCell style={{ width: "20%" }} className="kt-datatable__cell" align="left">
              <div className="progress-details ">
                <span className="progress-status">{n.Status.Status}</span>
                <span className="progress-number">{n.Status.Status !== "تکمیل شده" ? n.Status.Progress : 100}%</span>
              </div>
              <LinearProgress
                className={n.Status.Status === "تکمیل شده" ? "complete-progress" : "not-completed-progress"}
                variant="determinate"
                value={n.Status.Status !== "تکمیل شده" ? n.Status.Progress : 100}
              />
            </TableCell>
            {n.Status.Status !== "تکمیل شده" && (
              <TableCell style={{ width: "2%" }} className="kt-datatable__cell" align="center">
                <button
                  className="btn btn-sm btn-bold btn-brand-hover"
                  onClick={(e: any) => {
                    this.onShowItem(n.NominationItemId);
                    e.preventDefault();
                    return false;
                  }}
                >
                  ارزیابی
                </button>
              </TableCell>
            )}
          </TableRow>
        );
      });
    }
  };

  private onShowItem = (ItemId: number) => {
    window.location.href = "?itemid=" + ItemId + "&page=SurveyForm";
  };
}
