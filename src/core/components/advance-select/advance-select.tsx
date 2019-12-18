import React from "react";
import IAdvanceSelectProps from "./advance-select-props";
import IAdvanceSelectState from "./advance-select-state";
import AsyncSelect from "react-select/async";
import { Tooltip, Fab, Table, TableRow, TableBody, TableCell } from "@material-ui/core";
import Add from "@material-ui/icons/Add";
import ITableHeader from "../../../entities/table-headers";
import Delete from "@material-ui/icons/Delete";
import IUser from "../../../entities/user";
import SnackBarMessage from "../../../features/nominationForm/components/snakbar-message/snackbar-message";
import SnackBarMode from "../../../entities/snackbar-mode";
import ListServices from "../../../services/list-services";
import "./advance-select.css";

const RenderOption = (option: any) => (
  <div>
    <span className="selector-item">{option.label}</span>
    <div>
      <small>
        <i>{option.EmailAddress}</i> | <span>{option.Department}</span> | <span>{option.ReportedPost}</span>
      </small>
    </div>
  </div>
);
class AdvanceSelect extends React.Component<IAdvanceSelectProps, IAdvanceSelectState> {
  private tableHeaders: ITableHeader[];
  private ListService: ListServices;
  constructor(props: IAdvanceSelectProps) {
    super(props);
    this.ListService = new ListServices();
    this.tableHeaders = [
      { id: "Row", label: "#" },
      { id: "Selected", label: "نام و نام خانوادگی" },
      { id: "Action", label: "" },
    ];

    this.state = {
      SelectedOtherReportPost: "",
      SelectedPeerReportPost: "",
      SelectedSubOrdinateReportPost: "",
      SelectedPeerID: 0,
      SelectedPeer: "",
      SelectedOtherID: 0,
      SelectedOther: "",
      SelectedSubOrdinate: "",
      SelectedSubOrdinateID: 0,
      NominationData: {
        status: "",
        subordinates: [],
        other: [],
        peer: [],
        user: {
          title: "",
          avatarUrl: "",
          id: 0,
          itemId: 894,
          sPLatinFullName: "",
          department: "",
          emailAddress: "",
          jobGrade: "",
          reportedPost: "",
        },
        lineManager: {
          title: "",
          avatarUrl: "",
          id: 0,
          itemId: 894,
          sPLatinFullName: "",
          department: "",
          emailAddress: "",
          jobGrade: "",
          reportedPost: "",
        },
      },
      SelectedPeers: [],
      SelectedOthers: [],
      SelectedSubOrdinates: [],
      showSnackbarMessage: false,
      snackbarMessage: "",
      snackbarType: SnackBarMode.Info,
    };
  }
  public async componentDidMount() {
    this.setState(prevState => {
      return {
        ...prevState,
        NominationData: this.props.NominationData,
      };
    });
  }

  public render() {
    return (
      <div>
        <div className="row">
          <div className="inline-items w-100" dir="rtl">
            <AsyncSelect
              defaultOptions
              getOptionLabel={RenderOption as any}
              className="basic-single"
              classNamePrefix="select"
              loadOptions={inputValue => this.loadOptions(inputValue)}
              isSearchable={true}
              name="SelectedOther"
              // isLoading={this.state.UsersIsLoading}
              onChange={(ev: any) => this.onSelectAutoComplete(ev, this.props.fieldName)}
              options={this.props.UserInfo}
              placeholder="انتخاب..."
              dir="rtl"
              onKeyDown={(e: any) => this.keyPress(e, this.props.AddOrder)}
            />
            <Tooltip title="Add" aria-label="add">
              <Fab
                onClick={(ev: any) => this.AddItem(this.props.fieldName)}
                onKeyPress={(e: any) => this.onAddkeyPress(e, this.props.fieldName)}
                size="small"
                className={this.props.AddOrder + " ml-3 dk-primary"}
                aria-label="add"
              >
                <Add />
              </Fab>
            </Tooltip>
          </div>
        </div>
        <div className="kt-portlet">
          <div className="kt-portlet__body">
            <Table dir="rtl" className="kt-datatable__table">
              <thead className="kt-datatable__head">
                <TableRow>{this.renderHeader(this.tableHeaders)}</TableRow>
              </thead>
              <TableBody>{this.onRenderRows(this.props.tableName)}</TableBody>
            </Table>
          </div>
        </div>

        <SnackBarMessage
          type={this.state.snackbarType}
          message={this.state.snackbarMessage}
          showMessage={this.state.showSnackbarMessage}
          onHandleCloseMessage={this.handleCloseMessage}
        />
      </div>
    );
  }
  /*********************************************************************** */
  private onSelectAutoComplete = async (event: any, dropdownName: string) => {
    const dropdownId = dropdownName + "ID";
    const dropdownReportPost = dropdownName + "ReportPost";
    await this.setState(prevState => {
      return {
        ...prevState,
        [dropdownName]: event === null ? "" : event.label,
        [dropdownId]: event === null ? 0 : Number(event.value),
        [dropdownReportPost]: event === null ? "" : event.ReportedPost,
      };
    });
  };

