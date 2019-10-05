import React from "react";
import INominationIntroState from "./nomination-intro-state";
import ListServices from "../../../../services/list-services";

import { TableRow, TableCell } from "@material-ui/core";
import UserTasks from "../../../../entities/user-task";
import { MDBTable, MDBTableBody, MDBBtn } from "mdbreact";
import SurveyHeaderBackground from "./../../../../assets/img/survey-intro-header.png";

export default class NominationIntroPage extends React.Component<{}, INominationIntroState> {
  private ListService: ListServices;
  public constructor(props: any) {
    super(props);
    this.ListService = new ListServices();
    this.state = {
      nominationTasks: [],
    };
  }
  public async componentDidMount() {
    document.title = "Nomination Intro";
    await this.ListService.getNominationTasks().then(nominationTasks => {
      this.setState(prevState => {
        return {
          ...prevState,
          nominationTasks,
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
          <div>
            <div className="kt-portlet__head">
              <div className="kt-portlet__head-label">
                <h3 className="kt-portlet__head-title">نفرات ارزیابی</h3>
              </div>
            </div>
            <div className="kt-portlet__body">
              <MDBTable className="kt-datatable__table" borderless>
                <MDBTableBody>{this.onRenderRows()}</MDBTableBody>
              </MDBTable>
            </div>
          </div>
        </div>
      </div>
    );
  }
  /**************************** Repeat Table ****************************** */
  private onRenderRows = () => {
    return this.state.nominationTasks.map((n: UserTasks, index: any) => {
      return (
        <TableRow key={index}>
          <TableCell style={{ width: "3%" }} align="center">
            {index + 1}
          </TableCell>
          <TableCell align="center">{n.Title}</TableCell>
          <TableCell style={{ width: "3%" }} align="center">
            <MDBBtn className="show-item" onClick={() => this.onShowItem(n.ItemId)}>
              نمایش
            </MDBBtn>
          </TableCell>
        </TableRow>
      );
    });
  };
  /************************************************************* */
  private onShowItem = (ItemId: number) => {
    window.location.href = "?itemid=" + ItemId + "&page=NominationForm";
  };
}
