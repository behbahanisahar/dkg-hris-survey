import * as React from "react";
import ISurveyProps from "./self-nomination-form-props";
import ISurveyState from "./self-nomination-form-state";
import { MDBCard, MDBCardBody, MDBContainer, MDBCardText } from "mdbreact";
import "./self-enomination-form.css";
import ListServices from "../../../../services/list-services";
import SPLists from "../../../../entities/lists";
import Add from "@material-ui/icons/Add";
import { Fab, Tooltip, Table, TableRow, TableBody, TableCell } from "@material-ui/core";
import AsyncSelect from "react-select/async";
import SnackBarMode from "../../../../entities/snackbar-mode";
import SnackBarMessage from "../snakbar-message/snackbar-message";
import Util from "../../../../utilities/utilities";
import NominationData from "../../../../entities/nomination";
import IUser from "../../../../entities/user";
import IUpdatedData from "../../../../entities/updatedNominationItem";
import MYStepper from "../../../stepper/stepper";
import ITableHeader from "../../../../entities/table-headers";
import Delete from "@material-ui/icons/Delete";
import Spinner from "../../../spinner/spinner";
import Authentication from "../../../authentication/authentication";
import { NominationFormHeader } from "../nomination-form-header/nomination-form-header";
import Search from "@material-ui/icons/Search";

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
export default class SelfNomination extends React.Component<ISurveyProps, ISurveyState> {
  private ListService: ListServices;
  private tableHeaders: ITableHeader[];
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
    this.state = {
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
      showSpinner: true,
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
    };
  }

  public async componentDidMount() {
    document.title = "Nomination Form";
    const itemId = this.util.getQueryStringValue("itemid");
    await this.loadUsers();
    const NominationData: NominationData = await this.ListService.getNominationData(Number(itemId));

    this.setState(prevState => {
      return {
        ...prevState,
        itemId: Number(itemId),
        NominationData,
        showSpinner: false,
      };
    });
  }

  public render() {
    // const Subordinates = this.state.NominationData.Subordinates;
    return (
      <div>
        {this.state.showSpinner && <Spinner />}
        {!this.state.showSpinner && (
          <div>
            {this.state.NominationData.statusCode !== 200 && (
              <Authentication status={this.state.NominationData.statusCode || 401} />
            )}
            {this.state.NominationData.statusCode === 200 && (
              <div className="col-sm">
                <NominationFormHeader user={this.state.NominationData.User}></NominationFormHeader>
                <MDBCard className="w-auto">
                  <div>
                    <MYStepper activeStep={this.state.activeStep} />
                  </div>

                  <MDBCardBody>
                    <MDBCardText>
                      <MDBContainer>
                        <h3 className="pt-5 kt-portlet__head-title">نیروی مستقیم تحت سرپرستی</h3>
                        <div className="row">
                          <div className="col-sm-3" />
                          <div className="col-sm-7">
                            <div className="inline-items" dir="rtl">
                              <AsyncSelect
                                defaultOptions
                                getOptionLabel={RenderOption as any}
                                className="basic-single  "
                                classNamePrefix="select"
                                dir="ltr"
                                loadOptions={inputValue => this.loadOptions(inputValue)}
                                isSearchable={true}
                                name="SelectedSubOrdinate"
                                isLoading={this.state.UsersIsLoading}
                                onChange={(ev: any) => this.onSelectAutoComplete(ev, "SelectedSubOrdinate")}
                                options={this.state.UserInfo}
                                placeholder="select..."
                                IconComponent={Search}
                                onKeyDown={(e: any) => this.keyPress(e, "firstADD")}
                              />

                              <Tooltip title="Add" aria-label="add">
                                <Fab
                                  size="small"
                                  color="primary"
                                  className="ml-3 kt-header__topbar-icon kt-header__topbar-icon--brand firstADD"
                                  aria-label="add"
                                  onClick={(ev: any) => this.AddItem("SelectedSubOrdinate")}
                                  onKeyPress={(e: any) => this.onAddkeyPress(e, "SelectedSubOrdinate")}
                                >
                                  <Add />
                                </Fab>
                              </Tooltip>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-sm-3" />
                          <div className="col-sm-7">
                            <div className="kt-portlet">
                              <div className="kt-portlet__head">
                                <div className="kt-portlet__head-label">
                                  <h3 className="pt-5 kt-portlet__head-title">Subordinates</h3>
                                </div>
                              </div>
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
                        <hr />
                        <h3 className="pt-5 kt-portlet__head-title">همکار همرده</h3>

                        <div className="row">
                          <div className="col-sm-3" />
                          <div className="col-sm-7">
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
                                IconComponent={Search}
                                onKeyDown={(e: any) => this.keyPress(e, "secondAdd")}
                              />

                              <Tooltip title="Add" aria-label="add">
                                <Fab
                                  size="small"
                                  color="primary"
                                  className="ml-3 secondAdd"
                                  aria-label="add"
                                  onClick={(ev: any) => this.AddItem("SelectedPeer")}
                                  onKeyPress={(e: any) => this.onAddkeyPress(e, "SelectedPeer")}
                                >
                                  <Add />
                                </Fab>
                              </Tooltip>
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-sm-3" />
                          <div className="col-sm-7">
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
                          <div className="col-sm" />
                        </div>
                        <hr />
                        <h3 className="pt-5 kt-portlet__head-title">سایرین</h3>

                        <div className="row">
                          <div className="col-sm-3" />
                          <div className="col-sm-7">
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
                                IconComponent={Search}
                                dir="rtl"
                                onKeyDown={(e: any) => this.keyPress(e, "thirdAdd")}
                              />
                              <Tooltip title="Add" aria-label="add">
                                <Fab
                                  onClick={(ev: any) => this.AddItem("SelectedOther")}
                                  onKeyPress={(e: any) => this.onAddkeyPress(e, "SelectedOther")}
                                  size="small"
                                  className="ml-3 thirdAdd"
                                  color="primary"
                                  aria-label="add"
                                >
                                  <Add />
                                </Fab>
                              </Tooltip>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-sm-3" />
                          <div className="col-sm-7">
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
                      </MDBContainer>
                    </MDBCardText>
                    <div className="col-lg-12">
                      <button
                        onKeyPress={e => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                          }
                        }}
                        onClick={e => {
                          e.preventDefault();
                          return false;
                        }}
                        className="btn btn-secondary "
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
                  </MDBCardBody>
                </MDBCard>
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
  private AddItem = (FieldName: string) => {
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

  /**************************** SnackBar ****************************** */
  private handleCloseMessage = () => {
    if (this.state.snackbarType === SnackBarMode.Success) {
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
            <TableCell style={{ width: "1%" }} align="center">
              {index + 1}
            </TableCell>
            <TableCell align="center">{n.SPLatinFullName}</TableCell>
            <TableCell align="center" style={{ width: "3%" }}>
              <Delete
                className="flaticon-pie-chart-1 kt-font-info"
                onClick={() => this.DeleteItem(n.SPLatinFullName, TableName)}
              />
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
  /******************async select options******************************************** */
  private async loadOptions(inputValue: string) {
    return await this.ListService.getUserInfo(inputValue);
  }
  /******************dintics all items in tables******************************** */
  private distict = (value: any, index: any, self: any[]) => {
    return self.indexOf(value) == index;
  };
  /**********************async select key press function**************************** */
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