  /*********************************add item to table****************************************************** */
  private AddItem = (FieldName: string) => {
    if (FieldName === "SelectedOther") {
      const ValidTableLength = this.TableLengthValidation(this.state.NominationData.other);
      if (ValidTableLength === false) {
        const NewItem: IUser[] = this.state.NominationData.other;
        if (NewItem.length >= 2) {
          this.props.onError(false);
        }
        const index = NewItem.findIndex(x => x.itemId === this.state.SelectedOtherID);
        if (index > -1) {
          this.setState(prevState => {
            return {
              ...prevState,
              snackbarMessage: "نام کاربری قبلا انتخاب شده است",
              showSnackbarMessage: false,
              snackbarType: SnackBarMode.Error,
            };
          });
        } else {
          if (this.state.SelectedOther !== "")
            NewItem.push({
              sPLatinFullName: this.state.SelectedOther,
              itemId: this.state.SelectedOtherID,
              reportedPost: this.state.SelectedOtherReportPost,
            });
          this.props.onAddField(NewItem);
          this.setState(prevState => {
            return {
              ...prevState,
              SelectedOthers: NewItem,
            };
          });
        }
      }
    } else if (FieldName === "SelectedPeer") {
      const ValidTableLength = this.TableLengthValidation(this.state.NominationData.peer);
      if (ValidTableLength === false) {
        const NewItem: IUser[] = this.state.NominationData.peer;
        if (NewItem.length >= 2) {
          this.props.onError(false);
        }
        const index = NewItem.findIndex(x => x.itemId === this.state.SelectedPeerID);
        if (index > -1) {
          this.setState(prevState => {
            return {
              ...prevState,
              snackbarMessage: "نام کاربری قبلا انتخاب شده است",
              showSnackbarMessage: false,
              snackbarType: SnackBarMode.Error,
            };
          });
        } else {
          if (this.state.SelectedPeer !== "")
            NewItem.push({
              sPLatinFullName: this.state.SelectedPeer,
              itemId: this.state.SelectedPeerID,
              reportedPost: this.state.SelectedPeerReportPost,
            });
          this.props.onAddField(NewItem);
          this.setState(prevState => {
            return {
              ...prevState,
              SelectedPeers: NewItem,
            };
          });
        }
      }
    } else {
      const ValidTableLength = this.TableLengthValidation(this.state.NominationData.subordinates);
      if (ValidTableLength === false) {
        const NewItem: IUser[] = this.state.NominationData.subordinates;
        if (NewItem.length >= 2) {
          this.props.onError(false);
        }
        const index = NewItem.findIndex(x => x.itemId === this.state.SelectedSubOrdinateID);
        if (index > -1) {
          this.setState(prevState => {
            return {
              ...prevState,
              snackbarMessage: "نام کاربری قبلا انتخاب شده است",
              showSnackbarMessage: false,
              snackbarType: SnackBarMode.Error,
            };
          });
        } else {
          if (this.state.SelectedSubOrdinate !== "")
            NewItem.push({
              sPLatinFullName: this.state.SelectedSubOrdinate,
              itemId: this.state.SelectedSubOrdinateID,
              reportedPost: this.state.SelectedSubOrdinateReportPost,
            });
          this.props.onAddField(NewItem);
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
  /*********************table length validation**************************************** */
  private TableLengthValidation = (FieldName: any[]) => {
    if (FieldName.length >= 15) {
      this.setState(prevState => {
        return {
          ...prevState,
          snackbarMessage: "تعداد کاربران انتخاب شده باید بین ۳ تا ۱۵ نفر باشد",
          showSnackbarMessage: true,
          // snackbarType: SnackBarMode.Error,
        };
      });
      return true;
    }
    return false;
  };

  private onAddkeyPress(e: any, value: string) {
    if (e.keyCode === 13) {
      this.AddItem(value);
    }
  }

  private keyPress(e: any, value: string) {
    if (e.keyCode === 13) {
      var x = document.getElementsByClassName(value) as HTMLCollectionOf<HTMLElement>;
      x[0].focus();
    }
  }
  /**************************** Repeat Table ****************************** */
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

  private onRenderRows = (TableName: string) => {
    let items: any[] = [];
    switch (TableName) {
      case "Subordinates": {
        items = this.state.NominationData.subordinates;
        break;
      }
      case "Peer": {
        items = this.state.NominationData.peer;
        break;
      }
      case "Other": {
        items = this.state.NominationData.other;
        break;
      }
      default:
        items = this.state.NominationData.subordinates;
    }

    if (items.length === 0) {
      return (
        <TableRow>
          <TableCell align="center" colSpan={3} className="emptyRowLog">
            کسی انتخاب نشده است!
          </TableCell>
        </TableRow>
      );
    } else {
      return items.map((n: any, index: any) => {
        return (
          <TableRow key={index}>
            <TableCell style={{ width: "1%" }} padding="none" align="center">
              {index + 1}
            </TableCell>
            <TableCell align="center">
              <div style={{ fontWeight: 500, fontSize: "13px" }}>{n.sPLatinFullName}</div>
              <div style={{ fontStyle: "italic", color: "dimgrey" }}>{n.reportedPost}</div>
            </TableCell>
            <TableCell align="center" style={{ width: "3%" }}>
              <Delete
                className="flaticon-pie-chart-1 kt-font-info kt-label-font-color-2"
                onClick={() => this.DeleteItem(n.sPLatinFullName, TableName)}
                cursor="pointer"
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
          prevValues = prevState.NominationData.subordinates || [];
          break;
        }
        case "Peer": {
          prevValues = prevState.NominationData.peer || [];
          break;
        }
        case "Other": {
          prevValues = prevState.NominationData.other || [];
          break;
        }
        default:
          prevValues = prevState.NominationData.subordinates || [];
      }

      const newValue = prevValues.filter(el => el.sPLatinFullName !== currentItem);
      this.props.onChangeDataTableValue(newValue);
      return {
        ...prevState,
        NominationData: {
          ...prevState.NominationData,
          [TableName]: newValue,
        },
      };
    });
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
  /******************async select options******************************************** */
  private async loadOptions(inputValue: string) {
    return await this.ListService.getUserInfo(inputValue);
  }
}

export default AdvanceSelect;
