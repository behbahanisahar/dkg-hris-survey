import React from "react";
import ISurveyIntroState from "./survey-intro-state";
import ListServices from "../../../../services/list-services";
import { IAppraisee } from "../../../../entities/appraisee";
import "./survey-intro.css";
import { TableHead, TableRow, TableCell, LinearProgress } from "@material-ui/core";
import { MDBTable, MDBTableBody } from "mdbreact";
import Spinner from "../../../spinner/spinner";
// import AvatarUrl from "../../../../assets/img/DefaultAvatar.png";
import SurveyHeaderBackground from "./../../../../assets/img/survey-intro-header.png";

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
      <div className="rtl">
        <div className="kt-portlet kt-sc-2">
          <div className="kt-portlet__body">
            <div className="row">
              <div className="col-sm">
                <img src={SurveyHeaderBackground} className="kt-svg-icon" alt="survey-intro"></img>
              </div>
              <div className="col-sm">
                <div className="kt-sc__content">
                  <h2 className="kt-sc__title">همکار محترم</h2>
                  <div className="intro">
                    <p>
                      {`این پرسشنامه‌ به منظور ارزیابی 360 درجه رهبران شرکت دیجی‎کالا طراحی شده است، لذا خواهشمند است با در نظر گرفتن تعاملاتی که در موقعیت‎های مختلف کاری برای تحقق اهداف عملکردی در طول حداقل 6 ماه اخیر
                      با فرد ارزیابی شونده داشتید، نسبت به تکمیل پرسشنامه زیر اقدام نمایید.`}
                      <br />
                      {`
                      زمانی می توانید بازخوردهای خود را ثبت نمایید که به تمامی سوالات پاسخ داده باشید.

                      اطمینان داشته باشید که اطلاعات جمع آوری شده از این پرسشنامه، کاملا بدون نام و محرمانه خواهد بود.

                      تمام اطلاعات جمع آوری شده در راستای توسعه شایستگی‎های رهبری مورد استفاده قرار خواهد گرفت.

                      همکاری و مشارکت شما در پاسخ به این پرسشنامه، بسیار مهم و ارزشمند خواهد بود.

                      پیشاپیش از حسن توجه و دقت شما در تکمیل این فرم، کمال تشکر و قدردانی را داریم.

                      

                      با سپاس فراوان

                      مدیریت منابع انسانی`}
                    </p>
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
  /**************************** Repeat Table ****************************** */
  private onRenderRows = () => {
    return this.state.appraisee.map((n: IAppraisee, index: any) => {
      return (
        <TableRow key={index} className="kt-datatable__row">
          <TableCell align="right" className="kt-datatable__cell">
            <div className="kt-user-card-v2">
              <div className="kt-user-card-v2__pic">
                {/* <img alt={n.User.Title} src={n.User.AvatarUrl === null ? AvatarUrl : n.User.AvatarUrl} /> */}

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

                {n.Status.Status === "تکمیل شده" && <a className="kt-user-card-v2__name pointer">{n.User.Title}</a>}

                <span className="kt-user-card-v2__desc">{n.Relation}</span>
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
  };
  /************************************************************* */
  private onShowItem = (ItemId: number) => {
    window.location.href = "?itemid=" + ItemId + "&page=SurveyForm";
  };
  /*********************************************************** */
}
