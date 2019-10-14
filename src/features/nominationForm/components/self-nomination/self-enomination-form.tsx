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

export default class SelfNomination extends React.Component<ISurveyProps, ISurveyState> {
  private ListService: ListServices;

  private util: Util;
  public constructor(props: ISurveyProps) {
    super(props);
    this.ListService = new ListServices();
    this.util = new Util();

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
                        <div className="kt-separator kt-separator--border-dashed kt-separator--space-lg"></div>
                        <div className="kt-section kt-section--first">
                          <div style={{ display: "inline-Block" }}>
                            <h3 style={{ display: "inline-table" }} className="pt-3 kt-section__title">
                              مدیر مستقیم
                            </h3>
                            :
                            <h5 style={{ display: "inline-table" }}>{this.state.NominationData.LineManager!.Title} </h5>
                          </div>
                        </div>
                        <div className="kt-separator kt-separator--border-dashed kt-separator--space-lg"></div>
                        <h3 className="pt-5 kt-section__title">نیروی مستقیم تحت سرپرستی</h3>
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
                          />
                        </div>

                        <div className="kt-separator kt-separator--border-dashed kt-separator--space-lg"></div>
                        <h3 className="pt-5 kt-section__title">همکار همرده</h3>
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
                          />
                        </div>
                        <div className="kt-separator kt-separator--border-dashed kt-separator--space-lg"></div>
                        <h3 className="pt-5 kt-section__title">سایرین</h3>
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
                          />
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

  /****************************on form submited*************************************/
  private SubmitForm = async () => {
    let dataComparison: string = this.Compare(
      this.state.NominationData.Peer,
      this.state.NominationData.Other,
      this.state.NominationData.Subordinates,
    );
    if (dataComparison === "") {
      const subordinateLength = this.state.NominationData.Subordinates.length;
      const Other = this.state.NominationData.Other.length;
      const Peer = this.state.NominationData.Peer.length;
      if (subordinateLength <= 2 || Other <= 2 || Peer <= 2) {
        this.setState(prevState => {
          return {
            ...prevState,
            snackbarMessage: "تعداد انتخاب شدگان باید بین ۳ تا ۱۵ نفر باشد!",
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

        await this.ListService.updateNominationData(UpdateItem).then(() => {
          this.setState(prevState => {
            return {
              ...prevState,
              showSpinner: true,
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
  private Compare = (Peer: any[], Other: any[], SubOrdinate: any[]) => {
    const allData: any[] = Peer.map(x => Number(x.ItemId))
      .concat(Other.map(x => Number(x.ItemId)))
      .concat(SubOrdinate.map(x => Number(x.ItemId)));
    console.log(allData);
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
}
