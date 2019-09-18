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
  MDBRow,
  MDBContainer,
} from "mdbreact";
import "./../Survey/Survey.css";
import ListServices from "../../../../services/list-services";
import SPLists from "./../../../../entities/lists";
import ReactSelect from "react-select";
import Add from "@material-ui/icons/Add";
import Delete from "@material-ui/icons/Delete";
import { Table, TableHead, TableRow, TableBody, TableCell, Fab, Card } from "@material-ui/core";
import ITableHeader from "../../../../entities/table-headers";
import SnackBarMode from "../../../../entities/snackbar-mode";
import SnackBarMessage from "../snakbar-message/snackbar-message";

export default class Survey extends React.Component<ISurveyProps, ISurveyState> {
  private ListService: ListServices;
  private tableHeaders: ITableHeader[];
  public constructor(props: ISurveyProps) {
    super(props);
    this.ListService = new ListServices();
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
    };
  }

  public async componentDidMount() {
    const UserInfo = await this.ListService.getUserInfo(SPLists.UserInfo);

    this.setState(prevState => {
      return {
        ...prevState,
        UserInfo,
      };
    });
    console.log(this.state.UserInfo);
  }

  public render() {
    const option = [
      {
        label: "test1",
        value: 1,
        icon: <Add />,
      },
      {
        label: "test2",
        value: 2,
        icon: <Add />,
      },
      {
        label: "test3",
        value: 3,
        icon: <Add />,
      },
    ];
    const SelectedUsers = this.state.SelectedUsers;
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
              <MDBCardTitle>Sahar Behbahani</MDBCardTitle>
              <MDBCardText>
                <MDBContainer>
                  <MDBRow>
                    <label htmlFor="formGroupExampleInput">Default input</label>
                  </MDBRow>
                  <MDBRow>
                    <label htmlFor="formGroupExampleInput">Default input</label>
                  </MDBRow>
                  <MDBRow>
                    <ReactSelect
                      className="basic-single"
                      classNamePrefix="select"
                      isDisabled={false}
                      isLoading={false}
                      isClearable={true}
                      isRtl={false}
                      isSearchable={true}
                      name="SelectedUser"
                      onChange={(ev: any) => this.onSelectAutoComplete(ev, "SelectedUser")}
                      options={option}
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
  /**************************sorting functions*********************************************** */
  private desc(a: any, b: any, orderBy: any) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

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
}
