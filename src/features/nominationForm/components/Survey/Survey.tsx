import * as React from "react";
import ISurveyProps from "./Survey-props";
import ISurveyState from "./Survey-state";
import {
  MDBCard,
  MDBCol,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBBtn,
  MDBRow,
  MDBContainer,
} from "mdbreact";
import "./../Survey/Survey.css";
import ListServices from "../../../../services/list-services";
import SPLists from "./../../../../entities/lists";
import ReactSelect from "react-select";
import Add from "@material-ui/icons/Add";
import Delete from "@material-ui/icons/Delete";
import { Table, TableHead, TableRow, TableBody, TableCell, Fab, Card, Chip, Avatar, Stepper, StepLabel, Step, Typography } from "@material-ui/core";
import ITableHeader from "../../../../entities/table-headers";
import SnackBarMode from "../../../../entities/snackbar-mode";
import SnackBarMessage from "../snakbar-message/snackbar-message";
import Util from "../../../../utilities/utilities";
import NominationData from "../../../../entities/nomination";
import FaceIcon from '@material-ui/icons/Face';
export default class Survey extends React.Component<ISurveyProps, ISurveyState> {
  private ListService: ListServices;
  private util: Util;
  private tableHeaders: ITableHeader[];
  public constructor(props: ISurveyProps) {
    super(props);
    this.ListService = new ListServices();
    this.util = new Util();
    this.tableHeaders = [
      { id: "Row", label: "Row" },
      { id: "Selected", label: "Selected Person" },
      { id: "Action", label: "Delete" },
    ];
    this.state = {
      UserInfo: [],
      SelectedUserID: 0,
      SelectedUser: "",
      order: "asc",
      orderBy: "Id",
      page: 0,
      rowsPerPage: 15,
      SelectedUsers: [],
      showSnackbarMessage: false,
      snackbarMessage: "",
      snackbarType: SnackBarMode.Info,
      UsersIsLoading: true,
      itemId: 0,
      activeStep:0,
      NominationData: {
        Status: "",
        Subordinates: [],
        User: {
          AvatarUrl: "test",
          Id: 0,
          ItemId: 894,
          SPLatinFullName: "Abdolhossin Mohammad Hashemi",
        },
        LineManager:  {
          AvatarUrl: "test",
          Id: 0,
          ItemId: 894,
          SPLatinFullName: "Abdolhossin Mohammad Hashemi",
        },
      },
    };
  }

  public async componentDidMount() {
    const itemId = this.util.getQueryStringValue("itemid");
    await this.loadUsers();
    const NominationData: NominationData = await this.ListService.getNominationData(Number(itemId));

    this.setState(prevState => {
      return {
        ...prevState,
        itemId: Number(itemId),
        NominationData,
      };
    });
  }

