import ServiceBase from "./service-base";
import MockData from "./mock-data";
import Raters from "../entities/raters";

class ReportServices extends ServiceBase {
  public constructor() {
    super();
  }

  /**********************get nomination form history******************************************* */
  public async getraters(itemId: number): Promise<Raters[]> {
    if (process.env.NODE_ENV === "production") {
      const items: any = await this.get("survey/report/raters?itemid=" + itemId + "");
      console.log(items);
      return Promise.resolve(items.data);
    }

    return Promise.resolve(MockData.getRaters);
  }

  /************************************************************** */
}
export default ReportServices;
