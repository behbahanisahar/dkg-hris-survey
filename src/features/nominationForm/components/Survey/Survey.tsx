import * as React from "react";
import ISurveyProps from "./survey-props";
import ISurveyState from "./survey-state";
import { MDBCard, MDBCol, MDBCardBody, MDBBtn, MDBRow, MDBContainer, MDBCardText } from "mdbreact";
import "./survey.css";
import ListServices from "../../../../services/list-services";
import ReactSelect from "react-select";
import AsyncSelect from "react-select/async";
import Add from "@material-ui/icons/Add";
import { Fab, Card, Tooltip, Table, TableHead, TableRow, TableBody, TableCell } from "@material-ui/core";

import SnackBarMode from "../../../../entities/snackbar-mode";
import SnackBarMessage from "../snakbar-message/snackbar-message";
import Util from "../../../../utilities/utilities";
import NominationData from "../../../../entities/nomination";
import IUser from "../../../../entities/user";
import IUpdatedData from "../../../../entities/updatedNominationItem";
import MYStepper from "../stepper/stepper";
import ITableHeader from "../../../../entities/table-headers";
import Delete from "@material-ui/icons/Delete";
import IHistory from "../../../../entities/history";
import Spinner from "../../../../spinner/spinner";

const RenderOption = (option: any) => (
  <div>
    <strong>{option.label}</strong>
    <div>
      <small>
        <i>{option.EmailAddress}</i> | <span>{option.Department}</span>
      </small>
    </div>
  </div>
);
export default class FlowSurvey extends React.Component<ISurveyProps, ISurveyState> {
  private ListService: ListServices;
  private tableHeaders: ITableHeader[];
  private HistorytableHeaders: ITableHeader[];
  private util: Util;
  public constructor(props: ISurveyProps) {
    super(props);
    this.ListService = new ListServices();
    this.util = new Util();
    this.tableHeaders = [
      { id: "Row", label: "Row" },
      { id: "Selected", label: "Selected Person" },
      { id: "Action", label: "Delete" },
    ];
    this.HistorytableHeaders = [
      { id: "Row", label: "Row" },
      { id: "ModifiedBy", label: "ModifiedBy" },
      { id: "ModifiedDate", label: "ModifiedDate" },
      { id: "Added", label: "Added" },
      { id: "Deleted", label: "Deleted" },
    ];
    this.state = {
      showSpinner: true,
      UserInfo: [],
      SelectedPeerID: 0,
      SelectedPeer: "",
      SelectedOtherID: 0,
      SelectedOther: "",
      SelectedSubOrdinate: "",
      SelectedSubOrdinateID: 0,
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
      activeStep: 0,
      NominationData: {
        Status: "",
        Subordinates: [],
        Others: [],
        Peers: [],
        User: {
          AvatarUrl: "",
          Id: 0,
          ItemId: 894,
          SPLatinFullName: "",
          Department: "",
          EmailAddress: "",
          JobGrade: "",
        },
        LineManager: {
          AvatarUrl: "",
          Id: 0,
          ItemId: 894,
          SPLatinFullName: "",
          Department: "",
          EmailAddress: "",
          JobGrade: "",
        },
      },
      NominationHistory: [
        {
          Changes: [],
          Field: "",
        },
      ],
    };
  }

  public async componentDidMount() {
    const itemId = this.util.getQueryStringValue("itemid");
    await this.loadUsers();
    const NominationData: NominationData = await this.ListService.getNominationData(Number(itemId));
    const NominationHistory: IHistory[] = await this.ListService.getNominationHistory(Number(itemId));
    let activeStep: number = 0;
    switch (NominationData.Status) {
      case "LineManagerApproval": {
        activeStep = 1;
        break;
      }
      case "BPApproval": {
        activeStep = 2;
        break;
      }
      case "CXOApproval": {
        activeStep = 3;
        break;
      }
      default:
        activeStep = 0;
    }

    this.setState(prevState => {
      return {
        ...prevState,
        itemId: Number(itemId),
        NominationData,
        activeStep,
        NominationHistory,
        showSpinner: false,
      };
    });
  }

  private async loadOptions(inputValue: string) {
    return await this.ListService.getUserInfo(inputValue);
  }

