import * as React from "react";
import ISurveyProps from "./survey-props";
import ISurveyState from "./survey-state";
import "./survey.css";
import ListServices from "../../../../services/list-services";
import AsyncSelect from "react-select/async";
import Add from "@material-ui/icons/Add";
import { Fab, Tooltip, Table, TableRow, TableBody, TableCell } from "@material-ui/core";

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
import Spinner from "../../../spinner/spinner";
import Forward from "@material-ui/icons/ArrowBack";
import Authentication from "../../../authentication/authentication";
import { NominationFormHeader } from "../nomination-form-header/nomination-form-header";

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
      SelectedSubOrdinates: [],
      showSnackbarMessage: false,
      snackbarMessage: "",
      snackbarType: SnackBarMode.Info,
      UsersIsLoading: true,
      itemId: 0,
      activeStep: 0,
      NominationData: {
        Status: "",
        Subordinates: [],
        Other: [],
        Peer: [],
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
      HideSubordinateHistory: true,
      HideOtherHistory: true,
      HidePeerHistory: true,
    };
  }

  public async componentDidMount() {
    document.title = "Nomination Form";
    const itemId = this.util.getQueryStringValue("itemid");
    await this.loadUsers();
    const NominationData: NominationData = await this.ListService.getNominationData(Number(itemId));
    console.log(NominationData);
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
          <div>
            {this.state.NominationData.statusCode !== 200 && (
              <Authentication status={this.state.NominationData.statusCode || 401} />
            )}
            {this.state.NominationData.statusCode === 200 && (
              <div className="col-lg">
                <NominationFormHeader user={this.state.NominationData.User}></NominationFormHeader>
                <div>
                  <div className="kt-portlet kt-sc-2">
                    <div className="kt-portlet__body">
                      <MYStepper activeStep={this.state.activeStep} />
                    </div>

                    <div>
                      <h3 className="pt-3 kt-portlet__head-title" style={{ margin: "0 5rem 2rem 0" }}>
                        نیروی مستقیم تحت سرپرستی
                      </h3>
                      <div className="kt-container  kt-grid__item kt-grid__item--fluid">
                        <div className="row">
                          <div className="col-lg-6" />
                          <div className="col-lg-1">
                            <Tooltip title="Add" aria-label="add">
                              <Fab
                                size="small"
                                className="ml-3 btn btn-bold btn-sm btn-font-sm  btn-label-brand firstADD"
                                aria-label="add"
                                onClick={(ev: any) => {
                                  // ev.preventDefault();
                                  this.AddItem("SelectedSubOrdinate");
                                }}
                                onKeyPress={(e: any) => this.onAddkeyPress(e, "SelectedSubOrdinate")}
                              >
                                <Add />
                              </Fab>
                            </Tooltip>
                          </div>
                          <div className="col-lg-4">
                            <div className="inline-items" dir="rtl">
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
                                onKeyDown={(e: any) => this.keyPress(e, "firstADD")}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="kt-container  kt-grid__item kt-grid__item--fluid">
                        <div className="row">
                          <div className="col-lg-6">
                            {this.state.HideSubordinateHistory === false && (
                              <div>
                                <div className="kt-portlet">
                                  <div>
                                    {" "}
                                    <h3 dir="rtl" className="pt-3 ml-5 kt-portlet__head-title">
                                      History
                                    </h3>
                                  </div>
                                  <div className="kt-portlet__body">
                                    <Table dir="rtl" className="kt-datatable__table">
                                      <thead className="kt-datatable__head">
                                        <TableRow>{this.renderHistoryHeader(this.HistorytableHeaders)}</TableRow>
                                      </thead>
                                      <TableBody>{this.onRenderHistoryRows("Subordinate")}</TableBody>
                                    </Table>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                          <div className="col-lg-1">
                            <Tooltip
                              style={{ marginTop: "16%" }}
                              title="show history table"
                              aria-label="show history table"
                            >
                              <Fab
                                size="small"
                                color="secondary"
                                className="ml-3 btn btn-bold btn-sm btn-font-sm  btn-label-success"
                                aria-label="show history table"
                              >
                                <Forward onClick={(ev: any) => this.HideHistory("Subordinate")} />
                              </Fab>
                            </Tooltip>
                          </div>
                          <div className="col-lg-4">
                            <div className="inline-items">
                              <div className="kt-portlet">
                                <div className="kt-portlet__body">
                                  <Table dir="rtl" className="kt-datatable__table">
                                    <thead className="kt-datatable__head">
                                      <TableRow>{this.renderHeader(this.tableHeaders)}</TableRow>
                                    </thead>
                                    <TableBody>{this.onRenderRows("Subordinates")}</TableBody>
                                  </Table>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <hr />
                      <h3 className="pt-5 kt-portlet__head-title" style={{ margin: "0 5rem 2rem 0" }}>
                        همکار همرده
                      </h3>
                      <div className="kt-container  kt-grid__item kt-grid__item--fluid">
                        <div className="row">
                          <div className="col-lg-6" />
                          <div className="col-lg-1">
                            <Tooltip title="Add" aria-label="add">
                              <Fab
                                size="small"
                                className="ml-3 btn btn-bold btn-sm btn-font-sm  btn-label-brand secondADD"
                                aria-label="add"
                                onClick={(ev: any) => this.AddItem("SelectedPeer")}
                                onKeyPress={(e: any) => this.onAddkeyPress(e, "SelectedPeer")}
                              >
                                <Add />
                              </Fab>
                            </Tooltip>
                          </div>
                          <div className="col-lg-4">
                            <div className="inline-items" dir="rtl">
                              <AsyncSelect
                                defaultOptions
                                getOptionLabel={RenderOption as any}
                                className="basic-single"
                                classNamePrefix="select"
                                loadOptions={inputValue => this.loadOptions(inputValue)}
                                isSearchable={true}
                                name="SelectedPeer"
                                isLoading={this.state.UsersIsLoading}
                                onChange={(ev: any) => this.onSelectAutoComplete(ev, "SelectedPeer")}
                                options={this.state.UserInfo}
                                placeholder="select..."
                                onKeyDown={(e: any) => this.keyPress(e, "secondADD")}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="kt-container  kt-grid__item kt-grid__item--fluid">
                        <div className="row">
                          <div className="col-lg-6">
                            {this.state.HidePeerHistory === false && (
                              <div className="kt-portlet">
                                <div>
                                  {" "}
                                  <h3 dir="rtl" className="pt-3 ml-5 kt-portlet__head-title">
                                    History
                                  </h3>
                                </div>
                                <div className="kt-portlet__body">
                                  <Table dir="rtl" className="kt-datatable__table">
                                    <thead className="kt-datatable__head">
                                      <TableRow>{this.renderHistoryHeader(this.HistorytableHeaders)}</TableRow>
                                    </thead>
                                    <TableBody>{this.onRenderHistoryRows("Peer")}</TableBody>
                                  </Table>
                                </div>
                              </div>
                            )}
                          </div>
                          <div className="col-lg-1">
                            <Tooltip
                              style={{ marginTop: "16%" }}
                              title="show history table"
                              aria-label="show history table"
                            >
                              <Fab
                                size="small"
                                color="secondary"
                                className="ml-3 btn btn-bold btn-sm btn-font-sm  btn-label-success"
                                aria-label="show history table"
                              >
                                <Forward onClick={(ev: any) => this.HideHistory("Peer")} />
                              </Fab>
                            </Tooltip>
                          </div>
                          <div className="col-lg-4">
                            <div className="inline-items">
                              <div className="kt-portlet">
                                <div className="kt-portlet__body">
                                  <Table dir="rtl" className="kt-datatable__table">
                                    <thead className="kt-datatable__head">
                                      <TableRow>{this.renderHeader(this.tableHeaders)}</TableRow>
                                    </thead>
                                    <TableBody>{this.onRenderRows("Peer")}</TableBody>
                                  </Table>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <hr />
                      <h3 className="pt-5 kt-portlet__head-title" style={{ margin: "0 5rem 2rem 0" }}>
                        سایرین
                      </h3>
                      <div className="kt-container  kt-grid__item kt-grid__item--fluid">
                        <div className="row">
                          <div className="col-lg-6" />
                          <div className="col-lg-1">
                            <Tooltip title="Add" aria-label="add">
                              <Fab
                                size="small"
                                className="ml-3 btn btn-bold btn-sm btn-font-sm  btn-label-brand thirdAdd"
                                aria-label="add"
                                onKeyPress={(e: any) => this.onAddkeyPress(e, "SelectedOther")}
                                onClick={(ev: any) => this.AddItem("SelectedOther")}
                              >
                                <Add />
                              </Fab>
                            </Tooltip>
                          </div>
                          <div className="col-lg-4">
                            <div className="inline-items" dir="rtl">
                              <AsyncSelect
                                defaultOptions
                                getOptionLabel={RenderOption as any}
                                className="basic-single"
                                classNamePrefix="select"
                                loadOptions={inputValue => this.loadOptions(inputValue)}
                                isSearchable={true}
                                name="SelectedOther"
                                isLoading={this.state.UsersIsLoading}
                                onChange={(ev: any) => this.onSelectAutoComplete(ev, "SelectedOther")}
                                options={this.state.UserInfo}
                                placeholder="select..."
                                onKeyDown={(e: any) => this.keyPress(e, "thirdAdd")}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="kt-container  kt-grid__item kt-grid__item--fluid">
                      <div className="row">
                        <div className="col-lg-6">
                          {this.state.HideOtherHistory === false && (
                            <div>
                              <div className="kt-portlet">
                                <div>
                                  {" "}
                                  <h3 dir="rtl" className="pt-3 ml-5 kt-portlet__head-title">
                                    History
                                  </h3>
                                </div>
                                <div className="kt-portlet__body">
                                  <Table dir="rtl" className="kt-datatable__table">
                                    <thead className="kt-datatable__head">
                                      <TableRow>{this.renderHistoryHeader(this.HistorytableHeaders)}</TableRow>
                                    </thead>
                                    <TableBody>{this.onRenderHistoryRows("Other")}</TableBody>
                                  </Table>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="col-lg-1">
                          <Tooltip
                            style={{ marginTop: "16%" }}
                            title="show history table"
                            aria-label="show history table"
                          >
                            <Fab
                              size="small"
                              color="secondary"
                              className="ml-3 btn btn-bold btn-sm btn-font-sm  btn-label-success"
                              aria-label="show history table"
                            >
                              <Forward onClick={(ev: any) => this.HideHistory("Other")} />
                            </Fab>
                          </Tooltip>
                        </div>
                        <div className="col-lg-4">
                          <div className="inline-items">
                            <div className="kt-portlet">
                              <div className="kt-portlet__body">
                                <Table dir="rtl" className="kt-datatable__table">
                                  <thead className="kt-datatable__head">
                                    <TableRow>{this.renderHeader(this.tableHeaders)}</TableRow>
                                  </thead>
                                  <TableBody>{this.onRenderRows("Other")}</TableBody>
                                </Table>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <button
                      className="btn btn-secondary "
                      onKeyPress={e => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                        }
                      }}
                      onClick={e => {
                        e.preventDefault();
                        return false;
                      }}
                    >
                      انصراف
                    </button>
                    <button
                      onKeyPress={e => {
                        if (e.key === "Enter") e.preventDefault();
                      }}
                      className="btn btn-primary mr-2"
                      onClick={this.SubmitForm}
                    >
                      تایید
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
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
    console.log(FieldName);
    if (FieldName === "SelectedOther") {
      const ValidTableLength = this.TableLengthValidation(this.state.NominationData.Other);
      if (ValidTableLength === false) {
        const NewItem: IUser[] = this.state.NominationData.Other;
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
          if (this.state.SelectedOther !== "")
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
      const ValidTableLength = this.TableLengthValidation(this.state.NominationData.Peer);
      if (ValidTableLength === false) {
        const NewItem: IUser[] = this.state.NominationData.Peer;
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
          if (this.state.SelectedPeer !== "")
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
          if (this.state.SelectedSubOrdinate !== "")
            NewItem.push({ SPLatinFullName: this.state.SelectedSubOrdinate, ItemId: this.state.SelectedSubOrdinateID });
          this.setState(prevState => {
            return {
              ...prevState,
              SelectedSubOrdinates: NewItem,
            };
          });
        }
      }
    }
  };
  /****************************hide history table***************************** */
  private HideHistory = (FieldName: string) => {
    if (FieldName === "Subordinate") {
      this.setState(prevState => {
        return {
          ...prevState,
          HideSubordinateHistory: !this.state.HideSubordinateHistory,
        };
      });
    }
    if (FieldName === "Peer") {
      this.setState(prevState => {
        return {
          ...prevState,
          HidePeerHistory: !this.state.HidePeerHistory,
        };
      });
    }
    if (FieldName === "Other") {
      this.setState(prevState => {
        return {
          ...prevState,
          HideOtherHistory: !this.state.HideOtherHistory,
        };
      });
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
        <TableCell className="LogPadding" key={row.id} sortDirection="desc">
          {row.label}
        </TableCell>
      ),
      this,
    );
  };

  private onRenderRows = (TableName: string) => {
    let items: any[] = [];
    switch (TableName) {
      case "Subordinates": {
        items = this.state.NominationData.Subordinates;
        break;
      }
      case "Peer": {
        items = this.state.NominationData.Peer;
        break;
      }
      case "Other": {
        items = this.state.NominationData.Other;
        break;
      }
      default:
        items = this.state.NominationData.Subordinates;
    }
    if (items.length === 0) {
      return (
        <TableRow>
          <TableCell align="center" colSpan={3} className="emptyRowLog">
            There is no data to display!
          </TableCell>
        </TableRow>
      );
    } else {
      return items.map((n: any, index: any) => {
        return (
          <TableRow key={index}>
            <TableCell style={{ width: "3%" }} align="center">
              {index + 1}
            </TableCell>
            <TableCell>{n.SPLatinFullName}</TableCell>
            <TableCell
              style={{ width: "3%" }}
              align="center"
              onClick={() => this.DeleteItem(n.SPLatinFullName, TableName)}
            >
              <Delete cursor="pointer" className="flaticon-pie-chart-1 kt-font-info" />
            </TableCell>
          </TableRow>
        );
      });
    }
  };
  /******************************delete item from table***************************************************** */
  private DeleteItem = (currentItem: string, TableName: string) => {
    this.setState(prevState => {
      let prevValues = [];
      switch (TableName) {
        case "Subordinates": {
          prevValues = prevState.NominationData.Subordinates || [];
          break;
        }
        case "Peer": {
          prevValues = prevState.NominationData.Peer || [];
          break;
        }
        case "Other": {
          prevValues = prevState.NominationData.Other || [];
          break;
        }
        default:
          prevValues = prevState.NominationData.Subordinates || [];
      }

      const newValue = prevValues.filter(el => el.SPLatinFullName !== currentItem);
      return {
        ...prevState,
        NominationData: {
          ...prevState.NominationData,
          [TableName]: newValue,
        },
      };
    });
  };
  /**************************** Repeat Table ****************************** */
  private renderHistoryHeader = (columnDetail: any[]) => {
    return columnDetail.map(
      row => (
        <TableCell className="LogPadding" key={row.id} sortDirection="desc">
          {row.label}
        </TableCell>
      ),
      this,
    );
  };

  private onRenderHistoryRows = (tableName: string) => {
    const Subordinates = this.state.NominationHistory.filter(el => el.Field === "Subordinate");
    const Peer = this.state.NominationHistory.filter(el => el.Field === "Peer");
    const Other = this.state.NominationHistory.filter(el => el.Field === "Other");
    let items: any[] = [];
    switch (tableName) {
      case "Subordinate": {
        items = Subordinates;
        break;
      }
      case "Other": {
        items = Other;
        break;
      }
      case "Peer": {
        items = Peer;
        break;
      }
      default:
        items = Subordinates;
    }

    for (let i = 0; i < items.length; ++i) {
      return items[i].Changes.map((n: any, index: any) => {
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
            <TableCell align="center" className={AddedStr !== "" ? "kt-font-bold kt-font-success" : ""}>
              {AddedStr}
            </TableCell>
            <TableCell align="center" className={DeletedStr !== "" ? "kt-font-bold kt-font-danger" : ""}>
              {DeletedStr}
            </TableCell>
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
    let dataComparison: string = this.Compare(
      this.state.NominationData.Peer,
      this.state.NominationData.Other,
      this.state.NominationData.Subordinates,
    );
    console.log(dataComparison);
    if ((dataComparison = "")) {
      const subordinateLength = this.state.NominationData.Subordinates.length;
      const Other = this.state.NominationData.Other.length;
      const Peer = this.state.NominationData.Peer.length;
      if (subordinateLength <= 2 || Other <= 2 || Peer <= 2) {
        this.setState(prevState => {
          return {
            ...prevState,
            snackbarMessage: "you should select between 3 to 15 users!",
            showSnackbarMessage: true,
            snackbarType: SnackBarMode.Error,
          };
        });
      } else {
        const UpdateItem: IUpdatedData = {
          ItemId: this.state.itemId,
          peer: this.state.NominationData.Peer,
          other: this.state.NominationData.Other,
          subordinate: this.state.NominationData.Subordinates,
        };
        this.ListService.updateNominationData(UpdateItem);
        this.setState(prevState => {
          return {
            ...prevState,
            snackbarMessage: "successfully submitted!",
            showSnackbarMessage: true,
            snackbarType: SnackBarMode.Success,
          };
        });
        window.location.href = "?page=nominationintro&itemid=" + this.state.itemId + "";
      }
    } else {
      this.setState(prevState => {
        return {
          ...prevState,
          snackbarMessage: "peer, other or subordinate cant have common user",
          showSnackbarMessage: true,
          snackbarType: SnackBarMode.Error,
        };
      });
    }
  };
  /*******compare if peer or other or subordinate are the same******************* */
  private Compare = (Peer: any[], Other: any[], SubOrdinate: any[]) => {
    const allData: any[] = Peer.map(x => x.ItemId)
      .concat(Other.map(x => x.ItemId))
      .concat(SubOrdinate.map(x => x.ItemId));
    console.log(allData);
    const disttictAlldata: any[] = allData.filter(this.distict);
    console.log(disttictAlldata);
    if (disttictAlldata.length < allData.length) {
      return "peer, other or subordinate cant have common user";
    } else {
      return "";
    }
  };
  private distict = (value: any, index: any, self: any[]) => {
    return self.indexOf(value) == index;
  };
  private keyPress(e: any, value: string) {
    if (e.keyCode == 13) {
      var x = document.getElementsByClassName(value) as HTMLCollectionOf<HTMLElement>;
      console.log(x);
      x[0].focus();

      // console.log(this.  next.focus();
    }
  }
  /***************************************************** */
  private onAddkeyPress(e: any, value: string) {
    debugger;
    if (e.keyCode == 13) {
      console.log(e.keyCode);
      this.AddItem(value);
    }
  }
}
