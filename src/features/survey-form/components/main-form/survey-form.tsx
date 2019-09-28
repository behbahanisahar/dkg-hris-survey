import React from "react";
import ISurveyFromState from "./survey-form-state";
import ListServices from "../../../../services/list-services";
import { MDBCard, MDBRow, MDBCol } from "mdbreact";
import "./survey-form.css";
import IQuestion from "../../../../entities/survey-questions";
import { Slider } from "@material-ui/core";
import ICategory from "../../../../entities/categories";
import Isurvey from "../../../../entities/survey";
import Util from "../../../../utilities/utilities";
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
      itemid: 0,
    };
  }
  public async componentDidMount() {
    const itemid = this.util.getQueryStringValue("itemid");
    const SurveyFormData: Isurvey = await this.ListService.getSurveyFormData(Number(itemid));
    const marks = [
      {
        value: 0,
        label: "نظری ندارم",
      },
      {
        value: 1,
        label: "نظری ندارم",
      },
      {
        value: 2,
        label: "نظری ندارم",
      },
      {
        value: 3,
        label: "نظری ندارم",
      },
      {
        value: 4,
        label: "نظری ندارم",
      },
      {
        value: 5,
        label: "نظری ندارم",
      },
      {
        value: 6,
        label: "نظری ندارم",
      },
      {
        value: 7,
        label: "نظری ندارم",
      },
      {
        value: 8,
        label: "نظری ندارم",
      },
      {
        value: 9,
        label: "نظری ندارم",
      },
      {
        value: 10,
        label: "نظری ندارم",
      },
    ];

    this.setState(prevState => {
      return {
        ...prevState,
        SurveyFormData,
        marks,
        itemid: Number(itemid),
      };
    });
  }

  public render() {
    console.log(this.state.SurveyFormData);
    console.log(this.state.marks);
    return <div>{this.onRenderCard()}</div>;
  }
  /**********************render cards**************************************** */
  private onRenderCard = () => {
    const ProfilePhoto = "http://hq-spsrv03:90/SiteAssets/pic.png";
    return this.state.SurveyFormData.Categories.map((n: ICategory, index: any) => {
      return (
        <MDBCard className="Container mx-4">
          <img src={ProfilePhoto} className="Image"></img>
          <MDBRow>
            <MDBCol md="4"></MDBCol>
            <MDBCol style={{ textAlign: "center" }}>
              <h5>{n.Title}</h5>
            </MDBCol>
            <MDBCol md="4" />
          </MDBRow>

          <MDBRow>{this.onRenderQuestion(n.Questions)}</MDBRow>
        </MDBCard>
      );
    });
  };
  /********************render questions****************************** */
  private onRenderQuestion = (Questions: IQuestion[]) => {
    return Questions.map((item: IQuestion, index: any) => {
      return (
        <ul key={index} className="ul-class">
          <li className="li-class">
            {item.QuestionFa}

            <div className="slider-Style">
              <Slider
                className="slider"
                defaultValue={this.state.selectedValue}
                getAriaValueText={this.valuetext}
                aria-labelledby="discrete-slider-custom"
                step={1}
                valueLabelDisplay="auto"
                //  valueLabelDisplay={this.showLabel(marks)}
                //  valueLabelFormat={this.valueLabelFormat}
                marks={this.state.marks}
                onChange={this.changedValue}
                max={10}
                min={0}
              />
            </div>
          </li>
        </ul>
      );
    });
  };
  /*********************************** */
  private valuetext(value: number) {
    debugger;

    return `${value}`;
  }
  /************************************* */

  private changedValue = (event: any, value: any) => {
    this.setState(prevState => {
      return {
        ...prevState,
        selectedValue: value,
      };
    });
  };
}

export default FormSurvey;