  public render() {
    return (
      <div>
        {this.state.showSpinner && <Spinner />}
        {!this.state.showSpinner && (
          <MDBCol>
            <div className="card-header mt-2">
              <div className="content">
                <p className="user">
                  <strong>{this.state.NominationData.User!.SPLatinFullName}</strong>{" "}
                  <h6>
                    {this.state.NominationData.User!.EmailAddress} | {this.state.NominationData.User!.Department} |{" "}
                    {this.state.NominationData.User!.JobGrade}{" "}
                  </h6>
                </p>

                <div className="page-header">Nomination Form</div>
              </div>
            </div>
            <MDBCard className="w-auto">
              <div>
                <MYStepper activeStep={this.state.activeStep} />
              </div>

              <MDBCardBody>
                <MDBCardText>
                  <MDBContainer>
                    <MDBRow>
                      <MDBCol>
                        <h3 className="pt-5 category">Subordinates</h3>
                        <MDBRow>
                          <AsyncSelect
                            defaultOptions
                            getOptionLabel={RenderOption as any}
                            className="basic-single"
                            classNamePrefix="select"
                            loadOptions={inputValue => this.loadOptions(inputValue)}
                            isSearchable={true}
                            name="SelectedSubOrdinate"
                            isLoading={this.state.UsersIsLoading}
                            onChange={(ev: any) => this.onSelectAutoComplete(ev, "SelectedSubOrdinate")}
                            options={this.state.UserInfo}
                            placeholder="select..."
                          />

                          <Tooltip title="Add" aria-label="add">
                            <Fab size="small" color="primary" className="ml-3" aria-label="add">
                              <Add onClick={(ev: any) => this.AddItem("SelectedSubOrdinate")} />
                            </Fab>
                          </Tooltip>
                        </MDBRow>
                        <MDBRow>
                          <Card className="CardTable">
                            <Table className="table">
                              <TableHead>
                                <TableRow>{this.renderHeader(this.tableHeaders)}</TableRow>
                              </TableHead>
                              <TableBody>{this.onRenderRows("SubOrdinate")}</TableBody>
                            </Table>
                          </Card>
                        </MDBRow>
                      </MDBCol>
                      <MDBCol>
                        <MDBRow />
                        <h3 className="pt-5 category">History</h3>
                        <Card className="CardTable">
                          <Table className="table">
                            <TableHead>
                              <TableRow>{this.renderHistoryHeader(this.HistorytableHeaders)}</TableRow>
                            </TableHead>
                            <TableBody>{this.onRenderHistoryRows()}</TableBody>
                          </Table>
                        </Card>
                      </MDBCol>
                    </MDBRow>

                    <MDBRow>
                      <MDBCol>
                        <h3 className="pt-3 category">Peer</h3>

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
                            <Fab size="small" color="primary" className="ml-3" aria-label="add">
                              <Add onClick={(ev: any) => this.AddItem("SelectedPeer")} />
                            </Fab>
                          </Tooltip>
                        </MDBRow>

                        <MDBRow>
                          <Card className="CardTable">
                            <Table className="table">
                              <TableHead>
                                <TableRow>{this.renderHeader(this.tableHeaders)}</TableRow>
                              </TableHead>
                              <TableBody>{this.onRenderRows("Peer")}</TableBody>
                            </Table>
                          </Card>
                        </MDBRow>
                      </MDBCol>
                      <MDBCol />
                    </MDBRow>

                    <MDBRow>
                      <MDBCol>
                        <h3 className="pt-5 category">Other</h3>

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
                            <Fab size="small" className="ml-3" color="primary" aria-label="add">
                              <Add onClick={(ev: any) => this.AddItem("SelectedOther")} />
                            </Fab>
                          </Tooltip>
                        </MDBRow>

                        <MDBRow>
                          <Card className="CardTable">
                            <Table className="table">
                              <TableHead>
                                <TableRow>{this.renderHeader(this.tableHeaders)}</TableRow>
                              </TableHead>
                              <TableBody>{this.onRenderRows("Other")}</TableBody>
                            </Table>
                          </Card>
                        </MDBRow>
                      </MDBCol>
                      <MDBCol />
                    </MDBRow>
                  </MDBContainer>
                </MDBCardText>
                <MDBBtn size="sm" color="dark-green" onClick={this.SubmitForm}>
                  Submit
                </MDBBtn>
                <MDBBtn size="sm" color="grey lighten-3">
                  Cancel
                </MDBBtn>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        )}
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
  };
  /*************************************************************************************************** */
  public loadUsers = async () => {
    let UserInfo: any[];
    await this.ListService.getUserInfo("").then(response => {
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
  private AddItem = (FieldName: string) => {
    if (FieldName === "SelectedOther") {
      const ValidTableLength = this.TableLengthValidation(this.state.NominationData.Others);
      if (ValidTableLength === false) {
        const NewItem: IUser[] = this.state.NominationData.Others;
        const index = NewItem.findIndex(x => x.SPLatinFullName === this.state.SelectedOther);
        if (index > -1) {
          this.setState(prevState => {
            return {
              ...prevState,
              snackbarMessage: "User Exist!",
              showSnackbarMessage: true,
              snackbarType: SnackBarMode.Error,
            };
          });
        } else {
          NewItem.push({ SPLatinFullName: this.state.SelectedOther, ItemId: this.state.SelectedOtherID });
          this.setState(prevState => {
            return {
              ...prevState,
              SelectedOthers: NewItem,
            };
          });
        }
      }
    } else if (FieldName === "SelectedPeer") {
      const ValidTableLength = this.TableLengthValidation(this.state.NominationData.Peers);
      if (ValidTableLength === false) {
        const NewItem: IUser[] = this.state.NominationData.Peers;
        const index = NewItem.findIndex(x => x.SPLatinFullName === this.state.SelectedPeer);
        if (index > -1) {
          this.setState(prevState => {
            return {
              ...prevState,
              snackbarMessage: "User Exist!",
              showSnackbarMessage: true,
              snackbarType: SnackBarMode.Error,
            };
          });
        } else {
          NewItem.push({ SPLatinFullName: this.state.SelectedPeer, ItemId: this.state.SelectedPeerID });
          this.setState(prevState => {
            return {
              ...prevState,
              SelectedPeers: NewItem,
            };
          });
        }
      }
    } else {
      const ValidTableLength = this.TableLengthValidation(this.state.NominationData.Subordinates);
      if (ValidTableLength === false) {
        const NewItem: IUser[] = this.state.NominationData.Subordinates;
        const index = NewItem.findIndex(x => x.SPLatinFullName === this.state.SelectedSubOrdinate);
        if (index > -1) {
          this.setState(prevState => {
            return {
              ...prevState,
              snackbarMessage: "User Exist!",
              showSnackbarMessage: true,
              snackbarType: SnackBarMode.Error,
            };
          });
        } else {
          NewItem.push({ SPLatinFullName: this.state.SelectedSubOrdinate, ItemId: this.state.SelectedSubOrdinateID });
          this.setState(prevState => {
            return {
              ...prevState,
              SelectedPeers: NewItem,
            };
          });
        }
      }
    }
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

  /**************************** Repeat Table ****************************** */
  private renderHeader = (columnDetail: any[]) => {
    return columnDetail.map(
      row => (
        <TableCell className="LogPadding" key={row.id} align="center" padding="none" sortDirection="desc">
          {row.label}
        </TableCell>
      ),
      this,
    );
  };

  private onRenderRows = (TableName: string) => {
    let items: any[] = [];
    switch (TableName) {
      case "SubOrdinate": {
        items = this.state.NominationData.Subordinates;
        break;
      }
      case "Peer": {
        items = this.state.NominationData.Subordinates;
        break;
      }
      case "Other": {
        items = this.state.NominationData.Subordinates;
        break;
      }
      default:
        items = this.state.NominationData.Subordinates;
    }

    return items.map((n: any, index: any) => {
      return (
        <TableRow key={index}>
          <TableCell style={{ width: "3%" }} align="center">
            {index + 1}
          </TableCell>
          <TableCell align="center">{n.SPLatinFullName}</TableCell>
          <TableCell style={{ width: "3%" }} align="center" onClick={() => this.DeleteItem(n.SPLatinFullName)}>
            <Delete cursor="pointer" color="primary" />
          </TableCell>
        </TableRow>
      );
    });
  };
  /******************************delete item from table***************************************************** */
  private DeleteItem = (currentItem: string) => {
    this.setState(prevState => {
      // const prevValues=items;
      const prevValues = prevState.NominationData.Subordinates || [];
      const newValue = prevValues.filter(el => el.SPLatinFullName !== currentItem);
      return {
        ...prevState,
        NominationData: {
          ...prevState.NominationData,
          Subordinates: newValue,
        },
      };
    });
  };
  /**************************** Repeat Table ****************************** */
  private renderHistoryHeader = (columnDetail: any[]) => {
    return columnDetail.map(
      row => (
        <TableCell className="LogPadding" key={row.id} align="center" padding="none" sortDirection="desc">
          {row.label}
        </TableCell>
      ),
      this,
    );
  };

  private onRenderHistoryRows = () => {
    const Subordinates = this.state.NominationHistory.filter(el => el.Field === "Subordinate");
    for (let i = 0; i < Subordinates.length; ++i) {
      return Subordinates[i].Changes.map((n: any, index: any) => {
        let DeletedStr: string = "";
        let AddedStr: string = "";
        if (n.Added !== null) {
          AddedStr = n.Added.join();
        }
        if (n.Deleted !== null) {
          DeletedStr = n.Deleted.join();
        }

        return (
          <TableRow key={index}>
            <TableCell align="center">{index + 1}</TableCell>
            <TableCell align="center">{n.ModifiedBy}</TableCell>
            <TableCell align="center">{n.ModifiedDateShamsi}</TableCell>
            <TableCell align="center">{AddedStr}</TableCell>
            <TableCell align="center">{DeletedStr}</TableCell>
          </TableRow>
        );
      });
    }
  };
  /*********************table length validation**************************************** */
  private TableLengthValidation = (FieldName: any[]) => {
    if (FieldName.length >= 15) {
      this.setState(prevState => {
        return {
          ...prevState,
          snackbarMessage: "you should select between 3 to 15 users!",
          showSnackbarMessage: true,
          snackbarType: SnackBarMode.Error,
        };
      });
      return true;
    }
    return false;
  };
  /****************************on form submited*************************************/
  private SubmitForm = () => {
    const UpdateItem: IUpdatedData = {
      ItemId: this.state.itemId,
      peer: this.state.SelectedPeers,
      other: this.state.SelectedOthers,
    };
    this.ListService.updateNominationData(UpdateItem);
  };
}
