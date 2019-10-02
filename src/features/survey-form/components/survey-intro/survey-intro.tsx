import React from "react";
import ISurveyIntroState from "./survey-intro-state";
import ListServices from "../../../../services/list-services";
import { IAppraisee } from "../../../../entities/appraisee";
import "./survey-intro.css";
import { Card, TableHead, TableRow, TableCell, LinearProgress } from "@material-ui/core";

import { MDBBtn, MDBTable, MDBTableBody, MDBRow, MDBCol } from "mdbreact";
import Spinner from "../../../../spinner/spinner";
// import { lighten, withStyles } from "@material-ui/core/styles";

// const BorderLinearProgress = withStyles({
//   root: {
//     height: 6,
//     backgroundColor: lighten("#DEDFE0", 0.5),
//     borderRadius: 30,
//   },
//   bar: {
//     borderRadius: 30,
//     //   backgroundColor: "  #19BFD3",
//   },
// })(LinearProgress);
export default class SurveyIntroPage extends React.Component<{}, ISurveyIntroState> {
  private ListService: ListServices;
  // private tableHeaders: ITableHeader[];
  public constructor(props: any) {
    super(props);
    this.ListService = new ListServices();
    // this.tableHeaders = [
    //   { id: "Row", label: "ردیف" },
    //   { id: "Title", label: "ارزیابی شونده" },
    //   { id: "Status", label: "وضعیت" },
    //   { id: "Progress", label: "درصد تکمیل" },
    //   { id: "action", label: "نمایش" },
    // ];
    this.state = {
      appraisee: [],
      showSpinner: true,
    };
  }
  public async componentDidMount() {
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
      <div>
        <Card className="intro-card">
          <div className="intro">
            {`همکار محترم 
 این پرسشنامه‌ به منظور ارزیابی 360 درجه رهبران شرکت دیجی‎کالا طراحی شده است، لذا خواهشمند است با در نظر گرفتن تعاملاتی که در موقعیت‎های مختلف کاری برای تحقق اهداف عملکردی در طول حداقل 6 ماه اخیر
 با فرد ارزیابی شونده داشتید، نسبت به تکمیل پرسشنامه زیر اقدام نمایید.`}{" "}
            <br />
            {`
زمانی می توانید بازخوردهای خود را ثبت نمایید که به تمامی سوالات پاسخ داده باشید.

 اطمینان داشته باشید که اطلاعات جمع آوری شده از این پرسشنامه، کاملا بدون نام و محرمانه خواهد بود.

تمام اطلاعات جمع آوری شده در راستای توسعه شایستگی‎های رهبری مورد استفاده قرار خواهد گرفت.

همکاری و مشارکت شما در پاسخ به این پرسشنامه، بسیار مهم و ارزشمند خواهد بود.

پیشاپیش از حسن توجه و دقت شما در تکمیل این فرم، کمال تشکر و قدردانی را داریم.

 

با سپاس فراوان

مدیریت منابع انسانی`}
          </div>
          {this.state.showSpinner && <Spinner />}
          {!this.state.showSpinner && (
            <MDBRow>
              <MDBCol />
              <MDBCol>
                <Card dir="rtl" style={{ margin: "3% 3% 2% 0" }}>
                  <MDBTable className="table" borderless>
                    <TableHead>{/* <TableRow>{this.renderHeader(this.tableHeaders)}</TableRow> */}</TableHead>
                    <MDBTableBody>{this.onRenderRows()}</MDBTableBody>
                  </MDBTable>
                </Card>
              </MDBCol>
            </MDBRow>
          )}
        </Card>
      </div>
    );
  }
  /**************************** Repeat Table ****************************** */
  // private renderHeader = (columnDetail: any[]) => {
  //   return columnDetail.map(
  //     row => (
  //       <TableCell align="center" key={row.id} sortDirection="desc">
  //         {row.label}
  //       </TableCell>
  //     ),
  //     this,
  //   );
  // };

  private onRenderRows = () => {
    console.log(this.state.appraisee);
    return this.state.appraisee.map((n: IAppraisee, index: any) => {
      return (
        <TableRow key={index}>
          <TableCell align="right">
            <img className="user-img" src={n.UserAvatar} />
            {n.Title}

            <div className="Relation">{n.Relation}</div>
          </TableCell>

          <TableCell
            style={{ width: "5%" }}
            align="right"
            className={n.Status === "تکمیل شده" ? "completed" : "not-completed"}
          >
            <div style={{ marginTop: "10%" }}> {n.Status}</div>
          </TableCell>
          <TableCell style={{ width: "20%" }} align="left">
            {n.Progress}%
            <LinearProgress
              className={Number(n.Progress) >= 100 ? "complete-progress" : "not-completed-progress"}
              variant="determinate"
              value={n.Progress}
            />
          </TableCell>
          <TableCell style={{ width: "2%" }} align="center">
            <MDBBtn className="show-item" onClick={() => this.onShowItem(n.NominationItemId)}>
              نمایش
            </MDBBtn>
          </TableCell>
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
