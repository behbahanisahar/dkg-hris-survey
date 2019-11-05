import React from "react";
import INominationIntroState from "./nomination-intro-state";
import ListServices from "../../../../services/list-services";
import { TableRow, TableCell } from "@material-ui/core";
import UserTasks from "../../../../entities/user-task";
import { MDBTable, MDBTableBody } from "mdbreact";
import "./nomination-intro.css";

import Spinner from "../../../spinner/spinner";
import { NoContent } from "../no-content/no-content";

export default class NominationIntroPage extends React.Component<{}, INominationIntroState> {
  private ListService: ListServices;
  public constructor(props: any) {
    super(props);
    this.ListService = new ListServices();
    this.state = {
      nominationTasks: [],
      showSpinner: true,
    };
  }
  public async componentDidMount() {
    document.title = "Nomination Intro";
    await this.ListService.getNominationTasks().then(nominationTasks => {
      this.setState(prevState => {
        return {
          ...prevState,
          showSpinner: false,
          nominationTasks,
        };
      });
    });
  }
  public render() {
    return (
      <div className="rtl nomination-intro">
        <div className="kt-portlet kt-sc-2">
          <div className="kt-portlet__body">
            <div className="row">
              <div className="col-sm">
                {/* <img src={SurveyHeaderBackground} className="kt-svg-icon" alt="survey-intro"></img> */}
                <div className="kt-sc__content">
                  <b className="kt-sc__title ">همکاران گرامی</b>
                  <br />
                  <div className="intro">
                    <p>
                      {`
                     اولین مرحله بازخورد 360 درجه، انتخاب افرادی است که می‌توانند به شما به‌منظور شناخت بهتر نقاط قوت و قابل بهبودتان، بازخورد دهند. 
                     به منظور دقت بیشتر در انتخاب این افراد، 4 مرحله تعریف شده است. ابتدا شما افراد مورد نظر خود را انتخاب می‌کنید، پس از آن مدیر مستقیم و HRBP در صورت صلاح دید تغییرات مورد نیاز را اعمال می‌کنند. در انتها، C-level شما در صورت نیاز لیست مذکور را ویرایش خواهد کرد.
                                
`}
                      <br />
                      {`
                      در هنگام معرفی افراد لطفا نکات زیر را در نظر داشته باشید:

                   •	نام مدیر مستقیم شما بصورت پیش‌فرض در سامانه تعریف و در بالای صفحه نمایش داده شده است (غیر قابل ویرایش). لطفا در صورت اشتباه بودن نام مدیر مستقیم، با افراد ذکر شده در انتهای صفحه تماس بگیرید.
                   •	همچنین نام نیروهای تحت سرپرستی مستقیم شما نیز بصورت پیش‌فرض نمایش داده می‌شود (قابل ویرایش).
                   •	شما می‌بایست بین 3 تا 15 نفر را در هر کدام از گروه‌های "نیروی مستقیم تحت سرپرستی"، "همکاران همرده" و "مشتریان داخلی یا نیروی غیرمستقیم تحت سرپرستی" معرفی نمائید. در صورت انتخاب بیشتر یا کمتر از این تعداد، پیام خطایی برای شما نمایش داده خواهد شد. 
                   •	به منظور اعتبار بیشتر نتایج، افرادی را انتخاب کنید که بیش از 6 ماه با آن‌ها در موقعیت‎های مختلف کاری تعامل داشته‌اید. 
                   •	در فرم انتخاب افراد، در کنار عنوان هر کدام از گروه‌ها دکمه قرمز رنگی قرار داده شده که عنوان گروه را به انگلیسی، برای شما نمایش می‌دهد.
                   •	برای جستجوی نام هر فرد می‌توانید به صورت فارسی و انگلیسی، نام یا آدرس ایمیل فرد مورد نظر را جستجو و از بین اسامی نشان داده شده، انتخاب کنید. سپس علامت مثبت (+) که در کنار محل ورود نام قرار گرفته را کلیک کنید و یا کلید Enter را بر روی کیبوردتان فشار دهید. به دلیل تشابه برخی اسم‌ها، ایمیل، واحد و سمت افراد در زیر اسم آنها قرار داده شده است.
                   •	لازم به‌ذکر است که اسم هر فرد را تنها در یک گروه می‌توانید قرار دهید.
                   •	با توجه به توضیحات بالا، افرادی که سمت مدیر یا بالاتر داشته باشند، در صورتی که نیروهای تحت سرپرستی‌شان، فرم لیست افراد مدنظر خود را تکمیل کرده باشند، فرم‌هایی با نام آن افراد را در کارتابل خود مشاهده خواهند کرد که می‌توانند با کلیک بر روی هر یک از نام‌ها، تغییرات مورد نظر خود را اعمال کنند.
                   •	پس از پایان انتخاب افراد، برای ثبت نهایی اسامی، می‌بایست دکمه تائید (در پایین صفحه) را کلیک نمائید. 
                   •	پس از ثبت فرم امکان تغییر در اطلاعات وجود نخواهد داشت.





                   در صورت داشتن هر گونه سوال یا مشکل با موهبت شعله (ایمیل: m.sholeh@digikala.com / داخلی: 6039) یا محسن علیپور (ایمیل: mohsen.alipour@digikala.com  داخلی: 6143)  تماس بگیرید.
                   پیشاپیش از همراهیتان در مسیر توسعه و تعالی دیجی کالا متشکریم.
                   

                   
             `}
                      <b> تیم توسعه و رهبری دیجی کالا</b>
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-sm">
                <div className="kt-sc__content">
                  <b className="kt-sc__title align-left">Dear Colleagues</b>
                  <br />
                  <div className="intro-en">
                    <p>
                      {`The first step in the 360-degree feedback is the selection of raters who could provide you with helpful feedback regarding your strengths and areas for improvement. 
4 distinct phases have been defined to make this process as accurate as possible. In the first phase, you choose the nominees, then your line manager and HRBP review the list and make changes if necessary. In the end, your C-level would review the list and refine it based on his preference. 
`}
                      <br />
                      {`
             Please consider the following points when selecting the nominees:

             •	The name of your line manager has already been defined in the system and will be shown on the top of the page (Not editable). If the name of your line manager is not correct please contact the people mentioned in the end of page
             •	Also, the names of your direct reports will be shown by default (Can be edited).
             •	You should nominate 3 to 15 people in each of the three categories of “Direct report”, “Peer”, and “indirect report/internal customer”. If you choose less or more than the specified range, an error message will be shown by the system.
             •	To increase the reliability of the results, please nominate people who have worked with you for at least 6 months. 
             •	In the nomination form, there is a red button on the right side of each category title that if selected will show the category titles in English.  
             •	You can search for people using their names in English/Persian or their email address and select their names from the list of names shown. Then click the plus sign (+) which is located on the left of space specified for names or alternatively press “Enter” on your keyboard. Since some names on the list are very similar, the email address, department, and position of each person is shown as well. 
             •	Each person can be nominated in only one category and nominating the same person for another category will result in an error message. 
             •	Per the explanations above, manager and above will see forms with their subordinate’s nominees if their subordinates have completed their own forms. In this case by clicking on each name, you can make necessary modifications. 
             •	After completing the nomination process, confirm your selection by clicking the “Submit” button at the bottom of the page. 
             •	After the final confirmation, you cannot change the data. 

             Should you have any questions or issues do not hesitate to contact Mouhebat Sholeh (email: m.sholeh@digikala.com / Ext: 6039) or Mohsen Alipour (Email: mohsen.alipour@digikala.com / Ext: 6143). 
Thank you in advance for your cooperation in the path toward DK’s excellence.


`}
                      <b>Talent and Leadership Development Team</b>
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
                <h3 className="kt-portlet__head-title">لیست افراد </h3>
              </div>
            </div>
            <div className="kt-portlet__body">
              {this.state.showSpinner && <Spinner className="spinner" />}
              {!this.state.showSpinner && (
                <MDBTable className="kt-datatable__table" borderless>
                  <MDBTableBody clssName="kt-datatable__body">{this.onRenderRows()}</MDBTableBody>
                </MDBTable>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
  /**************************** Repeat Table ****************************** */
  private onRenderRows = () => {
    if (this.state.nominationTasks.length === 0) {
      return (
        <TableRow>
          <TableCell align="center" colSpan={3}>
            <NoContent></NoContent>
          </TableCell>
        </TableRow>
      );
    } else {
      return this.state.nominationTasks.map((n: UserTasks, index: any) => {
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
                      this.onShowItem(n.ItemId);
                      e.preventDefault();
                      return false;
                    }}
                    className="kt-user-card-v2__name pointer"
                  >
                    {n.Title}
                  </a>
                  <span className="kt-user-card-v2__desc">{n.User.ReportedPost}</span>
                </div>
              </div>
            </TableCell>

            <TableCell style={{ width: "2%" }} className="kt-datatable__cell" align="center">
              <button
                className="btn btn-sm btn-bold btn-brand-hover"
                onClick={(e: any) => {
                  this.onShowItem(n.ItemId);
                  e.preventDefault();
                  return false;
                }}
              >
                انتخاب
              </button>
            </TableCell>
          </TableRow>
        );
      });
    }
  };
  /************************************************************* */
  private onShowItem = (ItemId: number) => {
    window.location.href = "?itemid=" + ItemId + "&page=NominationForm";
  };
}
