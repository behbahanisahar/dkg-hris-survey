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
import { AggregateReportProps } from "../../features/aggregate-dashboard/aggregate-report-props";

class AggregateServices extends ServiceBase {
  public constructor() {
    super();
  }
  public async getInfo(username: string): Promise<DashboardInfo> {
    if (process.env.NODE_ENV === "production") {
      const items: any = await this.get("survey/aggregate/info?viewAs=" + username);
      return Promise.resolve(items.data);
    }

    return Promise.resolve(MockAggregateData.MockDashboardInfo);
  }
  public async getStatistics(props: AggregateReportProps): Promise<statistics> {
    if (process.env.NODE_ENV === "production") {
      const items: any = await this.get(`survey/aggregate/statistics/${props.level}?viewAs=${props.viewAs}`);
      return Promise.resolve(items.data);
    }

    return Promise.resolve(MockAggregateData.statisticMock);
  }

  public async getParticipationRate(props: AggregateReportProps): Promise<ParticipationRate[]> {
    if (process.env.NODE_ENV === "production") {
      const items: any = await this.get(`survey/aggregate/participationrate/${props.level}?viewAs=${props.viewAs}`);
      return Promise.resolve(items.data);
    }

    return Promise.resolve(MockAggregateData.MockParticipationRate);
  }

  public async getComparisonCompetency(props: AggregateReportProps): Promise<ComparisonCompetency> {
    if (process.env.NODE_ENV === "production") {
      const items: any = await this.get(`survey/aggregate/competencies/chart/${props.level}?viewAs=${props.viewAs}`);
      return Promise.resolve(items.data);
    }

    return Promise.resolve(MockAggregateData.MockComparisonCompetency);
  }

  public async getComparisonQuestions(props: AggregateReportProps): Promise<ComparisonQuestions> {
    if (process.env.NODE_ENV === "production") {
      const items: any = await this.get(`survey/aggregate/questions/${props.level}?viewAs=${props.viewAs}`);
      return Promise.resolve(items.data);
    }

    return Promise.resolve(MockAggregateData.MockComparingQuestion);
  }
  public async getHeatmap(props: AggregateReportProps): Promise<Heatmap[]> {
    if (process.env.NODE_ENV === "production") {
      const items: any = await this.get(`survey/aggregate/heatmap/${props.level}?viewAs=${props.viewAs}`);
      return Promise.resolve(items.data);
    }

    return Promise.resolve(MockAggregateData.MockHeat);
  }
  public async getRadarCoreValues(props: AggregateReportProps): Promise<RadarCoreValues> {
    if (process.env.NODE_ENV === "production") {
      const items: any = await this.get(`survey/aggregate/values/chart/${props.level}?viewAs=${props.viewAs}`);
      return Promise.resolve(items.data);
    }

    return Promise.resolve(MockAggregateData.MockRadarCoreValues);
  }
  public async getAverageCompetency(props: AggregateReportProps): Promise<AverageCompetency> {
    if (process.env.NODE_ENV === "production") {
      const items: any = await this.get(`survey/aggregate/overall/comparison/${props.level}?viewAs=${props.viewAs}`);
      return Promise.resolve(items.data);
    }

    return Promise.resolve(MockAggregateData.MockAvgCompetency);
  }
}
export default AggregateServices;
