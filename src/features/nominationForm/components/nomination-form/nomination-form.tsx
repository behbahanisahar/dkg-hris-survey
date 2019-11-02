import * as React from "react";
import ISurveyProps from "./nomination-form-props";
import ISurveyState from "./nomination-form-state";
import "./nomination-form.css";
import ListServices from "../../../../services/list-services";
import SnackBarMode from "../../../../entities/snackbar-mode";
import SnackBarMessage from "../snakbar-message/snackbar-message";
import Util from "../../../../utilities/utilities";
import INominationData from "../../../../entities/nomination";
import IUpdatedData from "../../../../entities/updatedNominationItem";
import MYStepper from "../../../stepper/stepper";
import IHistory from "../../../../entities/history";
import Spinner from "../../../spinner/spinner";
import Authentication from "../../../authentication/authentication";
import { NominationFormHeader } from "../nomination-form-header/nomination-form-header";
import HistoryTable from "../nomination-history-table/history-table";
import AdvanceSelect from "../../../../core/components/advance-select/advance-select";
import { withStyles } from "@material-ui/styles";
import { Theme, Tooltip, Typography } from "@material-ui/core";
import Explicit from "@material-ui/icons/Explicit";
import { ToastOptions, toast } from "react-toastify";
const HtmlTooltip = withStyles((theme: Theme) => ({
  tooltip: {
    backgroundColor: "#77787B",
    color: "#fff",
    maxWidth: 260,
    fontSize: "3px  !important",
    border: "1px solid #dadde9",
    textAlign: "left",
  },
}))(Tooltip);
export default class Nomination extends React.Component<ISurveyProps, ISurveyState> {
  private ListService: ListServices;

