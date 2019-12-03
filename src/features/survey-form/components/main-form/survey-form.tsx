import React from "react";
import ISurveyFromState from "./survey-form-state";
import ListServices from "../../../../services/list-services";
import { MDBRow, MDBIcon } from "mdbreact";
import "./survey-form.css";
import IQuestion from "../../../../entities/survey-questions";
import {
  Slider,
  Tooltip,
  withStyles,
  Theme,
  Typography,
  InputLabel,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@material-ui/core";
import ICategory from "../../../../entities/categories";
import { ISurveyData } from "../../../../entities/survey-data";
import Context from "../../../../utilities/context";
import Info from "@material-ui/icons/Explicit";
import Isurvey from "../../../../entities/survey";
import Spinner from "../../../spinner/spinner";
import Authentication from "../../../authentication/authentication";
import { ToastOptions, toast } from "react-toastify";
import { SurveyFormHeader } from "../survey-form-header/survey-form-header";

// const sleep = (ms: any) => new Promise(resolve => setTimeout(resolve, ms));
const HtmlTooltip = withStyles((theme: Theme) => ({
  tooltip: {
    backgroundColor: "#77787B",
    color: "#fff",
    maxWidth: 560,
    fontSize: "3px  !important",
    border: "1px solid #dadde9",
    textAlign: "left",
  },
}))(Tooltip);

interface IProps {
  match?: any;
}

class FormSurvey extends React.Component<IProps, ISurveyFromState> {
  private ListService: ListServices;
  constructor(props: any) {
    super(props);
    this.ListService = new ListServices();

    this.state = {
      userId: 0,
      open: false,
      SurveyFormData: {
        User: {
          Title: "",
          AvatarUrl: "",
          Id: 0,
          ItemId: 894,
          SPLatinFullName: "",
          Department: "",
          EmailAddress: "",
          JobGrade: "",
          ReportedPost: "",
        },
        SurveyAnswerId: 0,
        Categories: [],
        ShouldBeStarted: "",
        ShouldBeContinued: "",
        ShouldBeStopped: "",
      },
      score: "",
      radio: 1,
      marks: [],
      selectedValue: 0,
      answers: [],
      itemid: 0,
      showSpinner: true,
      submittingForm: false,
      savingForm: false,
    };
  }
  handleClickOpen = () => {
    this.setState({
      open: true,
    });
  };
  handleClose = () => {
    this.onSubmitForm("تکمیل شده", "submit");
    this.setState({
      open: false,
    });
  };
  handleCancel = () => {
    this.setState({
      open: false,
    });
  };
  public async componentDidMount() {
    document.title = "Survey Form";
    const itemid = this.props.match.params.itemId;
    const userId = this.props.match.params.userId;
    const marks = [
      {
        value: 0,
        label: " نظری ندارم\r\n no comment",
      },
      {
        value: 1,
        label: "تقریبا هیچگاه\r\n almost never",
      },
      {
        value: 2,
        label: "به ندرت\r\n seldom",
      },
      {
        value: 3,
        label: "بعضی اوقات\r\n sometimes",
      },
      {
        value: 4,
        label: "معمولا\r\n usually",
      },
      {
        value: 5,
        label: "تقریبا همیشه\r\n almost always",
      },
    ];
    await this.ListService.getSurveyFormData(Number(itemid)).then(data => {
      this.initializeAnwers(data);

      this.setState(prevState => {
        return {
          ...prevState,
          SurveyFormData: data,
          marks,
          itemid: Number(itemid),
          showSpinner: false,
          userId,
        };
      });
    });
  }

  public render() {
    if (this.state.SurveyFormData == null) {
      return null;
    }
    return (
      <div>
        {this.state.showSpinner && <Spinner />}
        {!this.state.showSpinner && (
          <div>
            {this.state.SurveyFormData.statusCode !== 200 && (
              <Authentication status={this.state.SurveyFormData.statusCode || 401 || 403} />
            )}
            {this.state.SurveyFormData.statusCode === 200 && (
              <div className="rtl">
                <div className="kt-portlet">
                  <SurveyFormHeader user={this.state.SurveyFormData.User} />
                  <div className="kt-portlet__head-label">
                    <span className="kt-portlet__head-icon kt-hidden">
                      <i className="la la-gear"></i>
                    </span>
                  </div>

                  <div className="kt-portlet__body">
                    <div>{this.onRenderCard()}</div>
                    <div className="form-group form-group-last alert alert-secondary">
                      <div className="alert-icon">
                        <MDBIcon icon="exclamation-triangle kt-font-brand fa-2x" />
                      </div>
                      در نظر داشته باشید تمامی نظرات شما در این سه بخش به طور مستقیم در گزارش فرد ارزیابی شونده آورده
                      خواهد شد. لطفا در صورت امکان به منظور ارزیابی افراد غیر ایرانی بازخوردهای خود را به زبان انگلیسی
                      بنویسید.
                    </div>
                    <div className="kt-section my-2 py-5 kt-ribbon  kt-ribbon--clip">
                      <div className={" kt-section__content kt-section__content--solid "}>
                        <div className=" kt-ribbon--clip kt-ribbon--left">
                          <div className=" kt-ribbon__target badge dk-brand-yellow mt-3">
                            <span className="kt-ribbon__inner" />
                            بازخورد کیفی
                          </div>
                        </div>
                        <div className=" kt-ribbon--clip kt-ribbon--right">
                          <div className=" kt-ribbon__target badge dk-brand-yellow  mt-3">
                            <span className="kt-ribbon__inner" />
                            Qualitative Feedback
                          </div>
                        </div>

                        <div>
                          <div className="mt-5 pt-5">
                            <InputLabel className="dk-brand-text-green" htmlFor="standard-name">
                              شروع - عادات و رفتارهایی که می بایست شروع شوند
                              <HtmlTooltip
                                title={
                                  <React.Fragment>
                                    <Typography color="inherit">Start - Behaviors & habits to start </Typography>
                                  </React.Fragment>
                                }
                              >
                                <Info color="primary" />
                              </HtmlTooltip>
                            </InputLabel>
                            <TextField
                              id="outlined-email-input"
                              value={this.state.SurveyFormData.ShouldBeStarted}
                              onChange={(event: any) =>
                                this.handleChangeTextField("ShouldBeStarted", event.target.value)
                              }
                              className="textarea"
                              autoComplete="email"
                              margin="normal"
                              multiline={true}
                              rowsMax={3}
                              variant="outlined"
                            />
                          </div>
                          <div className="mt-5">
                            <InputLabel className="dk-brand-bllue-font " htmlFor="standard-name">
                              ادامه - عادات و رفتارهای موثری که می بایست ادامه پیدا کنند
                              <HtmlTooltip
                                title={
                                  <React.Fragment>
                                    <Typography color="inherit">
                                      Continue - Effective behaviors & habits to continue{" "}
                                    </Typography>
                                  </React.Fragment>
                                }
                              >
                                <Info color="primary" />
                              </HtmlTooltip>
                            </InputLabel>
                            <TextField
                              className="textarea"
                              id="outlined-email-input"
                              value={this.state.SurveyFormData.ShouldBeContinued}
                              onChange={(event: any) =>
                                this.handleChangeTextField("ShouldBeContinued", event.target.value)
                              }
                              autoComplete="email"
                              margin="normal"
                              multiline={true}
                              rowsMax={3}
                              variant="outlined"
                            />
                          </div>
                          <div className="mt-5">
                            <InputLabel className="dk-brand-text-red" htmlFor="standard-name">
                              توقف - عادات و رفتارهایی که می بایست متوقف شده یا به نحو دیگری صورت پذیرند
                              <HtmlTooltip
                                title={
                                  <React.Fragment>
                                    <Typography color="inherit">
                                      Stop - Behaviors & habits to stop or do differently
                                    </Typography>
                                  </React.Fragment>
                                }
                              >
                                <Info color="primary" />
                              </HtmlTooltip>
                            </InputLabel>
                            <TextField
                              className="textarea"
                              id="outlined-email-input"
                              value={this.state.SurveyFormData.ShouldBeStopped}
                              onChange={(event: any) =>
                                this.handleChangeTextField("ShouldBeStopped", event.target.value)
                              }
                              autoComplete="email"
                              margin="normal"
                              multiline={true}
                              rowsMax={3}
                              variant="outlined"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="kt-portlet__foot bottom-stick">
                    <div className="row">
                      <div className="col kt-align-left">
                        <button
                          className={
                            this.state.savingForm
                              ? "btn btn-brand mx-2 kt-spinner kt-spinner--right kt-spinner--md kt-spinner--light"
                              : "btn btn-brand mx-2 mr-2"
                          }
                          onClick={e => {
                            this.onSubmitForm("تکمیل نشده", "save");
                            e.preventDefault();
                            return false;
                          }}
                        >
                          ذخیره | Save
                        </button>

                        <button
                          className="btn btn-secondary mx-2"
                          onClick={e => {
                            this.onCancelRequest();
                            e.preventDefault();
                            return false;
                          }}
                        >
                          بازگشت | Back
                        </button>
                      </div>
                      <div className="col kt-align-right">
                        <button
                          className={
                            this.state.submittingForm
                              ? "btn dk-brand-green btn-wide btn-elevate btn-elevate-air mx-2 kt-spinner kt-spinner--right kt-spinner--md kt-spinner--light"
                              : "btn dk-brand-green btn-wide btn-elevate btn-elevate-air mx-2 btn-elevate btn-elevate-air mr-2"
                          }
                          onClick={e => {
                            this.handleClickOpen();
                            e.preventDefault();
                            return false;
                          }}
                        >
                          ثبت نهایی | Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <Dialog
              open={this.state.open}
              onClose={this.handleCancel}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">{"ثبت نهایی فرم"}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  پس از ثبت‌نهایی، فرم از دسترس شما خارج خواهد شد. آیا مایل به ثبت‌نهایی هستید؟
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <button onClick={this.handleCancel} className="btn btn-sm btn-brand-hover">
                  خیر
                </button>
                <button className="btn dk-brand-green btn-sm mx-2 mr-2" onClick={this.handleClose}>
                  بله، ثبت کن
                </button>
              </DialogActions>
            </Dialog>
          </div>
        )}
      </div>
    );
  }
  /**********************render cards**************************************** */
  private onRenderCard = () => {
    return this.state.SurveyFormData.Categories.map((n: ICategory, index: any) => {
      let categoryClassName = "";
      switch (n.BaseCategoryId) {
        case 1: {
          categoryClassName = "dk-brand-red";
          break;
        }
        case 2: {
          categoryClassName = "dk-brand-blue";
          break;
        }
        case 3: {
          categoryClassName = "dk-brand-grey";
          break;
        }
        default:
          categoryClassName = "dk-brand-red";
      }

      return (
        <div className="kt-section my-5 py-5 kt-ribbon  kt-ribbon--clip" key={index}>
          <div className={" kt-section__content kt-section__content--solid "}>
            <img src={n.SignUrl} alt="" className="Image"></img>
            <div className={categoryClassName + " kt-ribbon--clip kt-ribbon--left"}>
              <div className={categoryClassName + " kt-ribbon__target badge"}>
                <span className="kt-ribbon__inner" />
                {n.TitleFa}
              </div>
            </div>
            <div className={categoryClassName + " kt-ribbon--clip kt-ribbon--right"}>
              <div className={categoryClassName + " kt-ribbon__target badge"}>
                <span className="kt-ribbon__inner" />
                {n.Title}
              </div>
            </div>

            <div className="row question-row"></div>

            <MDBRow className="question-row">{this.onRenderQuestion(n.Questions, index)}</MDBRow>
          </div>
        </div>
      );
    });
  };
  /********************render questions****************************** */
  private onRenderQuestion = (Questions: IQuestion[], cardIndex: Number) => {
    return Questions.map((item: IQuestion, index: any) => {
      return (
        <ul key={index} className="ul-class my-5 py-5">
          <li className="li-class">
            <div style={{ display: "inline-block" }}>
              <p style={{ display: "inline-block" }} className="mr-2">
                {item.QuestionNumber}.
              </p>
              <span dangerouslySetInnerHTML={{ __html: item.QuestionFa }}></span>
            </div>
            <HtmlTooltip
              title={
                <React.Fragment>
                  <Typography color="inherit">
                    <span dangerouslySetInnerHTML={{ __html: item.Question }}></span>{" "}
                  </Typography>
                </React.Fragment>
              }
            >
              <Info color="primary" />
            </HtmlTooltip>
            <div className="slider-Style">
              <Slider
                key={index}
                className="slider"
                defaultValue={this.onRenderSliderValue(item.Field)}
                getAriaValueText={this.valuetext}
                aria-labelledby="discrete-slider-custom"
                step={1}
                valueLabelDisplay="auto"
                marks={this.state.marks}
                onChangeCommitted={this.changedValue(item.Field)}
                max={5}
                min={0}
              />
            </div>
          </li>
        </ul>
      );
    });
  };

  private initializeAnwers = (data: Isurvey) => {
    if (data.statusCode === 200) {
      data.Categories.forEach(element => {
        element.Questions.forEach(q => {
          this.state.answers.push({
            QuestionField: q.Field,
            Value: q.Value,
          });
        });
      });
    }
  };
  /**************************render slider value***************************** */
  private onRenderSliderValue = (Field: any) => {
    if (Field === null || this.state.answers.some(x => x.QuestionField === Field) === false) {
      return 0;
    } else {
      return this.state.answers.filter(x => x.QuestionField === Field)[0].Value;
    }
  };
  /********************************************************** */
  private valuetext(value: number) {
    return `${value}`;
  }
  /************************************* */

  changedValue = (itemId: string) => (event: any, value: any) => {
    this.setState(prevState => {
      if (itemId !== "") {
        if (prevState.answers.some(x => x.QuestionField === itemId)) {
          prevState.answers.filter(x => x.QuestionField === itemId)[0].Value = value;
        } else
          prevState.answers.push({
            QuestionField: itemId,
            Value: value,
          });
      }
      return {
        ...prevState,
        selectedValue: value,
        answers: prevState.answers,
      };
    });
  };

  /*****************submit form *********************************** */
  private onSubmitForm = async (status: string, saveFormat: string) => {
    let currentUserId: number = 0;
    let impersonated: boolean = false;
    
    if (this.state.userId == 0 || this.state.userId == null) {
      currentUserId = Context.userId;
      impersonated = false;
    } else {
      currentUserId = this.state.userId;
      impersonated = true;
    }
    const SubmitData: ISurveyData = {
      nominationItemId: this.state.itemid,
      currentUserId: currentUserId,
      impersonated: impersonated,
      status,
      answers: this.state.answers,
      ShouldBeStopped: this.state.SurveyFormData.ShouldBeStopped,
      ShouldBeContinued: this.state.SurveyFormData.ShouldBeContinued,
      ShouldBeStarted: this.state.SurveyFormData.ShouldBeStarted,
    };

    this.setState(prevState => {
      return {
        ...prevState,
        submittingForm: saveFormat === "submit" ? true : false,
        savingForm: saveFormat === "save" ? true : false,
      };
    });
    await this.ListService.SubmitForm(SubmitData).then(() => {
      this.setState(prevState => {
        return {
          ...prevState,
          submittingForm: false,
          savingForm: false,
        };
      });
      if (saveFormat === "submit") toast.success("فرم با موفقیت ثبت شد", this.toastSubmitoptions);
      else
        toast.success("اطلاعات در سیستم ذخیره شد. جهت تکمیل ارزیابی، از گزینه ثبت‌نهایی استفاده کنید ", {
          position: "bottom-left",
          toastId: "save",
        });
    });
  };

  private handleChangeTextField = (Field: string, event: any) => {
    this.setState(prevState => {
      return {
        ...prevState,
        SurveyFormData: {
          ...prevState.SurveyFormData,
          [Field]: event,
        },
      };
    });
  };

  private onCancelRequest = () => {
    window.location.href = "#/surveyintro";
  };
  toastSubmitoptions: ToastOptions = { onClose: this.onCancelRequest, autoClose: 5000, position: "bottom-left" };
  notifyError = (Id: string, message: string) => {
    toast.error(message, { autoClose: false, position: "bottom-left", toastId: Id });
  };
}

export default FormSurvey;
