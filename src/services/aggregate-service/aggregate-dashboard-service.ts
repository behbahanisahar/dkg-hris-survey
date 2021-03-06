import ServiceBase from "../service-base";
import { statistics } from "../../entities/aggregate-report/statistics";
import MockAggregateData from "./aggregate-mock";
import ParticipationRate from "./../../entities/aggregate-report/paticipation-rate";
import ComparisonCompetency from "../../entities/aggregate-report/comparison-competency";
import ComparisonQuestions from "../../entities/aggregate-report/comparison-questions";
import Heatmap from "./../../entities/aggregate-report/heatmap";
import RadarCoreValues from "../../entities/aggregate-report/core-calues-radar";
import AverageCompetency from "../../entities/aggregate-report/average-competency";
import DashboardInfo from "../../entities/aggregate-report/dashboard-info";
import { AggregateReportProps } from "../../features/dashboard/aggregate-dashboard/aggregate-report-props";
import NumberOfLeaders from "../../entities/aggregate-report/leader-number";
import CompetencyAvg from "../../entities/aggregate-report/competency-avg";

class AggregateServices extends ServiceBase {
  public constructor() {
    super();
  }
  public async getInfo(username: string): Promise<DashboardInfo> {
    if (process.env.NODE_ENV === "production") {
      const query = username == null || username === "" ? "" : "?viewAs=" + username;

      let data: DashboardInfo;
      data = await this.get("survey/aggregate/info" + query)
        .then(response => {
          return {
            hasAccessTo: response.data.hasAccessTo,
            departments: response.data.departments,
            subDepartments: response.data.subDepartments,
            levels: response.data.levels,
            user: response.data.user,
            nominationId: response.data.nominationId,
            statusCode: response.data.statusCode,
          } as DashboardInfo;
        })
        .catch(error => {
          return {
            hasAccessTo: [],
            departments: [],
            subDepartments: [],
            levels: [],
            user: {},
            nominationId: 0,
            statusCode: error.response.status,
          };
        });

      return Promise.resolve(data);
    }

    return Promise.resolve(MockAggregateData.MockDashboardInfo);
  }
  public async getStatistics(props: AggregateReportProps): Promise<statistics> {
    if (process.env.NODE_ENV === "production") {
      const query = props.viewAs == null || props.viewAs === "" ? "" : "?viewAs=" + props.viewAs;
      const items: any = await this.get(
        `survey/aggregate/statistics/${props.depLevel}/${props.subDepLevel}/${props.level}${query}`,
      );
      return Promise.resolve(items.data);
    }

    return Promise.resolve(MockAggregateData.statisticMock);
  }

  public async getParticipationRate(props: AggregateReportProps): Promise<ParticipationRate[]> {
    if (process.env.NODE_ENV === "production") {
      const query = props.viewAs == null || props.viewAs === "" ? "" : "?viewAs=" + props.viewAs;
      const items: any = await this.get(
        `survey/aggregate/participationrate/${props.depLevel}/${props.subDepLevel}/${props.level}${query}`,
      );
      return Promise.resolve(items.data);
    }

    return Promise.resolve(MockAggregateData.MockParticipationRate);
  }

  public async getComparisonCompetency(props: AggregateReportProps): Promise<ComparisonCompetency> {
    if (process.env.NODE_ENV === "production") {
      const query = props.viewAs == null || props.viewAs === "" ? "" : "?viewAs=" + props.viewAs;

      const items: any = await this.get(
        `survey/aggregate/competencies/chart/${props.depLevel}/${props.subDepLevel}/${props.level}${query}`,
      );
      return Promise.resolve(items.data);
    }

    return Promise.resolve(MockAggregateData.MockComparisonCompetency);
  }

  public async getComparisonQuestions(props: AggregateReportProps): Promise<ComparisonQuestions> {
    if (process.env.NODE_ENV === "production") {
      const query = props.viewAs == null || props.viewAs === "" ? "" : "?viewAs=" + props.viewAs;

      const items: any = await this.get(
        `survey/aggregate/questions/${props.depLevel}/${props.subDepLevel}/${props.level}${query}`,
      );
      return Promise.resolve(items.data);
    }

    return Promise.resolve(MockAggregateData.MockComparingQuestion);
  }
  public async getHeatmap(props: AggregateReportProps): Promise<Heatmap[]> {
    if (process.env.NODE_ENV === "production") {
      const query = props.viewAs == null || props.viewAs === "" ? "" : "?viewAs=" + props.viewAs;

      const items: any = await this.get(
        `survey/aggregate/heatmap/${props.depLevel}/${props.subDepLevel}/${props.level}${query}`,
      );
      return Promise.resolve(items.data);
    }

    return Promise.resolve(MockAggregateData.MockHeat);
  }
  public async getRadarCoreValues(props: AggregateReportProps): Promise<RadarCoreValues> {
    if (process.env.NODE_ENV === "production") {
      const query = props.viewAs == null || props.viewAs === "" ? "" : "?viewAs=" + props.viewAs;

      const items: any = await this.get(
        `survey/aggregate/values/chart/${props.depLevel}/${props.subDepLevel}/${props.level}${query}`,
      );
      return Promise.resolve(items.data);
    }

    return Promise.resolve(MockAggregateData.MockRadarCoreValues);
  }
  public async getAverageCompetency(props: AggregateReportProps): Promise<AverageCompetency> {
    if (process.env.NODE_ENV === "production") {
      const query = props.viewAs == null || props.viewAs === "" ? "" : "?viewAs=" + props.viewAs;

      const items: any = await this.get(
        `survey/aggregate/overall/comparison/${props.depLevel}/${props.subDepLevel}/${props.level}${query}`,
      );
      return Promise.resolve(items.data);
    }

    return Promise.resolve(MockAggregateData.MockAvgCompetency);
  }

  public async getNumberOfLeaders(props: AggregateReportProps): Promise<NumberOfLeaders[]> {
    if (process.env.NODE_ENV === "production") {
      const query = props.viewAs == null || props.viewAs === "" ? "" : "?viewAs=" + props.viewAs;

      const items: any = await this.get(
        `survey/aggregate/numberOfLeaders/${props.depLevel}/${props.subDepLevel}/${props.level}${query}`,
      );
      return Promise.resolve(items.data);
    }

    return Promise.resolve(MockAggregateData.MockNumberOfLeaders);
  }

  public async getCompetencyAverageRate(props: AggregateReportProps): Promise<CompetencyAvg[]> {
    if (process.env.NODE_ENV === "production") {
      const query = props.viewAs == null || props.viewAs === "" ? "" : "?viewAs=" + props.viewAs;

      const items: any = await this.get(
        `survey/aggregate/competencies/table/${props.depLevel}/${props.subDepLevel}/${props.level}${query}`,
      );
      return Promise.resolve(items.data);
    }

    return Promise.resolve(MockAggregateData.MockCompetencyAvg);
  }
}
export default AggregateServices;
