import { Grid, MenuItem, Select } from "@material-ui/core";
import * as React from "react";
import ReportIcon from "../../assets/img/research.png";
import { DKPortletSummary } from "../../core/components/portlet/summary-portlet";
import { DKSpinner } from "../../core/components/spinner/spinner";
import DKSVGIcon from "../../core/components/svg-icon/svg-icon";
import DashboardInfo from "../../entities/aggregate-report/dashboard-info";
import AggregateServices from "../../services/aggregate-service/aggregate-dashboard-service";
import DropDownModel from "./../../entities/dropdown";
import "./aggregate-dashboard.css";
import { AggregateReportProps } from "./aggregate-report-props";
import ClevelParticipation from "./clevel-participation/clevel-participation";
import MainQuestionComparison from "./comparing-questions/main-questions-comparison";
import CompetencyAvgComparison from "./competencies-average/competencies-avg-comparison";
import CompetencyCompetency from "./competencies-comparison/competencies-comparison";
import CompetencyAvgRate from "./competency-avg-rate/competency-avg-rate";
import HeatMap from "./heatmap/heatmap";
import MainSummary from "./main-summary/main-summary";
import TotalLeaders from "./number-of-leaders/num-of-leaders";
import RadarCoreValue from "./radar-corevalue/radar-coreValue";
interface IProps {
  match: any;
}
interface IState {
  selectedReportProps: AggregateReportProps;
  reportProps: AggregateReportProps;
  isFetching: boolean;
  reportType: number;
  departmentText: string;
  subDepText: string;
  levelText: string;
  dashboardInfo: DashboardInfo;
  departmentTypes: DropDownModel[];
  subDepTypes: DropDownModel[];
  levelTypes: DropDownModel[];
  intialSubDept: DropDownModel[];
}
let subDeps: DropDownModel[] = [];

export default class MainAggregateDashboard extends React.Component<IProps, IState> {
  private AggregateServices: AggregateServices;
  public constructor(props: any) {
    super(props);
    this.AggregateServices = new AggregateServices();
    this.state = {
      selectedReportProps: {
        level: "",
        viewAs: "",
        depLevel: "",
        subDepLevel: "",
      },
      reportProps: {
        level: "",
        viewAs: "",
        depLevel: "",
        subDepLevel: "",
      },
      isFetching: true,
      reportType: 1,
      departmentTypes: [],
      subDepTypes: [],
      levelTypes: [],
      intialSubDept: [
        {
          key: "All",
          text: "All",
        },
      ],
      departmentText: "All",
      subDepText: "All",
      levelText: "All",
      dashboardInfo: {
        departments: [],
        subDepartments: [],
        levels: [],
        user: {},
        nominationId: 0,
      },
    };
  }

  public async componentDidMount() {
    document.getElementsByClassName("kt-container")[0].className = "dashboardContainer";
    document.title = "Digikala - 360 Degree Dashboard";

    await this.getInfoData();
  }

  public async getInfoData() {
    let username = this.props.match != undefined ? this.props.match.params.username : "";
    if (username == null) username = "";
    const AllLevel = [
      {
        key: "All",
        text: "All",
      },
    ];
    await this.AggregateServices.getInfo(username).then(response => {
      this.setState(prevState => {
        return {
          ...prevState,
          isFetching: false,
          dashboardInfo: response,
          reportProps: {
            level: response.levels.length === 0 ? "All" : response.levels[0]?.text,
            depLevel: response.departments[0]?.text,
            subDepLevel: response.subDepartments.length === 0 ? "All" : response.subDepartments[0]?.text,
            viewAs: username,
          },
          selectedReportProps: {
            level: response.levels.length === 0 ? "All" : response.levels[0]?.text,
            depLevel: response.departments[0]?.text,
            subDepLevel: response.subDepartments.length === 0 ? "All" : response.subDepartments[0]?.text,
            viewAs: username,
          },
          departmentTypes: response.departments,
          subDepTypes: response.subDepartments,
          levelTypes: response.levels.length === 0 ? AllLevel : response.levels,
          departmentText: response.departments[0]?.text,
          subDepText: response.subDepartments[0]?.text,
          levelText: response.levels[0]?.text,
        };
      });
    });
    subDeps = this.state.subDepTypes;
    this.setFilter("depLevel", this.state.departmentText);
  }

