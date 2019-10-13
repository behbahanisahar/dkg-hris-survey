import React from "react";
import ISurveyFromState from "./survey-form-state";
import ListServices from "../../../../services/list-services";
import { MDBRow } from "mdbreact";
import "./survey-form.css";
import IQuestion from "../../../../entities/survey-questions";
import { Slider, Tooltip, withStyles, Theme, Typography } from "@material-ui/core";
import ICategory from "../../../../entities/categories";
import Util from "../../../../utilities/utilities";
import { ISurveyData } from "../../../../entities/survey-data";
import Context from "../../../../utilities/context";
import Info from "@material-ui/icons/Info";
import Isurvey from "../../../../entities/survey";
import Spinner from "../../../spinner/spinner";
import Authentication from "../../../authentication/authentication";

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
        UserDisplayName: "Sahar Behbahani",
        SurveyAnswerId: 0,
        Categories: [],
      },
      score: "",
      radio: 1,
      marks: [],
      selectedValue: 0,
      answers: [],
      itemid: 0,
      showSpinner: true,
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
    console.log(this.state.SurveyFormData);
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
              <Authentication status={this.state.SurveyFormData.statusCode || 401} />
            )}
            {this.state.SurveyFormData.statusCode === 200 && (
              <div className="rtl">
                <div className="kt-portlet">
                  <div className="kt-portlet__head">
                    <div className="kt-portlet__head-label">
                      <span className="kt-portlet__head-icon kt-hidden">
                        <i className="la la-gear"></i>
                      </span>
                      <h3 className="kt-portlet__head-title">{this.state.SurveyFormData.UserDisplayName}</h3>
                    </div>
                  </div>

                  <div className="kt-portlet__body">
                    <div>{this.onRenderCard()}</div>
                  </div>
                  <div className="kt-portlet__foot">
                    <div className="row">
                      <div className="col kt-align-left">
                        <button
                          className="btn btn-info mx-2"
                          onClick={(ev: any) => this.onSubmitForm("Not Completed", "submit")}
                        >
                          ذخیره فرم
                        </button>

                        <button className="btn btn-secondary mx-2">انصراف</button>
                      </div>
                      <div className="col kt-align-right">
                        <button
                          className="btn btn-success btn-wide btn-elevate btn-elevate-air mx-2"
                          onClick={(ev: any) => this.onSubmitForm("Completed", "submit")}
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
            {item.QuestionFa}
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
    };
    await this.ListService.SubmitForm(SubmitData);
    if (saveFormat === "submit") {
      window.location.href = "?page=surveyintro&itemid=" + this.state.itemid + "";
    }
  };
}

export default FormSurvey;
