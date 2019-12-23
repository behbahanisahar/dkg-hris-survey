import React from "react";
import "./survey-intro.less";
import ISurveyIntroState from "./survey-intro-state";
import ListServices from "../../../../services/list-services";
import { IAppraisee } from "../../../../entities/appraisee";
import { TableHead, TableRow, TableCell, LinearProgress } from "@material-ui/core";
import { MDBTable, MDBTableBody } from "mdbreact";
import { getIntroTextFa, getIntroTextEn } from "./survey-intro-text";
import { NoContent } from "../../../nominationForm/components/no-content/no-content";
import ISurveyIntroProps from "./survey-intro-props";

import Context from "../../../../utilities/context";
import { Final } from "../../../nominationForm/components/no-content/Final-survey";
import { DKSpinner } from "../../../../core/components/spinner/spinner";

export default class SurveyIntroPage extends React.Component<ISurveyIntroProps, ISurveyIntroState> {
  private ListService: ListServices;
  public constructor(props: any) {
    super(props);
    this.ListService = new ListServices();

    this.state = {
      appraisee: [],
      showSpinner: true,
      buttonText: "نمایش بیشتر...",
    };
  }
  public async componentDidMount() {
    document.title = "Survey Intro";
    let username = this.props.match != undefined ? this.props.match.params.username : "";
    if (username == null) username = "";

    await this.ListService.getAppraisee(username).then(appraisee => {
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
                  <div className="intro sidebar-box">
                    <p dangerouslySetInnerHTML={{ __html: getIntroTextFa() }}></p>
                  </div>
                </div>
              </div>
              <div className="col-sm">
                <div className="kt-sc__content">
                  <div className="intro-en sidebar-box">
                    <p dangerouslySetInnerHTML={{ __html: getIntroTextEn() }}></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button
            onClick={e => {
              this.showContent();
              e.preventDefault();
              return false;
            }}
            style={{ margin: "1% auto" }}
            className="d-flex justify-content-center 
btn btn-sm btn-clean read-more  w-25"
          >
            {this.state.buttonText}
          </button>
        </div>
        <div className="kt-portlet kt-portlet--height-fluid kt-sc-2">
          {this.state.showSpinner && <DKSpinner />}
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
    if (Context.userId === 9 || Context.userId === 2 || Context.userId === 3) {
      if (this.state.appraisee.length === 0) {
        return (
          <TableRow>
            <TableCell align="center" colSpan={3} className="emptyRowLog">
              <NoContent></NoContent>
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
                    {n.user.avatarUrl === undefined && <p className="NoAvatar">{n.user.avatarTextPlaceholder}</p>}
                    {n.user.avatarUrl !== undefined && <img alt={n.user.title} src={n.user.avatarUrl} />}
                  </div>
                  <div className="kt-user-card-v2__details">
                    {n.status.status !== "تکمیل شده" && (
                      <a
                        onClick={(e: any) => {
                          this.onShowItem(n.nominationItemId);
                          e.preventDefault();
                          return false;
                        }}
                        className="kt-user-card-v2__name pointer"
                      >
                        {n.user.title}
                      </a>
                    )}

                    {n.status.status === "تکمیل شده" && (
                      <span className="kt-user-card-v2__name pointer">{n.user.title}</span>
                    )}

                    <span className="kt-user-card-v2__desc">{n.hasCoworker === true ? "Colleague" : n.relation}</span>
                  </div>{" "}
                </div>
              </TableCell>

              <TableCell style={{ width: "20%" }} className="kt-datatable__cell" align="left">
                <div className="progress-details ">
                  <span className="progress-status">{n.status.status}</span>
                  <span className="progress-number">{n.status.status !== "تکمیل شده" ? n.status.progress : 100}%</span>
                </div>
                <LinearProgress
                  className={n.status.status === "تکمیل شده" ? "complete-progress" : "not-completed-progress"}
                  variant="determinate"
                  value={n.status.status !== "تکمیل شده" ? n.status.progress : 100}
                />
              </TableCell>
              {n.status.status !== "تکمیل شده" && (
                <TableCell style={{ width: "2%" }} className="kt-datatable__cell" align="center">
                  <button
                    className="btn btn-sm btn-bold btn-brand-hover"
                    onClick={(e: any) => {
                      this.onShowItem(n.nominationItemId);
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
    } else {
      return (
        <TableRow>
          <TableCell align="center" colSpan={3} className="emptyRowLog">
            <Final></Final>
          </TableCell>
        </TableRow>
      );
    }
  };

  private onShowItem = (ItemId: number) => {
    window.location.href = "#/surveyform/" + ItemId;
  };
  private showContent = () => {
    const myComponent = document.getElementById("expand");
    if (myComponent) {
      if (myComponent.className === "collapse") {
        const collapsableLength = document.getElementsByClassName("collapse").length;
        this.setState(prevState => {
          return {
            ...prevState,
            buttonText: "نمایش کمتر...",
          };
        });
        if (collapsableLength !== 0) {
          for (let i = 0; i < collapsableLength; ++i) {
            document.getElementsByClassName("collapse")[0].className = "collapse-show";
          }
        }
      } else if (myComponent.className === "collapse-show") {
        const collapsableLength = document.getElementsByClassName("collapse-show").length;
        this.setState(prevState => {
          return {
            ...prevState,
            buttonText: "نمایش بیشتر...",
          };
        });
        if (collapsableLength !== 0) {
          for (let i = 0; i < collapsableLength; ++i) {
            document.getElementsByClassName("collapse-show")[0].className = "collapse";
          }
        }
      }
    }
  };
}