  public render() {
    const SelectedUsers = this.state.SelectedUsers;
  const steps = this.getSteps();
    return (
      <div>
        <MDBCol>
          <MDBCard style={{ width: "22rem" }}>
            {/* <MDBCardImage
              className="img-fluid"
              src="http://hq-spsrv01:90/SiteAssets/Pics/PM/Artboard%209nps.png"
              waves
            /> */}
            <div >
      <Stepper activeStep={this.state.activeStep} alternativeLabel>
        {steps.map((label:any) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {this.state.activeStep === steps.length ? (
          <div>
            <Typography >All steps completed</Typography>
          </div>
        ) : (
          <div>
            <Typography >{this.getStepContent(this.state.activeStep)}</Typography>
            <div>
             
            </div>
          </div>
        )}
      </div>
    </div>
            <MDBCardBody>
              <MDBCardTitle>{this.state.NominationData.User.SPLatinFullName}</MDBCardTitle>
              <MDBCardText>
                <MDBContainer>
                  <MDBRow>
                    <Chip
                      avatar={
                        <Avatar>
                          <FaceIcon />
                        </Avatar>
                      }
                      label={this.state.NominationData.LineManager.SPLatinFullName}
                    />
                  </MDBRow>
                  <MDBRow>
                    <label htmlFor="formGroupExampleInput">{this.state.NominationData.LineManager.SPLatinFullName}</label>
                  </MDBRow>
                  <MDBRow>
                    <ReactSelect
                      className="basic-single"
                      classNamePrefix="select"
                      isDisabled={false}
                      isClearable={true}
                      isRtl={false}
                      isSearchable={true}
                      name="SelectedUser"
                      isLoading={this.state.UsersIsLoading}
                      onChange={(ev: any) => this.onSelectAutoComplete(ev, "SelectedUser")}
                      options={this.state.UserInfo}
                      // loadOptions={this.promiseOptions}
                      placeholder="select..."
                    />
                    <Fab size="small" color="primary" aria-label="add">
                      <Add onClick={this.AddItem} />
                    </Fab>
                  </MDBRow>

                  <MDBRow>
                    <Card className="CardTable">
                      <Table aria-labelledby="tableTitle">
                        <TableHead>
                          <TableRow>{this.renderHeader(this.tableHeaders)}</TableRow>
                        </TableHead>

                        <TableBody>
                          {SelectedUsers.map((n: any, index: any) => {
                            return (
                              <TableRow key={index}>
                                <TableCell align="center">{index + 1}</TableCell>
                                <TableCell align="center">{n}</TableCell>
                                <TableCell align="center" onClick={() => this.DeleteItem(n)}>
                                  <Delete />
                                </TableCell>
                              </TableRow>
                            );
                          })}
                        </TableBody>
                      </Table>
                    </Card>
                  </MDBRow>
                </MDBContainer>
              </MDBCardText>
              <MDBBtn href="#">Save</MDBBtn>
              <MDBBtn href="#">Cancel</MDBBtn>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
        <SnackBarMessage
          type={this.state.snackbarType}
          message={this.state.snackbarMessage}
          showMessage={this.state.showSnackbarMessage}
          onHandleCloseMessage={this.handleCloseMessage}
        />
      </div>
    );
  }
  /*****************************select user**********************************************8 */
  private onSelectAutoComplete = async (event: any, dropdownName: string) => {
    const dropdownId = dropdownName + "ID";
    await this.setState(prevState => {
      return {
        ...prevState,
        [dropdownName]: event === null ? "" : event.label,
        [dropdownId]: event === null ? 0 : event.value,
      };
    });
    //this.state.SelectedUsers.push(this.state.SelectedUser);
  };
  /*************************************************************************************************** */
  public loadUsers = async () => {
    let UserInfo: any[];

    await this.ListService.getUserInfo(SPLists.UserInfo).then(response => {
      UserInfo = response;
    });
    this.setState(prevstate => {
      return {
        ...prevstate,
        UserInfo,
        UsersIsLoading: false,
      };
    });
  };
  /*********************************add item to table****************************************************** */
  private AddItem = () => {
    const NewItem: any[] = this.state.SelectedUsers;
    if (NewItem.indexOf(this.state.SelectedUser) > -1) {
      this.setState(prevState => {
        return {
          ...prevState,
          snackbarMessage: "User Exist!",
          showSnackbarMessage: true,
          snackbarType: SnackBarMode.Error,
        };
      });
    } else {
      NewItem.push(this.state.SelectedUser);
      this.setState(prevState => {
        return {
          ...prevState,
          SelectedUsers: NewItem,
        };
      });
    }
  };
  /******************************delete item from table***************************************************** */
  private DeleteItem = (currentItem: string) => {
    this.setState(prevState => {
      const prevValues = prevState.SelectedUsers || [];
      const newValue = prevValues.filter(el => el !== currentItem);
      return {
        ...prevState,
        SelectedUsers: newValue,
      };
    });
  };
  /******************************render table header******************************************************** */
  private renderHeader = (columnDetail: any[]) => {
    return columnDetail.map(
      row => (
        <TableCell key={row.id} align="center" padding="none" sortDirection="desc">
          {row.label}
        </TableCell>
      ),
      this,
    );
  };

  /**************************** SnackBar ****************************** */
  private handleCloseMessage = () => {
    if (this.state.snackbarType === SnackBarMode.Success) {
      alert("success");
    } else {
      this.setState(prevState => {
        return {
          ...prevState,
          showSnackbarMessage: false,
        };
      });
    }
  };
  /****************************************************************** */
  private getSteps() {
    return ['User', 'Bp', 'C-level'];
  }
  
  private getStepContent(stepIndex: number) {
    switch (stepIndex) {
      case 0:
        return '';
      case 1:
        return '';
      case 2:
        return '';
      default:
        return '';
    }
  }
}
