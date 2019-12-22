import ServiceBase from "../service-base";
import { statistics } from "../../entities/aggregate-report/statistics";
import MockAggregateData from "./aggregate-mock";
import ParticipationRate from "./../../entities/aggregate-report/paticipation-rate";
import ComparisonCompetency from "../../entities/aggregate-report/comparison-competency";
import ComparisonQuestions from "../../entities/aggregate-report/comparison-questions";
import Heatmap from "./../../entities/aggregate-report/heatmap";
import RadarCoreValues from "../../entities/aggregate-report/core-calues-radar";

class AggregateServices extends ServiceBase {
  public constructor() {
    super();
  }
  public async getStatistics(level: string): Promise<statistics> {
    if (process.env.NODE_ENV === "production") {
      const items: any = await this.get("survey/aggregate/statistics/" + level);
      return Promise.resolve(items.data);
    }

    return Promise.resolve(MockAggregateData.statisticMock);
  }

  public async getParticipationRate(level: string): Promise<ParticipationRate[]> {
    if (process.env.NODE_ENV === "production") {
      const items: any = await this.get("survey/aggregate/participationrate/" + level);
      return Promise.resolve(items.data);
    }

    return Promise.resolve(MockAggregateData.MockParticipationRate);
  }
  public async getComparisonCompetency(level: string): Promise<ComparisonCompetency> {
    if (process.env.NODE_ENV === "production") {
      const items: any = await this.get("survey/aggregate/competencies/chart/" + level);
      return Promise.resolve(items.data);
    }

    return Promise.resolve(MockAggregateData.MockComparisonCompetency);
  }

  public async getComparisonQuestions(level: string): Promise<ComparisonQuestions> {
    if (process.env.NODE_ENV === "production") {
      const items: any = await this.get("survey/aggregate/questions/" + level);
      return Promise.resolve(items.data);
    }

    return Promise.resolve(MockAggregateData.MockComparingQuestion);
  }
  public async getHeatmap(level: string): Promise<Heatmap[]> {
    if (process.env.NODE_ENV === "production") {
      const items: any = await this.get("survey/aggregate/heatmap/" + level);
      return Promise.resolve(items.data);
    }

    return Promise.resolve(MockAggregateData.MockHeat);
  }
  public async getRadarCoreValues(level: string): Promise<RadarCoreValues> {
    if (process.env.NODE_ENV === "production") {
      const items: any = await this.get("survey/aggregate/values/chart/" + level);
      return Promise.resolve(items.data);
    }

    return Promise.resolve(MockAggregateData.MockRadarCoreValues);
  }
}
export default AggregateServices;
