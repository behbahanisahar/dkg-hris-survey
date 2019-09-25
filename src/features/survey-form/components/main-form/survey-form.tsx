import React from "react";
import ISurveyFromState from "./survey-form-state";
import ListServices from "../../../../services/list-services";
import Isurvey from "../../../../entities/survey";
import { MDBContainer, MDBMask, MDBCard, MDBRow, MDBCol } from "mdbreact";
import "./survey-form.css";
import IQuestion from "../../../../entities/survey-questions";
import { Slider, FormControl, RadioGroup, FormControlLabel, Radio, Select, MenuItem } from "@material-ui/core";

class FormSurvey extends React.Component<{}, ISurveyFromState> {
  private ListService: ListServices;

  constructor(props: any) {
    super(props);

    this.ListService = new ListServices();
    this.state = {
      SurveyFormData: [],
      score: "",
      radio: 1,
    };
  }
  public async componentDidMount() {
    const SurveyFormData: Isurvey[] = await this.ListService.getSurveyFormData();

    this.setState(prevState => {
      return {
        ...prevState,
        SurveyFormData,
      };
    });
  }

  public render() {
    console.log(this.state.SurveyFormData);

    return <div>{this.onRenderCard()}</div>;
  }
  /**********************render cards**************************************** */
  private onRenderCard = () => {
    const ProfilePhoto = "http://hq-spsrv03:90/SiteAssets/pic.png";
    return this.state.SurveyFormData.map((n: Isurvey, index: any) => {
      return (
        <MDBContainer key={index} md="12" xs="12">
          <MDBMask overlay="black-light">
            <MDBCard className="Container">
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
          </MDBMask>
        </MDBContainer>
      );
    });
  };
  /********************render questions****************************** */
  private onRenderQuestion = (Questions: IQuestion[]) => {
    const marks = [
      {
        value: 1,
        label: "1",
      },
      {
        value: 2,
        label: "2",
      },
      {
        value: 3,
        label: "3",
      },
      {
        value: 4,
        label: "4",
      },
      {
        value: 5,
        label: "5",
      },
    ];
    return Questions.map((item: IQuestion) => {
      return (
        <ul className="ul-class">
          <li className="li-class">
            {item.QuestionFa}

            <div>
              <Slider
                className="slider"
                defaultValue={1}
                getAriaValueText={this.valuetext}
                aria-labelledby="discrete-slider-custom"
                step={5}
                valueLabelDisplay="auto"
                marks={marks}
                max={5}
              />
            </div>

            <div>
              <FormControl component="fieldset">
                <RadioGroup aria-label="gender" name="gender2" row={true}>
                  <FormControlLabel value="1" control={<Radio color="primary" />} label="1" labelPlacement="start" />
                  <FormControlLabel value="2" control={<Radio color="primary" />} label="2" labelPlacement="start" />
                  <FormControlLabel value="3" control={<Radio color="primary" />} label="3" labelPlacement="start" />
                  <FormControlLabel value="4" control={<Radio color="primary" />} label="4" labelPlacement="start" />
                  <FormControlLabel value="5" control={<Radio color="primary" />} label="5" labelPlacement="start" />
                </RadioGroup>
              </FormControl>
            </div>
            <div>
              <Select>
                <MenuItem value={10}>1</MenuItem>
                <MenuItem value={20}>2</MenuItem>
                <MenuItem value={30}>3</MenuItem>
                <MenuItem value={40}>4</MenuItem>
                <MenuItem value={50}>5</MenuItem>
              </Select>
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
}

export default FormSurvey;
