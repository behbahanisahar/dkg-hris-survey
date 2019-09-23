import * as React from "react";
import ISurveyProps from "./self-survey-props";
import ISurveyState from "./self-survey-state";
import { MDBCard, MDBCol, MDBCardBody, MDBBtn, MDBRow, MDBContainer, MDBCardText } from "mdbreact";
import "./self-survey.css";
import ListServices from "../../../../services/list-services";
import SPLists from "../../../../entities/lists";
import ReactSelect from "react-select";
import Add from "@material-ui/icons/Add";
import {
  Fab,
  Card,
  Tooltip,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from "@material-ui/core";

import SnackBarMode from "../../../../entities/snackbar-mode";
import SnackBarMessage from "../snakbar-message/snackbar-message";
import Util from "../../../../utilities/utilities";
import NominationData from "../../../../entities/nomination";
import IUser from "../../../../entities/user";
import IUpdatedData from "../../../../entities/updatedNominationItem";
import MYStepper from "../stepper/stepper";
import ReapitingTable from "../reapiting-table/reapiting-table";
import ITableHeader from "../../../../entities/table-headers";
import Delete from "@material-ui/icons/Delete";
import Spinner from "../../../../spinner/spinner";
export default class SelfServuy extends React.Component<ISurveyProps, ISurveyState> {
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
      SelectedSubOrdinate:"",
      SelectedSubOrdinateID:0,
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
        Others:[],
        Peers:[],
        User: {
          AvatarUrl: "",
          Id: 0,
          ItemId: 894,
          SPLatinFullName: "",
        },
        LineManager: {
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
   // const Subordinates = this.state.NominationData.Subordinates;
    return (
      
      <div>
        <Spinner/>
        <MDBCol>
          <div className="card-header mt-2">
            <div className="content">
              <p className="user">
                <strong>{this.state.NominationData.User!.SPLatinFullName}</strong>{" "}
              </p>
              <div className="page-header">Nomination Form</div>
            </div>
          </div>
          <MDBCard className="w-auto">
           
            <div>
              <MYStepper activeStep={this.state.activeStep}/>
            </div>

            <MDBCardBody>
              <MDBCardText>
                <MDBContainer>
                  <h3 className="pt-3 category">Subordinates</h3>
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
                      onChange={(ev: any) => this.onSelectAutoComplete(ev, "SelectedSubOrdinate")}
                      options={this.state.UserInfo}
                      // loadOptions={this.promiseOptions}
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
                  <Table className="table" >
                    <TableHead>
                        <TableRow>
                            {this.renderHeader(this.tableHeaders)}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.onRenderRows()}
                    </TableBody>
                </Table>

                  </Card>
                  
                  </MDBRow>
                
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
                    
                      <ReapitingTable tableName="SelectedPeer" Items={SelectedPeers}/>
                    </Card>
                  </MDBRow>

                  <h3 className="pt-3 category">Other</h3>

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
                      <ReapitingTable tableName="SelectedOther" Items={SelectedOthers}/>
                    </Card>
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
      const NewItem: IUser[] = this.state.SelectedOthers;
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
    else if(FieldName === "SelectedPeer"){
      const NewItem: IUser[] = this.state.SelectedPeers;
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
    else{
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
            <TableCell
            className="LogPadding" 
                key={row.id}
                align="center"
                padding='none'
                sortDirection='desc'
            >
                {row.label}
            </TableCell>
        ),
        this,
    );
}

private onRenderRows = () => {

      return   this.state.NominationData.Subordinates.map((n: any, index: any) => {
        return (
          <TableRow key={index}>
            <TableCell style={{width:'1%'}} align="center">{index + 1}</TableCell>
            <TableCell align="center">{n.SPLatinFullName}</TableCell>
            <TableCell
              align="center"
              onClick={() => this.DeleteItem(n.SPLatinFullName)}
              style={{width:'3%'}}
            >
              <Delete  />
            </TableCell>
          </TableRow>
        );
      })

}
  /******************************delete item from table***************************************************** */
  private DeleteItem = (currentItem: string) => {
      this.setState(prevState => {
     // const prevValues=items;
     const prevValues = prevState.NominationData.Subordinates || [];
        const newValue = prevValues.filter(el => el.SPLatinFullName !== currentItem);
        return {
          ...prevState,
          NominationData:{
            ...prevState.NominationData,
            Subordinates:newValue
          },
        };
      });
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