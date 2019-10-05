import React from "react";
import ISurveyFromState from "./survey-form-state";
import ListServices from "../../../../services/list-services";
import { MDBCard, MDBRow, MDBCol, MDBBtn } from "mdbreact";
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

// const sleep = (ms: any) => new Promise(resolve => setTimeout(resolve, ms));
const HtmlTooltip = withStyles((theme: Theme) => ({
  tooltip: {
    backgroundColor: "#DEDFE0",
    color: "#fff",
    maxWidth: 260,
    fontSize: "3px  !important",
    border: "1px solid #dadde9",
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
        label: "",
      },
      {
        value: 3,
        label: "بندرت",
      },
      {
        value: 4,
        label: "",
      },
      {
        value: 5,
        label: "گهگاه\r\n occassionally",
      },
      {
        value: 6,
        label: "",
      },
      {
        value: 7,
        label: "تقریبا اغلب اوقات\r\n fairly often",
      },
      {
        value: 8,
        label: "",
      },
      {
        value: 9,
        label: "مکرر و پیوسته\r\nvery frequently",
      },
      {
        value: 10,
        label: "تقریبا همیشه\r\nalmost always",
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
  // public async UNSAFE_componentWillUpdate2(nextProps: any, nextState: any) {
  //   await sleep(20000);
  //   this.onSubmitForm("Not Completed");
  // }

  // public UNSAFE_componentWillUpdate = (nextProps: any, nextState: any) => {
  //   setInterval(() => {
  //     this.onSubmitForm("Not Completed", "interval");
  //   }, 2000);
  // };

  public render() {
    if (this.state.SurveyFormData == null) {
      return null;
    }
    return (
      <div>
        {this.state.showSpinner && <Spinner />}
        {!this.state.showSpinner && (
          <div>
            <div>{this.onRenderCard()}</div>
            <div className="buttons">
              <MDBBtn size="sm" color="dark-green" onClick={(ev: any) => this.onSubmitForm("Not Completed", "submit")}>
                ذخیره
              </MDBBtn>
              <MDBBtn size="sm" color="dark-green" onClick={(ev: any) => this.onSubmitForm("Completed", "submit")}>
                ثبت نهایی
              </MDBBtn>
              <MDBBtn size="sm" color="grey lighten-3">
                انصراف
              </MDBBtn>
            </div>
          </div>
        )}
      </div>
    );
  }
  /**********************render cards**************************************** */
  private onRenderCard = () => {
    //  const ProfilePhoto = "http://hq-spsrv03:90/SiteAssets/pic.png";
    return this.state.SurveyFormData.Categories.map((n: ICategory, index: any) => {
      let categoryClassName = "";
      switch (n.BaseCategoryId) {
        case 1: {
          categoryClassName = "Cat2";
          break;
        }
        case 2: {
          categoryClassName = "Cat1";
          break;
        }
        case 3: {
          categoryClassName = "Cat3";
          break;
        }
        default:
          categoryClassName = "Core Values";
      }

      return (
        <div key={index}>
          <MDBCard className={categoryClassName + " Container mx-4 "}>
            <img src={n.SignUrl} alt="" className="Image"></img>
            <MDBRow className="question-row">
              <MDBCol md="4"></MDBCol>
              <MDBCol style={{ textAlign: "center" }}>
                <h5>{n.TitleFa}</h5>
                <p style={{ fontSize: "11px" }}>{n.Title}</p>
                <br />
              </MDBCol>
              <MDBCol md="4" />
            </MDBRow>

            <MDBRow className="question-row">{this.onRenderQuestion(n.Questions, index)}</MDBRow>
          </MDBCard>
        </div>
      );
    });
  };
  /********************render questions****************************** */
  private onRenderQuestion = (Questions: IQuestion[], cardIndex: Number) => {
    return Questions.map((item: IQuestion, index: any) => {
      return (
        <ul key={index} className="ul-class">
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
                max={10}
                min={0}
              />
            </div>
          </li>
        </ul>
      );
    });
  };

  private initializeAnwers = (data: Isurvey) => {
    data.Categories.forEach(element => {
      element.Questions.forEach(q => {
        this.state.answers.push({
          QuestionField: q.Field,
          Value: q.Value,
        });
      });
    });
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
