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

const HtmlTooltip = withStyles((theme: Theme) => ({
  tooltip: {
    backgroundColor: "#87D3E1",
    color: "#fff",
    maxWidth: 300,
    fontSize: "6px",
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
        label: "تقریبا هیچگاه",
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
        label: "گهگاه",
      },
      {
        value: 6,
        label: "",
      },
      {
        value: 7,
        label: "تقریبا اغلب اوقات",
      },
      {
        value: 8,
        label: "",
      },
      {
        value: 9,
        label: "مکرر و پیوسته",
      },
      {
        value: 10,
        label: "تقریبا همیشه",
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
        <div>{this.onRenderCard()}</div>
        <div className="buttons">
          <MDBBtn size="sm" color="dark-green" onClick={(ev: any) => this.onSubmitForm("Not Completed")}>
            ذخیره
          </MDBBtn>
          <MDBBtn size="sm" color="dark-green" onClick={(ev: any) => this.onSubmitForm("Completed")}>
            ثبت نهایی
          </MDBBtn>
          <MDBBtn size="sm" color="grey lighten-3">
            انصراف
          </MDBBtn>
        </div>
      </div>
    );
  }
  /**********************render cards**************************************** */
  private onRenderCard = () => {
    const ProfilePhoto = "http://hq-spsrv03:90/SiteAssets/pic.png";
    return this.state.SurveyFormData.Categories.map((n: ICategory, index: any) => {
      return (
        <div key={index}>
          <MDBCard className="Container mx-4">
            <img src={ProfilePhoto} alt="badge" className="Image"></img>
            <MDBRow className="question-row">
              <MDBCol md="4"></MDBCol>
              <MDBCol style={{ textAlign: "center" }}>
                <h5>{n.Title}</h5>
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
                id={item.Field}
                className="slider"
                defaultValue={this.onRenderSliderValue(item.ItemId)}
                getAriaValueText={this.valuetext}
                aria-labelledby="discrete-slider-custom"
                step={1}
                valueLabelDisplay="auto"
                //value={this.onRenderSliderValue(item.Field)}
                // value={this.state.answers[index].QuestionId}
                //  valueLabelDisplay={this.showLabel(marks)}
                //  valueLabelFormat={this.valueLabelFormat}
                marks={this.state.marks}
                //onChange={(event: any) => this.changedValue(event, value)}
                onChangeCommitted={this.changedValue(item.ItemId)}
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
          QuestionId: q.ItemId,
          Value: q.Value,
        });
      });
    });
  };
  /**************************render slider value***************************** */
  private onRenderSliderValue = (Field: any) => {
    if (Field === null || this.state.answers.some(x => x.QuestionId === Field) == false) {
      return 0;
    } else {
      return this.state.answers.filter(x => x.QuestionId === Field)[0].Value;
    }
  };
  /********************************************************** */
  private valuetext(value: number) {
    return `${value}`;
  }
  /************************************* */

  changedValue = (itemId: number) => (event: any, value: any) => {
    this.setState(prevState => {
      if (itemId !== 0) {
        if (prevState.answers.some(x => x.QuestionId === itemId)) {
          prevState.answers.filter(x => x.QuestionId === itemId)[0].Value = value;
        } else
          prevState.answers.push({
            QuestionId: itemId,
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
  private onSubmitForm = async (status: string) => {
    const SubmitData: ISurveyData = {
      nominationItemId: this.state.itemid,
      currentUserId: Context.userId,
      status,
      answers: this.state.answers,
    };
    await this.ListService.SubmitForm(SubmitData);
  };
}

export default FormSurvey;