  private util: Util;
  public constructor(props: ISurveyProps) {
    super(props);
    this.ListService = new ListServices();
    this.util = new Util();
    this.state = {
      errorSubordinate: false,
      errorOther: false,
      errorPeer: false,
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
      showSnackbarMessagePeer: false,
      snackbarMessagePeer: "",
      showSnackbarMessageOther: false,
      snackbarMessageOther: "",
      showSnackbarMessageSubordinate: false,
      snackbarMessageSubordinate: "",
      showSnackbarMessage: false,
      snackbarMessage: "",
      snackbarType: SnackBarMode.Info,
      UsersIsLoading: true,
      itemId: 0,
      submittingForm: false,
      activeStep: 0,
      NominationData: {
        Status: "",
        Subordinates: [],
        Other: [],
        Peer: [],
        User: {
          Title: "",
          AvatarUrl: "",
          Id: 0,
          ItemId: 894,
          SPLatinFullName: "",
          Department: "",
          EmailAddress: "",
          JobGrade: "",
          ReportedPost: "",
        },
        LineManager: {
          Title: "",
          AvatarUrl: "",
          Id: 0,
          ItemId: 894,
          SPLatinFullName: "",
          Department: "",
          EmailAddress: "",
          JobGrade: "",
          ReportedPost: "",
        },
        statusCode: 0,
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
    // const NominationData: NominationData = await this.ListService.getNominationData(Number(itemId));
    const NominationData: INominationData = this.props.NominationData;
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
    console.log(this.state.NominationData);
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
                      <div className="kt-separator kt-separator--border-dashed kt-separator--space-lg "></div>
                      <div className="kt-section kt-section--first">
                        <div style={{ display: "inline-Block" }}>
                          <h3 style={{ display: "inline-table" }} className="pt-3 kt-section__title">
                            <HtmlTooltip
                              title={
                                <React.Fragment>
                                  <Typography color="inherit"> Line Manager</Typography>
                                </React.Fragment>
                              }
                            >
                              <Explicit className="mr-3" color="primary" />
                            </HtmlTooltip>
                            مدیر مستقیم
                          </h3>
                          :<h5>{this.state.NominationData.LineManager!.Title} </h5>
                        </div>
                      </div>
                      <div className="kt-separator kt-separator--border-dashed kt-separator--space-lg border-brand-grey"></div>
                      <div className="kt-section kt-section--first">
                        <div>
                          <h3
                            className={
                              this.state.errorSubordinate === true
                                ? "pt-3 kt-section__title error"
                                : "pt-3 kt-section__title"
                            }
                          >
                            <HtmlTooltip
                              title={
                                <React.Fragment>
                                  <Typography color="inherit"> Direct Report</Typography>
                                </React.Fragment>
                              }
                            >
                              <Explicit className="mr-3" color="primary" />
                            </HtmlTooltip>
                            {this.state.NominationData.HasCoworker === true ? "همکار" : " نیروی مستقیم تحت سرپرستی"}
                          </h3>
                        </div>
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
                                onError={this.ChangeErrorSubordinate}
                              />
                              <button
                                type="button"
                                onClick={(ev: any) => this.HideHistory("Subordinate")}
                                className="btn btn-sm btn-clean pull-left"
                              >
                                نمایش سابقه تغییرات
                              </button>
                            </div>
                            <div className="col-lg-6">
                              {this.state.HideSubordinateHistory === false && (
                                <div className="kt-portlet kt-sc-2">
                                  <div className="kt-portlet__body">
                                    <HistoryTable
                                      NominationHistory={this.state.NominationHistory}
                                      tableName="Subordinate"
                                    />
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="kt-separator kt-separator--border-dashed kt-separator--space-lg border-brand-grey"></div>

                        <h3
                          className={this.state.errorPeer === true ? " kt-section__title error" : " kt-section__title"}
                        >
                          <HtmlTooltip
                            title={
                              <React.Fragment>
                                <Typography color="inherit">Peer</Typography>
                              </React.Fragment>
                            }
                          >
                            <Explicit className="mr-3" color="primary" />
                          </HtmlTooltip>
                          همکار همرده
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
                                onError={this.ChangeErrorPeer}
                              />
                              <button
                                type="button"
                                onClick={(ev: any) => this.HideHistory("Peer")}
                                className="btn btn-sm btn-clean pull-left"
                              >
                                نمایش سابقه تغییرات
                              </button>
                            </div>
                            <div className="col-lg-6">
                              {this.state.HidePeerHistory === false && (
                                <div className="kt-portlet kt-sc-2">
                                  <div className="kt-portlet__body">
                                    <HistoryTable NominationHistory={this.state.NominationHistory} tableName="Peer" />
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="kt-separator kt-separator--border-dashed kt-separator--space-lg border-brand-grey"></div>

                        <h3
                          className={this.state.errorOther === true ? " kt-section__title error" : " kt-section__title"}
                        >
                          <HtmlTooltip
                            title={
                              <React.Fragment>
                                <Typography color="inherit">Indirect Report / Internal Customer</Typography>
                              </React.Fragment>
                            }
                          >
                            <Explicit className="mr-3" color="primary" />
                          </HtmlTooltip>
                          نیروی غیرمستقیم تحت سرپرستی / مشتری داخلی
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
                                onError={this.ChangeErrorOther}
                              />
                              <button
                                type="button"
                                onClick={(ev: any) => this.HideHistory("Other")}
                                className="btn btn-sm btn-clean pull-left"
                              >
                                نمایش سابقه تغییرات
                              </button>
                            </div>
                            <div className="col-lg-6">
                              {this.state.HideOtherHistory === false && (
                                <div className="kt-portlet kt-sc-2">
                                  <div className="kt-portlet__body">
                                    <HistoryTable NominationHistory={this.state.NominationHistory} tableName="Other" />
                                  </div>
                                </div>
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
                          className={
                            this.state.submittingForm
                              ? "btn btn-brand mr-2 kt-spinner kt-spinner--right kt-spinner--md kt-spinner--light"
                              : "btn btn-brand btn-elevate btn-elevate-air mr-2"
                          }
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
        <div className="snackbarContainer">
          <SnackBarMessage
            type={this.state.snackbarType}
            message={this.state.snackbarMessagePeer}
            showMessage={this.state.showSnackbarMessagePeer}
            onHandleCloseMessage={e => {
              this.handleCloseMessagePeer("Peer");
            }}
          />
          <SnackBarMessage
            type={this.state.snackbarType}
            message={this.state.snackbarMessageOther}
            showMessage={this.state.showSnackbarMessageOther}
            onHandleCloseMessage={e => {
              this.handleCloseMessageOther("Other");
            }}
          />
          <SnackBarMessage
            type={this.state.snackbarType}
            message={this.state.snackbarMessageSubordinate}
            showMessage={this.state.showSnackbarMessageSubordinate}
            onHandleCloseMessage={e => {
              this.handleCloseMessageSubordinate("Subordinate");
            }}
          />
          <SnackBarMessage
            type={this.state.snackbarType}
            message={this.state.snackbarMessage}
            showMessage={this.state.showSnackbarMessage}
            onHandleCloseMessage={e => {
              this.handleCloseMessage("");
            }}
          />
        </div>
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
  private handleCloseMessageOther = (Field: string) => {
    if (this.state.snackbarType === SnackBarMode.Success) {
    } else {
      this.setState(prevState => {
        return {
          ...prevState,
          showSnackbarMessageOther: false,
        };
      });
    }
  };
  private handleCloseMessagePeer = (Field: string) => {
    // const stateName = "showSnackbarMessage" + Field;
    if (this.state.snackbarType === SnackBarMode.Success) {
    } else {
      this.setState(prevState => {
        return {
          ...prevState,
          showSnackbarMessagePeer: false,
        };
      });
    }
  };
  private handleCloseMessageSubordinate = (Field: string) => {
    //  const stateName = "showSnackbarMessage" + Field;
    if (this.state.snackbarType === SnackBarMode.Success) {
    } else {
      this.setState(prevState => {
        return {
          ...prevState,
          showSnackbarMessageSubordinate: false,
        };
      });
    }
  };
  private handleCloseMessage = (Field: string) => {
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
  onCancelRequest = () => {
    window.location.href = "?page=nominationintro";
  };
  toastSubmitoptions: ToastOptions = { onClose: this.onCancelRequest, autoClose: 5000, position: "bottom-left" };
  notifyError = (Id: string, message: string) => {
    toast.error(message, { autoClose: false, position: "bottom-left", toastId: Id });
  };
  /****************************on form submited*************************************/
  private SubmitForm = () => {
    toast.dismiss();
    let dataComparison: string = this.Compare(
      this.state.NominationData.Peer,
      this.state.NominationData.Other,
      this.state.NominationData.Subordinates,
      this.state.NominationData.LineManager,
      this.state.NominationData.User,
    );

    if (dataComparison === "") {
      const subordinateLength = this.state.NominationData.Subordinates.length;
      const Other = this.state.NominationData.Other.length;
      const Peer = this.state.NominationData.Peer.length;
      if (subordinateLength <= 2) {
        this.state.NominationData.HasCoworker === true
          ? this.notifyError("errorSubordinate", "تعداد همکار نباید کمتر از ۳ نفر باشد")
          : this.notifyError("errorSubordinate", "تعداد نیروی مستقیم تحت سرپرستی نباید کمتر از ۳ نفر باشد");

        this.setState(prevState => {
          return {
            ...prevState,
            errorSubordinate: true,
          };
        });
      }
      if (Other <= 2) {
        this.notifyError("errorOther", "تعداد نیروی غیر تحت سرپرستی / مشتری داخلی نباید کمتر از ۳ نفر باشد");
        this.setState(prevState => {
          return {
            ...prevState,
            errorOther: true,
          };
        });
      }
      if (Peer <= 2) {
        this.notifyError("errorPeer", "تعداد همکار همرده نباید کمتر از ۳ نفر باشد!");
        this.setState(prevState => {
          return {
            ...prevState,
            errorPeer: true,
          };
        });
      } else if (subordinateLength >= 3 && Other >= 3 && Peer >= 3) {
        const UpdateItem: IUpdatedData = {
          ItemId: this.state.itemId,
          Peer: this.state.NominationData.Peer.map(x => x.ItemId.toString()),
          Other: this.state.NominationData.Other.map(x => x.ItemId.toString()),
          Subordinate: this.state.NominationData.Subordinates.map(x => x.ItemId.toString()),
        };
        this.setState(prevState => {
          return {
            ...prevState,
            submittingForm: true,
          };
        });
        this.ListService.updateNominationData(UpdateItem).then(() => {
          this.setState(prevState => {
            return {
              ...prevState,
              submittingForm: true,
            };
          });
          toast.success("فرم با موفقیت ثبت شد", this.toastSubmitoptions);
        });
      }
    } else {
      this.notifyError("Duplicate", dataComparison);
    }
  };

  private Compare = (Peer: any[], Other: any[], SubOrdinate: any[], lineManager: any, self: any) => {
    const allData: any[] = Peer.concat(Other).concat(SubOrdinate);
    allData.push(lineManager);
    allData.push(self);

    const lookup = allData.reduce((a, e) => {
      a[e.ItemId] = e.ItemId in a ? ++a[e.ItemId] : 0;
      return a;
    }, {});
    const a = allData.filter(e => lookup[e.ItemId]);
    const duplicateData = this.removeDuplicates(a, {});

    const duplicateSPName = duplicateData.map(x => x.SPLatinFullName);
    if (duplicateSPName.length > 0) {
      return "نام کاربری تکراری انتخاب شده است: " + duplicateSPName.join();
    } else {
      return "";
    }
  };

  private removeDuplicates(myArr: any[], prop: any) {
    return myArr.filter((obj, pos, arr) => {
      return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
    });
  }

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
  /************************************************************ */
  private ChangeErrorOther = (st: any) => {
    this.setState(prevState => {
      return {
        ...prevState,
        errorOther: st,
      };
    });
  };
  private ChangeErrorSubordinate = (st: any) => {
    this.setState(prevState => {
      return {
        ...prevState,
        errorSubordinate: st,
      };
    });
  };
  private ChangeErrorPeer = (st: any) => {
    this.setState(prevState => {
      return {
        ...prevState,
        errorPeer: st,
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
}
