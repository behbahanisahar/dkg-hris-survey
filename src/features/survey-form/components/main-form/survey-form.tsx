import React from "react";
import ISurveyFromState from "./survey-form-state";
import ListServices from "../../../../services/list-services";
import { MDBCard, MDBRow, MDBCol, MDBBtn } from "mdbreact";
import "./survey-form.css";
import IQuestion from "../../../../entities/survey-questions";
import { Slider } from "@material-ui/core";
import ICategory from "../../../../entities/categories";
import Isurvey from "../../../../entities/survey";
import Util from "../../../../utilities/utilities";
import { ISurveyData } from "../../../../entities/survey-data";
import Context from "../../../../utilities/context";
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
    return (
      <div>
        <div>{this.onRenderCard()}</div>
        <MDBBtn size="sm" color="dark-green" onClick={(ev: any) => this.onSubmitForm("Not Completed")}>
          ذخیره
        </MDBBtn>
        <MDBBtn size="sm" color="dark-green" onClick={(ev: any) => this.onSubmitForm("Completed")}>
          ثبت نهایی
        </MDBBtn>
        <MDBBtn size="sm" color="grey lighten-3">
          Cancel
        </MDBBtn>
      </div>
    );
  }
  /**********************render cards**************************************** */
  private onRenderCard = () => {
    const ProfilePhoto = "http://hq-spsrv03:90/SiteAssets/pic.png";
    return this.state.SurveyFormData.Categories.map((n: ICategory, index: any) => {
      return (
        <div>
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
        </div>
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
                key={index}
                id={index}
                title={index}
                className="slider"
                //  defaultValue={this.state.selectedValue}
                getAriaValueText={this.valuetext}
                aria-labelledby="discrete-slider-custom"
                step={1}
                valueLabelDisplay="auto"
                value={this.state.selectedValue}
                //  valueLabelDisplay={this.showLabel(marks)}
                //  valueLabelFormat={this.valueLabelFormat}
                marks={this.state.marks}
                // onChange={(event: any) => this.changedValue(event, value)}
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
    return `${value}`;
  }
  /************************************* */

  private changedValue = (event: any, value: any) => {
    console.log(event.target.title);
    this.setState(prevState => {
      return {
        ...prevState,
        selectedValue: value,
      };
    });
  };
  /*****************submit form *********************************** */
  private onSubmitForm = async (status: string) => {
    const SubmitData: ISurveyData = {
      nominationItemId: this.state.itemid,
      currentUserId: Context.userId,
      status,
      answers: [
        {
          QuestionId: 3,
          Value: 4,
        },
      ],
    };
    await this.ListService.SubmitForm(SubmitData);
  };
}

export default FormSurvey;
