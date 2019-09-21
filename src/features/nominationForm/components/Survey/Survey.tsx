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
import { Table, TableHead, TableRow, TableBody, TableCell, Fab, Card, Chip, Avatar, Stepper, StepLabel, Step, Typography, Tooltip } from "@material-ui/core";
import ITableHeader from "../../../../entities/table-headers";
import SnackBarMode from "../../../../entities/snackbar-mode";
import SnackBarMessage from "../snakbar-message/snackbar-message";
import Util from "../../../../utilities/utilities";
import NominationData from "../../../../entities/nomination";
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
      SelectedPeerID: 0,
      SelectedPeer: "",
      SelectedOtherID: 0,
      SelectedOther: "",
      order: "asc",
      orderBy: "Id",
      page: 0,
      rowsPerPage: 15,
      SelectedPeers: [],
      SelectedOthers: [],
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
          AvatarUrl: "",
          Id: 0,
          ItemId: 894,
          SPLatinFullName: "",
        },
        LineManager:  {
          AvatarUrl: "",
          Id: 0,
          ItemId: 894,
          SPLatinFullName: "",
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
    const SelectedPeers = this.state.SelectedPeers;
    const SelectedOthers = this.state.SelectedOthers;
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
              <MDBCardTitle> { this.state.NominationData.User!.SPLatinFullName}</MDBCardTitle>
              <MDBCardText>
                <MDBContainer>
              <MDBRow>
              {this.renderMultiValues(this.state.NominationData.Subordinates)}
              </MDBRow>
                   {this.state.NominationData.LineManager !== null &&
                  <MDBRow>
                    <label htmlFor="formGroupExampleInput">{this.state.NominationData.LineManager!.SPLatinFullName}</label>
                  </MDBRow>
                   }
                  <MDBRow>
                    <ReactSelect
                      className="basic-single"
                      classNamePrefix="select"
                      isDisabled={false}
                      isClearable={true}
                      isRtl={false}
                      isSearchable={true}
                      name="SelectedPeer"
                      isLoading={this.state.UsersIsLoading}
                      onChange={(ev: any) => this.onSelectAutoComplete(ev, "SelectedPeer")}
                      options={this.state.UserInfo}
                      // loadOptions={this.promiseOptions}
                      placeholder="select..."
                    />
                      <Tooltip title="Add" aria-label="add">
                    <Fab size="small" color="primary" aria-label="add">
                 
                    <Add onClick={(ev: any) => this.AddItem("SelectedPeer")} />
                    </Fab>
                    </Tooltip>
                  </MDBRow>

                  <MDBRow>
                    <Card className="CardTable">
                      <Table aria-labelledby="tableTitle">
                        <TableHead>
                          <TableRow>{this.renderHeader(this.tableHeaders)}</TableRow>
                        </TableHead>

                        <TableBody>
                          {SelectedPeers.map((n: any, index: any) => {
                            return (
                              <TableRow key={index}>
                                <TableCell align="center">{index + 1}</TableCell>
                                <TableCell align="center">{n}</TableCell>
                                <TableCell align="center" onClick={() => this.DeleteItem(n,"SelectedPeer")}>
                                  <Delete />
                                </TableCell>
                              </TableRow>
                            );
                          })}
                        </TableBody>
                      </Table>
                    </Card>
                  </MDBRow>


                  <MDBRow>
                    <ReactSelect
                      className="basic-single"
                      classNamePrefix="select"
                      isDisabled={false}
                      isClearable={true}
                      isRtl={false}
                      isSearchable={true}
                      name="SelectedOther"
                      isLoading={this.state.UsersIsLoading}
                      onChange={(ev: any) => this.onSelectAutoComplete(ev, "SelectedOther")}
                      options={this.state.UserInfo}
                      // loadOptions={this.promiseOptions}
                      placeholder="select..."
                    />
                       <Tooltip title="Add" aria-label="add">
                    <Fab size="small" color="primary" aria-label="add">
                      <Add onClick={(ev: any) => this.AddItem("SelectedOther")} />
                    </Fab>
                    </Tooltip>
                  </MDBRow>

                  <MDBRow>
                    <Card className="CardTable">
                      <Table aria-labelledby="tableTitle">
                        <TableHead>
                          <TableRow>{this.renderHeader(this.tableHeaders)}</TableRow>
                        </TableHead>

                        <TableBody>
                          {SelectedOthers.map((n: any, index: any) => {
                            return (
                              <TableRow key={index}>
                                <TableCell align="center">{index + 1}</TableCell>
                                <TableCell align="center">{n}</TableCell>
                                <TableCell align="center" onClick={() => this.DeleteItem(n,"SelectedOther")}>
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
  private AddItem = (FieldName:string) => {
    if(FieldName==="SelectedOther"){
      const NewItem: any[] = this.state.SelectedOthers;
      if (NewItem.indexOf(this.state.SelectedOther) > -1) {
        this.setState(prevState => {
          return {
            ...prevState,
            snackbarMessage: "User Exist!",
            showSnackbarMessage: true,
            snackbarType: SnackBarMode.Error,
          };
        });
      } else {
        NewItem.push(this.state.SelectedOther);
        this.setState(prevState => {
          return {
            ...prevState,
            SelectedOthers: NewItem,
          };
        });
      }
    }
    else{
      const NewItem: any[] = this.state.SelectedPeers;
      if (NewItem.indexOf(this.state.SelectedPeer) > -1) {
        this.setState(prevState => {
          return {
            ...prevState,
            snackbarMessage: "User Exist!",
            showSnackbarMessage: true,
            snackbarType: SnackBarMode.Error,
          };
        });
      } else {
        NewItem.push(this.state.SelectedPeer);
        this.setState(prevState => {
          return {
            ...prevState,
            SelectedPeers: NewItem,
          };
        });
      }
    }
   
  };
  /******************************delete item from table***************************************************** */
  private DeleteItem = (currentItem: string,SelectedField:string) => {
    if(SelectedField==="SelectedOther"){
      this.setState(prevState => {
        const prevValues = prevState.SelectedOthers || [];
        const newValue = prevValues.filter(el => el !== currentItem);
        return {
          ...prevState,
          SelectedOthers: newValue,
        };
      });
    }

    if(SelectedField==="SelectedPeer"){
      this.setState(prevState => {
        const prevValues = prevState.SelectedPeers || [];
        const newValue = prevValues.filter(el => el !== currentItem);
        return {
          ...prevState,
          SelectedPeers: newValue,
        };
      });
    }
    
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
  /**********************render multi values************************************* */
  private renderMultiValues = (Subordinates: any[]) => {
    return Subordinates.map((item: any) => {
        return  <Chip
        style={{marginRight:'1%',marginBottom:'2%'}}
      
        avatar={
          <Avatar>
          <img src={item.AvatarUrl} style={{width:'inherit',height:'auto'}}/>
          </Avatar>
        }
        label={item.SPLatinFullName}
      />;
    });
}
}