  public render() {
    return (
      <div className="ltr">
        {this.state.isFetching === true && <DKSpinner></DKSpinner>}
        {this.state.isFetching === false && (
          <>
            <div className="alert alert-elevate alert-light">
              <div className="alert-icon p-0 pl-2">
                <DKSVGIcon iconName="Info-circle" color="red" width="24px" height="24px"></DKSVGIcon>
              </div>
              <div className="alert-text">
                This report is <b className="dk-brand-text-red">confidential</b> and it is only shared with the assessee
                and his/her managers with the intention of supporting the individual on performing the development
                programs.
              </div>
            </div>
            <Grid container spacing={3} className="mt-4">
              <Grid item xs={4} sm={4}>
                <DKPortletSummary background="#F05B71" title=" 360̊  Feedback Aggregate Report">
                  <div style={{ color: "black" }} className="kt-widget17__items">
                    <div className="kt-widget17__item">
                      <Grid container>
                        <Grid item xs={3} sm={3}>
                          <div className=".kt-widget.kt-widget--user-profile-3 .kt-widget__top .kt-widget__media">
                            {this.state.dashboardInfo.user?.avatarUrl !== undefined && (
                              <img
                                style={{ width: "60px", borderRadius: "8px", float: "left" }}
                                src={this.state.dashboardInfo.user?.avatarUrl}
                              />
                            )}
                            {this.state.dashboardInfo.user?.avatarUrl === undefined && (
                              <span className="dashboard-img">
                                {this.state.dashboardInfo.user?.avatarTextPlaceholder}
                              </span>
                            )}
                          </div>
                        </Grid>
                        <Grid item xs={9} sm={9}>
                          <div className="kt-widget__content">
                            <div className="head">
                              <p className="kt-widget__username">{this.state.dashboardInfo.user?.spLatinFullName}</p>
                            </div>
                            {this.state.dashboardInfo.nominationId !== undefined && (
                              <div>
                                <img src={ReportIcon} className="mr-2" width="20" height="20" />
                                <a
                                  href={"#/dashboard/" + this.state.dashboardInfo.nominationId}
                                  target="_blank"
                                  className="viewReport"
                                >
                                  My Report
                                </a>
                              </div>
                            )}
                          </div>
                        </Grid>
                      </Grid>
                    </div>
                  </div>

                  <div style={{ color: "black", textAlign: "center" }} className="kt-widget17__items">
                    <div className="kt-widget17__item">
                      <div>
                        <Grid container>
                          <Grid item xs={3} sm={3}>
                            <span className="kt-widget17__desc mt-2">Department</span>
                          </Grid>
                          <Grid item xs={8} sm={8}>
                            <Select
                              margin="dense"
                              className="mb-2"
                              dir="ltr"
                              value={this.state.reportProps.depLevel}
                              fullWidth={true}
                              onChange={event => this.onChangeFields("depLevel", event)}
                              inputProps={{
                                name: "Department",
                                id: "demo-controlled-open-select",
                              }}
                              variant="outlined"
                            >
                              {this.renderDropDown(this.state.departmentTypes)}
                            </Select>
                          </Grid>
                        </Grid>
                        <Grid container>
                          <Grid item xs={3} sm={3}>
                            <span className="kt-widget17__desc mt-2">Sub Dept</span>
                          </Grid>
                          <Grid item xs={8} sm={8}>
                            <Select
                              margin="dense"
                              className="mb-2"
                              dir="ltr"
                              value={this.state.reportProps.subDepLevel}
                              fullWidth={true}
                              onChange={event => this.onChangeFields("subDepLevel", event)}
                              inputProps={{
                                name: "SubDepartment",
                                id: "demo-controlled-open-select",
                              }}
                              variant="outlined"
                            >
                              {this.renderDropDown(this.state.subDepTypes)}
                            </Select>
                          </Grid>
                        </Grid>

                        <Grid container>
                          <Grid item xs={3} sm={3}>
                            <span className="kt-widget17__desc mt-2">Level</span>
                          </Grid>
                          <Grid item xs={8} sm={8}>
                            <Select
                              margin="dense"
                              dir="ltr"
                              className="mb-2"
                              value={this.state.reportProps.level}
                              fullWidth={true}
                              onChange={event => this.onChangeFields("level", event)}
                              inputProps={{
                                name: "Level",
                                id: "demo-controlled-open-select",
                              }}
                              variant="outlined"
                            >
                              {this.renderDropDown(this.state.levelTypes)}
                            </Select>
                          </Grid>
                        </Grid>
                        <button
                          type="button"
                          className="btn btn-outline-secondary btn-sm mt-2"
                          onClick={event => this.onApplyFilters()}
                        >
                          <DKSVGIcon iconName="Search" width="20px" height="20px" color="red" />
                          <span className="dk-brand-text-red  mr-3">Apply Filters</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </DKPortletSummary>
              </Grid>
              <Grid item xs={8} sm={8}>
                <MainSummary
                  viewAs={this.state.reportProps.viewAs}
                  level={this.state.selectedReportProps.level}
                  subDepLevel={this.state.selectedReportProps.subDepLevel}
                  depLevel={this.state.selectedReportProps.depLevel}
                />
              </Grid>
            </Grid>
            {this.state.selectedReportProps.level === "All" && this.state.selectedReportProps.depLevel === "All" && (
              <Grid container spacing={3} className="mt-4">
                <Grid item xs={6} sm={3}>
                  <ClevelParticipation
                    viewAs={this.state.reportProps.viewAs}
                    level={this.state.selectedReportProps.level}
                    subDepLevel={this.state.selectedReportProps.subDepLevel}
                    depLevel={this.state.selectedReportProps.depLevel}
                  />
                </Grid>
                <Grid item xs={9} sm={5}>
                  <CompetencyAvgComparison
                    viewAs={this.state.reportProps.viewAs}
                    level={this.state.selectedReportProps.level}
                    subDepLevel={this.state.selectedReportProps.subDepLevel}
                    depLevel={this.state.selectedReportProps.depLevel}
                  />
                </Grid>
                <Grid item xs={6} sm={4}>
                  <CompetencyAvgRate
                    viewAs={this.state.reportProps.viewAs}
                    level={this.state.selectedReportProps.level}
                    subDepLevel={this.state.selectedReportProps.subDepLevel}
                    depLevel={this.state.selectedReportProps.depLevel}
                  />
                </Grid>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={12}>
                    <TotalLeaders
                      viewAs={this.state.reportProps.viewAs}
                      level={this.state.selectedReportProps.level}
                      subDepLevel={this.state.selectedReportProps.subDepLevel}
                      depLevel={this.state.selectedReportProps.depLevel}
                    />
                  </Grid>
                </Grid>
              </Grid>
            )}
            <Grid container spacing={3} className="mt-4">
              <Grid item xs={6} sm={8}>
                <CompetencyCompetency
                  viewAs={this.state.reportProps.viewAs}
                  level={this.state.selectedReportProps.level}
                  subDepLevel={this.state.selectedReportProps.subDepLevel}
                  depLevel={this.state.selectedReportProps.depLevel}
                />
              </Grid>
              <Grid item xs={6} sm={4}>
                <RadarCoreValue
                  viewAs={this.state.reportProps.viewAs}
                  level={this.state.selectedReportProps.level}
                  subDepLevel={this.state.selectedReportProps.subDepLevel}
                  depLevel={this.state.selectedReportProps.depLevel}
                />
              </Grid>
            </Grid>

            <MainQuestionComparison
              viewAs={this.state.reportProps.viewAs}
              level={this.state.selectedReportProps.level}
              subDepLevel={this.state.selectedReportProps.subDepLevel}
              depLevel={this.state.selectedReportProps.depLevel}
            />

            <Grid container spacing={3} className="mt-4">
              <HeatMap
                viewAs={this.state.reportProps.viewAs}
                level={this.state.selectedReportProps.level}
                subDepLevel={this.state.selectedReportProps.subDepLevel}
                depLevel={this.state.selectedReportProps.depLevel}
              />
            </Grid>
          </>
        )}
      </div>
    );
  }

