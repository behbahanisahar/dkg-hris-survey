import React from "react";
import ISurveyFromState from "./survey-form-state";
import ListServices from "../../../../services/list-services";
import Isurvey from "../../../../entities/survey";
import { MDBContainer, MDBMask, MDBCard, MDBRow, MDBCol } from "mdbreact";
import "./survey-form.css";
import { Table, TableHead, TableRow, TableBody, TableCell, TextField } from "@material-ui/core";
import ITableHeader from "../../../../entities/table-headers";

class FormSurvey extends React.Component<{}, ISurveyFromState> {
  private TableHeaders: ITableHeader[];
  private ListService: ListServices;

  constructor(props: any) {
    super(props);
    this.TableHeaders = [
      { id: "Row", label: "ردیف" },
      { id: "Question", label: "Question" },
      { id: "Score", label: "Score" },
    ];
    this.ListService = new ListServices();
    this.state = {
      SurveyFormData: [],
      score: "",
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

    return <div className="App">{this.onRenderCard()}</div>;
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
              <hr />
              <MDBRow>
                <Table aria-labelledby="tableTitle" className="table">
                  <TableHead className="RightDirPaper">
                    <TableRow className="rightdirectionheader">{this.renderHeader(this.TableHeaders)}</TableRow>
                  </TableHead>
                  <TableBody>{this.onRenderRows(n.Questions)}</TableBody>
                </Table>
              </MDBRow>
            </MDBCard>
          </MDBMask>
        </MDBContainer>
      );
    });
  };
  /*******************render table body************************************************************************** */
  private onRenderRows = (items: any[]) => {
    return items.map((n: any, index: any) => {
      return (
        <TableRow hover={true} tabIndex={-1} key={n.Id}>
          <TableCell className="w3-hide-small" style={{ width: "1%" }}>
            {index + 1}
          </TableCell>
          <TableCell style={{ width: "65%" }}>{n.Question}</TableCell>
          <TableCell>
            <TextField
              id="score"
              type="number"
              margin="dense"
              fullWidth={true}
              value={n.score}
              onChange={(event: any) => this.handleChangeScore(n.Id, event, "score", items)}
              // onBlur={this.checkExamLimitNum}
              placeholder="score..."
            />
          </TableCell>
        </TableRow>
      );
    });
    //  ));
  };
  /******************************render table header******************************************************** */
  private renderHeader = (columnDetail: any[]) => {
    return columnDetail.map(
      row => (
        <TableCell key={row.id} align="center" padding={row.disablePadding ? "none" : "default"} sortDirection="desc">
          {row.label}
        </TableCell>
      ),
      this,
    );
  };
  /**************************change scores********************************************************* */
  private handleChangeScore = (index: number, event: any, textFieldName: string, items: any[]) => {
    let Tableindex: number = 0;
    for (let i = 0; i < items.length; ++i) {
      if (Number(items[i].Id) === index) {
        Tableindex = i;
        break;
      }
    }
    // const Tableindex = this.state.ArzyabiRaftariQuestions.findIndex(obj =>
    //     obj.Id === index
    // );
    const newQuestions = [...(items || [])];
    let updatedValue: any = newQuestions[Tableindex];
    // const dropdownId = dropdownName + 'ID';
    updatedValue = {
      ...updatedValue,
      [textFieldName]: event.target.value,
      // [dropdownId]: event.target.value
    };

    newQuestions[Tableindex] = { ...updatedValue };

    this.setState(prevState => {
      return {
        ...prevState,
        SurveyFormData: {
          ...prevState.SurveyFormData,
          Question: [...newQuestions],
        },
      };
    });
  };
}

export default FormSurvey;
