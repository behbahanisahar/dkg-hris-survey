import * as React from "react";
import { DKSpinner } from "../../core/components/spinner/spinner";
import DashboardInfo from "../../entities/aggregate-report/dashboard-info";
import AggregateServices from "../../services/aggregate-service/aggregate-dashboard-service";
import Authentication from "../authentication/authentication";
import MainAggregateDashboard from "./aggregate-dashboard/main-aggregate-dashboard";
import IndividualDashboard from "./indivisual-dashboard/individual-dashboard/individual-dashboard";

interface IProps {
  match: any;
}
interface IState {
  isFetching: boolean;
  dashboardInfo: DashboardInfo;
}

export default class Dashboard extends React.Component<IProps, IState> {
  private AggregateServices: AggregateServices;
  public constructor(props: any) {
    super(props);
    this.AggregateServices = new AggregateServices();
    this.state = {
      isFetching: true,
      dashboardInfo: {
        departments: [],
        hasAccessTo: [],
        subDepartments: [],
        levels: [],
        user: {},
        nominationId: 0,
        statusCode: 200,
      },
    };
  }

  public async componentDidMount() {
    //document.getElementsByClassName("kt-container")[0].className = "dashboardContainer";
    document.title = "Digikala - 360 Degree Dashboard";

    await this.getInfoData();
  }

  public async getInfoData() {
    let username = this.props.match != undefined ? this.props.match.params.username : "";
    if (username == null) username = "";

    await this.AggregateServices.getInfo(username).then(response => {
      this.setState(prevState => {
        return {
          ...prevState,
          isFetching: false,
          dashboardInfo: response,
        };
      });
    });
  }

  public render() {
    return (
      <div className="ltr">
        {this.state.isFetching === true && <DKSpinner></DKSpinner>}
        {this.state.isFetching === false && (
          <>
            {this.state.dashboardInfo.statusCode === 403 && (
              <Authentication status={this.state.dashboardInfo.statusCode || 403} />
            )}
            {this.state.dashboardInfo.statusCode !== 403 && (
              <>
                {(this.state.dashboardInfo.hasAccessTo.length > 1 ||
                  (this.state.dashboardInfo.nominationId === undefined &&
                    this.state.dashboardInfo.hasAccessTo.length === 1)) && (
                  <MainAggregateDashboard
                    username={this.props.match?.params?.username}
                    dashboardInfo={this.state.dashboardInfo}
                  />
                )}
                {this.state.dashboardInfo.hasAccessTo.length <= 1 &&
                  this.state.dashboardInfo.nominationId !== undefined && (
                    <IndividualDashboard itemId={this.state.dashboardInfo.nominationId} />
                  )}
              </>
            )}
          </>
        )}
      </div>
    );
  }
}