  private onChangeFields = (feildName: string, event: any): void => {
    this.setFilter(feildName, event.nativeEvent.target.outerText);
  };

  private onApplyFilters = () => {
    const selectedReportProps: AggregateReportProps = {
      level: this.state.reportProps.level,
      subDepLevel: this.state.reportProps.subDepLevel,
      depLevel: this.state.reportProps.depLevel,
      viewAs: this.state.reportProps.viewAs,
    };
    this.setState(current => ({
      ...current,
      selectedReportProps,
    }));
  };

  public renderDropDown = (items: any[]): JSX.Element[] => {
    return items.map(item => {
      return (
        <MenuItem value={item.key} key={item.key}>
          {item.text}
        </MenuItem>
      );
    });
  };

  private setFilter(feildName: string, selectedDepartment: string) {
    let subDepTypes: DropDownModel[] = subDeps;
    if (feildName == "depLevel") {
      if (selectedDepartment === "All" || this.state.subDepTypes.length === 0) {
        subDepTypes = [
          {
            key: "All",
            text: "All",
          },
        ];
      } else {
        subDepTypes = subDepTypes.filter(el => el.parent === selectedDepartment || el.parent === "All");
      }
      this.setState(prevState => {
        return {
          ...prevState,
          reportProps: {
            ...prevState.reportProps,
            // subDepLevel: "All", //subDepTypes[0]?.text,
            [feildName]: selectedDepartment,
          },
          subDepTypes,
        };
      });
    } else {
      this.setState(prevState => {
        return {
          ...prevState,
          reportProps: {
            ...prevState.reportProps,
            [feildName]: selectedDepartment,
          },
        };
      });
    }
  }
}
