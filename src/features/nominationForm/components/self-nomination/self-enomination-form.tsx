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
import NominationData from "../../../../entities/nomination";
import IUpdatedData from "../../../../entities/updatedNominationItem";
import MYStepper from "../../../stepper/stepper";
import Spinner from "../../../spinner/spinner";
import Authentication from "../../../authentication/authentication";
import { NominationFormHeader } from "../nomination-form-header/nomination-form-header";
import AdvanceSelect from "../advance-select/advance-select";
import { withStyles } from "@material-ui/styles";
import { Theme, Tooltip, Typography } from "@material-ui/core";
import Info from "@material-ui/icons/Info";
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
      },
    };
  }

  public async componentDidMount() {
    document.title = "Nomination Form";
    const itemId = this.util.getQueryStringValue("itemid");
    await this.loadUsers();
    //  const NominationData: NominationData = await this.ListService.getNominationData(Number(itemId));
    const NominationData: NominationData = this.props.NominationData;

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
                                <Info color="primary" />
                              </HtmlTooltip>
                              مدیر مستقیم
                            </h3>
                            :<h5>{this.state.NominationData.LineManager!.Title} </h5>
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
                                  <Typography color="inherit"> Direct Report</Typography>
                                </React.Fragment>
                              }
                            >
                              <Info color="primary" />
                            </HtmlTooltip>
                            نیروی مستقیم تحت سرپرستی / همکار
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
                              <Info color="primary" />
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
                              <Info color="primary" />
                            </HtmlTooltip>
                            نیروی غیر تحت سرپرستی/ مشتری داخلی
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
                        انصراف
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
  /****************************on form submited*************************************/
  private SubmitForm = async () => {
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
        this.setState(prevState => {
          return {
            ...prevState,
            snackbarMessageSubordinate: "تعداد نیروی مستقیم تحت سرپرستی نباید کمتر از ۳ نفر باشد!",
            showSnackbarMessageSubordinate: true,

            snackbarType: SnackBarMode.Error,
            errorSubordinate: true,
          };
        });
      }
      if (Other <= 2) {
        this.setState(prevState => {
          return {
            ...prevState,
            snackbarMessageOther: "تعداد نیروی غیر تحت سرپرستی/ مشتری داخلی نباید کمتر از ۳ نفر باشد!",
            showSnackbarMessageOther: true,
            snackbarType: SnackBarMode.Error,
            errorOther: true,
          };
        });
      }
      if (Peer <= 2) {
        this.setState(prevState => {
          return {
            ...prevState,
            snackbarMessagePeer: "تعداد همکار همرده نباید کمتر از ۳ نفر باشد!",
            showSnackbarMessagePeer: true,
            snackbarType: SnackBarMode.Error,
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
            showSpinner: true,
          };
        });
        await this.ListService.updateNominationData(UpdateItem).then(() => {
          this.setState(prevState => {
            return {
              ...prevState,
              error: false,
              showSpinner: false,
              snackbarMessage: "با موفقیت ثبت شد!",
              showSnackbarMessage: true,
              snackbarType: SnackBarMode.Success,
            };
          });
          this.onCancelRequest();
        });
      }
    } else {
      this.setState(prevState => {
        return {
          ...prevState,
          snackbarMessage: "فرد تکراری انتخاب شده است!",
          showSnackbarMessage: true,
          snackbarType: SnackBarMode.Error,
        };
      });
    }
  };
  /*******compare if peer or other or subordinate are the same******************* */
  private Compare = (Peer: any[], Other: any[], SubOrdinate: any[], lineManager: any, self: any) => {
    debugger;
    const allData: any[] = Peer.map(x => Number(x.ItemId))
      .concat(Other.map(x => Number(x.ItemId)))
      .concat(SubOrdinate.map(x => Number(x.ItemId)));
    console.log(allData);
    allData.push(lineManager.ItemId);
    allData.push(self.ItemId);
    const disttictAlldata: any[] = allData.filter(this.distict);
    console.log(disttictAlldata);
    if (disttictAlldata.length < allData.length) {
      return "فرد تکراری انتخاب شده است!";
    } else {
      return "";
    }
  };

  /******************dintics all items in tables******************************** */
  private distict = (value: any, index: any, self: any[]) => {
    return self.indexOf(value) == index;
  };

  /********************************************** */
  private onCancelRequest = () => {
    window.location.href = "?page=nominationintro&itemid=" + this.state.itemId + "";
  };
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
