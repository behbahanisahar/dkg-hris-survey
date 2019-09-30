import React from "react";
import ISurveyIntroState from "./survey-intro-state";
import ListServices from "../../../../services/list-services";
import { IAppraisee } from "../../../../entities/appraisee";
import "./survey-intro.css";
import { Card, Table, TableHead, TableRow, TableBody, TableCell, LinearProgress } from "@material-ui/core";
import ITableHeader from "../../../../entities/table-headers";
import { MDBBtn } from "mdbreact";
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
  private tableHeaders: ITableHeader[];
  public constructor(props: any) {
    super(props);
    this.ListService = new ListServices();
    this.tableHeaders = [
      { id: "Row", label: "ردیف" },
      { id: "Title", label: "ارزیابی شونده" },
      { id: "Relation", label: "ارتباط" },
      { id: "Status", label: "وضعیت" },
      { id: "Progress", label: "درصد تکمیل" },
      { id: "action", label: "نمایش" },
    ];
    this.state = {
      appraisee: [],
    };
  }
  public async componentDidMount() {
    await this.ListService.getAppraisee().then(appraisee => {
      this.setState(prevState => {
        return {
          ...prevState,
          appraisee,
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
          <div>
            <Card className="CardTable">
              <Table className="table">
                <TableHead>
                  <TableRow>{this.renderHeader(this.tableHeaders)}</TableRow>
                </TableHead>
                <TableBody>{this.onRenderRows()}</TableBody>
              </Table>
            </Card>
          </div>
        </Card>
      </div>
    );
  }
  /**************************** Repeat Table ****************************** */
  private renderHeader = (columnDetail: any[]) => {
    return columnDetail.map(
      row => (
        <TableCell align="center" key={row.id} sortDirection="desc">
          {row.label}
        </TableCell>
      ),
      this,
    );
  };

  private onRenderRows = () => {
    console.log(this.state.appraisee);
    return this.state.appraisee.map((n: IAppraisee, index: any) => {
      return (
        <TableRow key={index}>
          <TableCell style={{ width: "1%" }} align="center">
            {index + 1}
          </TableCell>
          <TableCell align="center">
            <img className="user-img" src={n.UserAvatar} />
            {n.Title}
          </TableCell>
          <TableCell align="center">{n.Relation}</TableCell>
          <TableCell align="center" className={n.Status === "تکمیل شده" ? "completed" : "not-completed"}>
            {n.Status}
          </TableCell>
          <TableCell align="left">
            {n.Progress}%
            <LinearProgress
              className={Number(n.Progress) >= 100 ? "complete-progress" : "not-completed-progress"}
              variant="determinate"
              value={n.Progress}
            />
          </TableCell>
          <TableCell style={{ width: "3%" }} align="center">
            <MDBBtn onClick={() => this.onShowItem(n.NominationItemId)}>نمایش</MDBBtn>
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
