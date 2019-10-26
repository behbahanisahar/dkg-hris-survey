import React from "react";
import ISurveyFromState from "./survey-form-state";
import ListServices from "../../../../services/list-services";
import { MDBRow } from "mdbreact";
import "./survey-form.css";
import IQuestion from "../../../../entities/survey-questions";
import { Slider, Tooltip, withStyles, Theme, Typography, InputLabel, TextField } from "@material-ui/core";
import ICategory from "../../../../entities/categories";
import Util from "../../../../utilities/utilities";
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
    maxWidth: 260,
    fontSize: "3px  !important",
    border: "1px solid #dadde9",
    textAlign: "left",
  },
}))(Tooltip);
class FormSurvey extends React.Component<{}, ISurveyFromState> {
  private ListService: ListServices;
  private util: Util;
  constructor(props: any) {
    super(props);
    this.util = new Util();
    this.ListService = new ListServices();

    this.state = {
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
    };
  }
  public async componentDidMount() {
    document.title = "Survey Form";
    const itemid = this.util.getQueryStringValue("itemid");
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
        };
      });
    });
  }

  public render() {
    if (this.state.SurveyFormData == null) {
      return null;
    }
    console.log(this.state.SurveyFormData);
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
                    <div className="kt-section my-5 py-5 kt-ribbon  kt-ribbon--clip">
                      <div className={" kt-section__content kt-section__content--solid "}>
                        <div className=" kt-ribbon--clip kt-ribbon--left">
                          <div className=" kt-ribbon__target badge mt-3">
                            <span className="kt-ribbon__inner" />
                            بازخورد کیفی
                          </div>
                        </div>
                        <div className=" kt-ribbon--clip kt-ribbon--right">
                          <div className=" kt-ribbon__target badge  mt-3">
                            <span className="kt-ribbon__inner" />
                            Qualititative Feedback
                          </div>
                        </div>
                        <div>
                          <div style={{ marginTop: "7%" }}>
                            <InputLabel htmlFor="standard-name">
                              شروع - عادات و رفتارهایی که می بایست شروع شوند
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
                          <div>
                            <InputLabel htmlFor="standard-name">
                              ادامه - عادات و رفتارهای موثری که می بایست ادامه پیدا کنند
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
                          <div>
                            <InputLabel htmlFor="standard-name">
                              توقف - عادات و رفتارهایی که می بایست متوقف شده یا به نحو دیگری صورت پذیرند
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
                  <div className="kt-portlet__foot">
                    <div className="row">
                      <div className="col kt-align-left">
                        <button
                          className={
                            this.state.submittingForm
                              ? "btn btn-info mx-2 kt-spinner kt-spinner--right kt-spinner--md kt-spinner--light"
                              : "btn btn-info mx-2 btn-elevate btn-elevate-air mr-2"
                          }
                          onClick={e => {
                            this.onSubmitForm("تکمیل نشده", "submit");
                            e.preventDefault();
                            return false;
                          }}
                        >
                          ذخیره فرم
                        </button>

                        <button
                          className="btn btn-secondary mx-2"
                          onClick={e => {
                            this.onCancelRequest();
                            e.preventDefault();
                            return false;
                          }}
                        >
                          انصراف
                        </button>
                      </div>
                      <div className="col kt-align-right">
                        <button
                          className={
                            this.state.submittingForm
                              ? "btn btn-success btn-wide btn-elevate btn-elevate-air mx-2 kt-spinner kt-spinner--right kt-spinner--md kt-spinner--light"
                              : "btn btn-success btn-wide btn-elevate btn-elevate-air mx-2 btn-elevate btn-elevate-air mr-2"
                          }
                          onClick={e => {
                            this.onSubmitForm("تکمیل شده", "submit");
                            e.preventDefault();
                            return false;
                          }}
                        >
                          ثبت نهایی ارزیابی
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
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
              {item.QuestionFa}
            </div>
            <HtmlTooltip
              title={
                <React.Fragment>
                  <Typography color="inherit"> {item.Question}</Typography>
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
    const SubmitData: ISurveyData = {
      nominationItemId: this.state.itemid,
      currentUserId: Context.userId,
      status,
      answers: this.state.answers,
      ShouldBeStopped: this.state.SurveyFormData.ShouldBeStopped,
      ShouldBeContinued: this.state.SurveyFormData.ShouldBeContinued,
      ShouldBeStarted: this.state.SurveyFormData.ShouldBeStarted,
    };
    this.setState(prevState => {
      return {
        ...prevState,
        submittingForm: true,
      };
    });
    await this.ListService.SubmitForm(SubmitData).then(() => {
      this.setState(prevState => {
        return {
          ...prevState,
          submittingForm: false,
        };
      });
      toast.success("فرم با موفقیت ثبت شد", this.toastSubmitoptions);
    });
  };
  /************************************************************* */
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

  /********************************************** */
  private onCancelRequest = () => {
    window.location.href = "?page=Surveyintro";
  };
  toastSubmitoptions: ToastOptions = { onClose: this.onCancelRequest, autoClose: 5000, position: "bottom-left" };
  notifyError = (Id: string, message: string) => {
    toast.error(message, { autoClose: false, position: "bottom-left", toastId: Id });
  };
}

export default FormSurvey;
