import * as React from "react";
import ISurveyProps from "./Survey-props";
import ISurveyState from "./Survey-state";
import {
  MDBCard,
  MDBCol,
  MDBCardImage,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBBtn,
  MDBRow
} from "mdbreact";
import "./../Survey/Survey.css";
import ListServices from "../../../../services/list-services";
import SPLists from "./../../../../entities/lists";
import ReactSelect from "react-select";
import Add from "@material-ui/icons/Add";

export default class Survey extends React.Component<
  ISurveyProps,
  ISurveyState
> {
  private ListService: ListServices;

  public constructor(props: ISurveyProps) {
    super(props);
    this.ListService = new ListServices();

    this.state = {
      UserInfo: []
    };
  }

  public async componentDidMount() {
    const UserInfo = await this.ListService.getUserInfo(SPLists.UserInfo);

    this.setState(prevState => {
      return {
        ...prevState,
        UserInfo
      };
    });
    console.log(this.state.UserInfo);
  }

  public render() {
    const option = [
      {
        label: (
          <div>
            <Add />
            test sahar
          </div>
        ),
        value: "1"
      },
      {
        label: "test2",
        value: "2"
      },
      {
        label: "test3",
        value: "3"
      }
    ];
    return (
      <div>
        <MDBCol>
          <MDBCard style={{ width: "22rem" }}>
            <MDBCardImage
              className="img-fluid"
              src="http://hq-spsrv01:90/SiteAssets/Pics/PM/Artboard%209nps.png"
              waves
            />
            <MDBCardBody>
              <MDBCardTitle>Card title</MDBCardTitle>
              <MDBCardText>
                <MDBRow>
                  <label htmlFor="formGroupExampleInput">Default input</label>
                </MDBRow>
                <MDBRow>
                  <label htmlFor="formGroupExampleInput">Default input</label>
                  <ReactSelect
                    className="basic-single"
                    classNamePrefix="select"
                    style={{ width: "500px" }}
                    // defaultValue={colourOptions[0]}
                    isDisabled={false}
                    defaultMenuIsOpen={false}
                    backspaceRemovesValue={true}
                    isClearable={true}
                    isRtl={false}
                    isSearchable={true}
                    name="Users"
                    options={option}
                    placeholder="select..."
                    //  styles={colourStyles}
                  />
                </MDBRow>
              </MDBCardText>
              <MDBBtn href="#">Save</MDBBtn>
              <MDBBtn href="#">Cancel</MDBBtn>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </div>
    );
  }
  public _renderOption(option: any) {
    return (
      <div>
        <p>sahar</p>
        {option.label}: {option.color}
      </div>
    );
  }
}
