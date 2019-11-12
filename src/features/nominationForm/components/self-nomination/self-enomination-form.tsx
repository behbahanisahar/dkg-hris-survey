import * as React from "react";
import ISurveyProps from "./self-nomination-form-props";
import ISurveyState from "./self-nomination-form-state";
import { MDBCard, MDBCardBody, MDBContainer, MDBCardText } from "mdbreact";
import "./self-enomination-form.css";
import ListServices from "../../../../services/list-services";
import SPLists from "../../../../entities/lists";
import SnackBarMode from "../../../../entities/snackbar-mode";
import SnackBarMessage from "../snakbar-message/snackbar-message";
import Util from "../../../../utilities/utilities";
import INominationData from "../../../../entities/nomination";
import IUpdatedData from "../../../../entities/updatedNominationItem";
import MYStepper from "../../../stepper/stepper";
import Spinner from "../../../spinner/spinner";
import Authentication from "../../../authentication/authentication";
import { NominationFormHeader } from "../nomination-form-header/nomination-form-header";
import AdvanceSelect from "../../../../core/components/advance-select/advance-select";
import { withStyles } from "@material-ui/styles";
import { Theme, Tooltip, Typography } from "@material-ui/core";
import Explicit from "@material-ui/icons/Explicit";
import { toast, ToastOptions } from "react-toastify";
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

export default class SelfNomination extends React.Component<ISurveyProps, ISurveyState> {
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
      activeStep: 0,
      showSpinner: true,
      submittingForm: false,
      NominationData: {
        HasCoworker: false,
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
      },
    };
  }

  public async componentDidMount() {
    document.title = "Nomination Form";
    const itemId = this.util.getQueryStringValue("itemid");
    await this.loadUsers();
    const NominationData: INominationData = this.props.NominationData;

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
    console.log(this.state);
    return (
      <div className="rtl">
        {this.state.showSpinner && <Spinner />}
        {!this.state.showSpinner && (
          <div>
            {this.state.NominationData.statusCode !== 200 && (
              <Authentication status={this.state.NominationData.statusCode || 401} />
            )}
            {this.state.NominationData.statusCode === 200 && (
              <div className="col-sm rtl">
                <NominationFormHeader user={this.state.NominationData.User}></NominationFormHeader>
                <MDBCard className="w-auto">
                  <div>
                    <MYStepper activeStep={this.state.activeStep} />
                  </div>

                  <MDBCardBody>
                    <MDBCardText>
                      <MDBContainer>
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
                                <Explicit className="mr-3 " color="primary" />
                              </HtmlTooltip>
                              مدیر مستقیم
                            </h3>
                            :
                            <h5>
                              {this.state.NominationData.LineManager != null
                                ? this.state.NominationData.LineManager.Title
                                : "-"}
                            </h5>
                          </div>
                        </div>
                        <div className="kt-separator kt-separator--border-dashed kt-separator--space-lg dk-brand-grey"></div>
                        <div className="kt-section kt-section--first">
                          <h3
                            className={
                              this.state.errorSubordinate === true
                                ? "pt-5 kt-section__title error"
                                : "pt-5 kt-section__title"
                            }
                          >
                            <HtmlTooltip
                              title={
                                <React.Fragment>
                                  <Typography color="inherit">
                                    {this.state.NominationData.HasCoworker === true ? "Colleague" : " Direct Report"}
                                  </Typography>
                                </React.Fragment>
                              }
                            >
                              <Explicit className="mr-3" color="primary" />
                            </HtmlTooltip>
                            {this.state.NominationData.HasCoworker === true ? "همکار" : " نیروی مستقیم تحت سرپرستی"}
                          </h3>
                          <div className="col-lg-3" />
                          <div className="col-lg-9">
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
                          </div>

                          <div className="kt-separator kt-separator--border-dashed kt-separator--space-lg dk-brand-grey"></div>

                          <h3
                            className={
                              this.state.errorPeer === true ? "pt-5 kt-section__title error" : "pt-5 kt-section__title"
                            }
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
                          <div className="col-lg-3" />
                          <div className="col-lg-9">
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
                          </div>

                          <div className="kt-separator kt-separator--border-dashed kt-separator--space-lg dk-brand-grey"></div>
                          <h3
                            className={
                              this.state.errorOther === true ? "pt-5 kt-section__title error" : "pt-5 kt-section__title"
                            }
                          >
                            <HtmlTooltip
                              title={
                                <React.Fragment>
                                  <Typography color="inherit"> Indirect Report / Internal Customer</Typography>
                                </React.Fragment>
                              }
                            >
                              <Explicit className="mr-3" color="primary" />
                            </HtmlTooltip>
                            نیروی غیرمستقیم تحت سرپرستی / مشتری داخلی
                          </h3>
                          <div className="col-lg-3" />
                          <div className="col-lg-9">
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
                          </div>
                        </div>
                      </MDBContainer>
                    </MDBCardText>

                    <div className="col-lg-12">
                      <button
                        onKeyPress={e => {
                          if (e.key === "Enter") e.preventDefault();
                        }}
                        className={
                          this.state.submittingForm
                            ? "btn btn-brand mr-2 kt-spinner kt-spinner--right kt-spinner--md kt-spinner--light"
                            : "btn btn-brand btn-elevate btn-elevate-air mr-2"
                        }
                        disabled={this.state.submittingForm}
                        onClick={e => {
                          this.SubmitForm();
                          e.preventDefault();
                          return false;
                        }}
                      >
                        تایید | Submit
                      </button>
                      <button
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
                        className="btn btn-secondary "
                      >
                        انصراف | Cancel
                      </button>
                    </div>
                  </MDBCardBody>
                </MDBCard>
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
  private SubmitForm = async () => {
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
        await this.ListService.updateNominationData(UpdateItem).then(() => {
          this.setState(prevState => {
            return {
              ...prevState,
              error: false,
              submittingForm: false,
            };
          });
          toast.success("فرم با موفقیت ثبت شد", this.toastSubmitoptions);
        });
      }
    } else {
      this.notifyError("Duplicate", dataComparison);
    }
  };

  /*******compare if peer or other or subordinate are the same******************* */
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

  /*************************************************************************** */
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
  /******************************************************** */
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
  /*************************************** */
}
