import ServiceBase from "./service-base";
import MockData from "./mock-data";
import Raters from "../entities/raters";
import ReportStructure from "../entities/reportData";

class ReportServices extends ServiceBase {
  public constructor() {
    super();
  }

  /**********************get raters ******************************************* */
  public async getraters(itemId: number): Promise<Raters[]> {
    if (process.env.NODE_ENV === "production") {
      const items: any = await this.get("survey/report/raters?itemid=" + itemId + "");
      return Promise.resolve(items.data);
    }

    return Promise.resolve(MockData.getRaters);
  }
  /*****************get competency summary************************************* */
  public async getCompetencySummary(itemId: number): Promise<ReportStructure> {
    if (process.env.NODE_ENV === "production") {
      const items: any = await this.get("survey/report/competencysummary?itemid=" + itemId + "");
      console.log(items);
      return Promise.resolve(items.data);
    }

    return Promise.resolve(MockData.competencySummary);
  }
  /************************************************************** */
}
export default ReportServices;
