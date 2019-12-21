import ServiceBase from "../service-base";
import { statistics } from "../../entities/aggregate-report/statistics";
import MockAggregateData from "./aggregate-mock";

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
}
export default AggregateServices;
