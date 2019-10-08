import * as React from "react";
import ISurveyProps from "./nomination-form-props";
import ISurveyState from "./nomination-form-state";
import "./nomination-form.css";
import ListServices from "../../../../services/list-services";

import SnackBarMode from "../../../../entities/snackbar-mode";
import SnackBarMessage from "../snakbar-message/snackbar-message";
import Util from "../../../../utilities/utilities";
import NominationData from "../../../../entities/nomination";
import IUpdatedData from "../../../../entities/updatedNominationItem";
import MYStepper from "../../../stepper/stepper";
import IHistory from "../../../../entities/history";
import Spinner from "../../../spinner/spinner";
import Authentication from "../../../authentication/authentication";
import { NominationFormHeader } from "../nomination-form-header/nomination-form-header";
import HistoryTable from "../nomination-history-table/history-table";
import AdvanceSelect from "../advance-select/advance-select";

export default class Nomination extends React.Component<ISurveyProps, ISurveyState> {
  private ListService: ListServices;

  private util: Util;
  public constructor(props: ISurveyProps) {
    super(props);
    this.ListService = new ListServices();
    this.util = new Util();
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

  public render() {
    return (
      <div className="rtl">
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

                      <div className="kt-section kt-section--first">
                        <h3 className="pt-3 kt-section__title">
                          نیروی مستقیم تحت سرپرستی
                          <span
                            className="history-link pull-left"
                            onClick={(ev: any) => this.HideHistory("Subordinate")}
                          >
                            (نمایش سابقه تغییرات)
                          </span>
                        </h3>

                        <div className="kt-section__body">
                          <div className="row">
                            <div className="col-lg-6">
                              <AdvanceSelect
                                NominationData={this.state.NominationData}
                                fieldName="SelectedSubOrdinate"
                                UserInfo={this.state.UserInfo}
                                tableName="Subordinates"
                                AddOrder="firstAdd"
                                onChangeDataTableValue={this.ChangeValueSubordinate}
                                onAddField={this.addValueSubordinate}
                              />
                            </div>
                            <div className="col-lg-6">
                              {this.state.HideSubordinateHistory === false && (
                                <HistoryTable
                                  NominationHistory={this.state.NominationHistory}
                                  tableName="Subordinate"
                                />
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="kt-separator kt-separator--border-dashed kt-separator--space-lg"></div>

                        <h3 className="pt-5 kt-section__title" style={{ margin: "0 5rem 2rem 0" }}>
                          همکار همرده( <a onClick={(ev: any) => this.HideHistory("Peer")}>نمایش سوابق</a>)
                        </h3>
                        <div className="kt-section__body">
                          <div className="row">
                            <div className="col-lg-6">
                              <AdvanceSelect
                                NominationData={this.state.NominationData}
                                fieldName="SelectedPeer"
                                UserInfo={this.state.UserInfo}
                                tableName="Peer"
                                AddOrder="secondAdd"
                                onChangeDataTableValue={this.ChangeValuePeer}
                                onAddField={this.addValuePeer}
                              />
                            </div>
                            <div className="col-lg-6">
                              {this.state.HidePeerHistory === false && (
                                <HistoryTable NominationHistory={this.state.NominationHistory} tableName="Peer" />
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="kt-separator kt-separator--border-dashed kt-separator--space-lg"></div>

                        <h3 className="pt-5 kt-section__title" style={{ margin: "0 5rem 2rem 0" }}>
                          سایرین( <a onClick={(ev: any) => this.HideHistory("Other")}>نمایش سوابق</a>)
                        </h3>
                        <div className="kt-section__body">
                          <div className="row">
                            <div className="col-lg-6">
                              <AdvanceSelect
                                NominationData={this.state.NominationData}
                                fieldName="SelectedOther"
                                UserInfo={this.state.UserInfo}
                                tableName="Other"
                                AddOrder="thirdAdd"
                                onChangeDataTableValue={this.ChangeValueOther}
                                onAddField={this.addValueOther}
                              />
                            </div>
                            <div className="col-lg-6">
                              {this.state.HideOtherHistory === false && (
                                <HistoryTable NominationHistory={this.state.NominationHistory} tableName="Other" />
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="kt-portlet__foot">
                      <div className="kt-form__actions">
                        <button
                          onKeyPress={e => {
                            if (e.key === "Enter") e.preventDefault();
                          }}
                          className="btn btn-primary mr-2"
                          onClick={e => {
                            this.SubmitForm();
                            e.preventDefault();
                            return false;
                          }}
                        >
                          تایید
                        </button>
                        <button
                          className="btn btn-secondary ml-2"
                          onKeyPress={e => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                            }
                          }}
                          onClick={e => {
                            this.onCancelRequest();
                            e.preventDefault();
                            return false;
                          }}
                        >
                          انصراف
                        </button>
                      </div>
                    </div>
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

  /****************************on form submited*************************************/
  private SubmitForm = () => {
    let dataComparison: string = this.Compare(
      this.state.NominationData.Peer,
      this.state.NominationData.Other,
      this.state.NominationData.Subordinates,
    );
    console.log(dataComparison);
    if (dataComparison === "") {
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
          Peer: this.state.NominationData.Peer.map(x => x.ItemId.toString()),
          Other: this.state.NominationData.Other.map(x => x.ItemId.toString()),
          Subordinate: this.state.NominationData.Subordinates.map(x => x.ItemId.toString()),
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
    const allData: any[] = Peer.map(x => Number(x.ItemId))
      .concat(Other.map(x => Number(x.ItemId)))
      .concat(SubOrdinate.map(x => Number(x.ItemId)));
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

  /*******************props from advance select for deleting data******************************************************** */
  private ChangeValueSubordinate = (st: any) => {
    this.setState(prevState => {
      return {
        ...prevState,
        NominationData: {
          ...prevState.NominationData,
          Subordinates: st,
        },
      };
    });
  };
  private ChangeValuePeer = (st: any) => {
    this.setState(prevState => {
      return {
        ...prevState,
        NominationData: {
          ...prevState.NominationData,
          Peer: st,
        },
      };
    });
  };
  private ChangeValueOther = (st: any) => {
    this.setState(prevState => {
      return {
        ...prevState,
        NominationData: {
          ...prevState.NominationData,
          Other: st,
        },
      };
    });
  };
  /***********props from advance select for add data to table********************************************* */
  private addValueSubordinate = (st: any) => {
    this.setState(prevState => {
      return {
        ...prevState,
        SelectedSubOrdinates: st,
      };
    });
  };
  private addValueOther = (st: any) => {
    this.setState(prevState => {
      return {
        ...prevState,
        SelectedOthers: st,
      };
    });
  };
  private addValuePeer = (st: any) => {
    this.setState(prevState => {
      return {
        ...prevState,
        SelectedPeers: st,
      };
    });
  };
  /********************************************** */
  private onCancelRequest = () => {
    window.location.href = "?page=nominationintro&itemid=" + this.state.itemId + "";
  };
}
