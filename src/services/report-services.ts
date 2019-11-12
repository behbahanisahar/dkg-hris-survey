import ServiceBase from "./service-base";
import MockData from "./mock-data";
import Raters from "../entities/raters";
import ReportStructure from "../entities/reportData";
import ICategoryScore from "../entities/category-scores";

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
  /*****************get competency summary(for radar chart)************************ */
  public async getComparingChartData(itemId: number): Promise<ReportStructure> {
    if (process.env.NODE_ENV === "production") {
      const items: any = await this.get("survey/report/competencysummary/chartjs?itemid=" + itemId + "");
      return Promise.resolve(items.data);
    }

    return Promise.resolve(MockData.comparingChartData);
  }
  /*************get competency summary(for drilldown chart(highchart))************ */
  public async getCompetencySummary(itemId: number): Promise<any> {
    if (process.env.NODE_ENV === "production") {
      const items: any = await this.get("survey/report/competencysummary?itemid=" + itemId + "");
      // const obj: any = {
      //   categories: items.data.categories,
      //   series: items.data.series,
      // };

      // const options = {
      //   xAxis: {
      //     categories: items.data.categories,
      //   },

      //   series: items.data.series,
      // };

      // for (let i = 0; i < options.series.length; ++i) {
      //   if (options.series[i].type === "bar") options.series[i].type === "bar";
      // }

      return Promise.resolve(items.data);
    }

    return Promise.resolve(MockData.competencySummary);
  }

  /*******************get compare competency************************************* */
  public async getCompareCompetency(itemId: number): Promise<ReportStructure> {
    if (process.env.NODE_ENV === "production") {
      const items: any = await this.get("survey/report/compare?itemid=" + itemId + "");
      console.log(items);
      return Promise.resolve(items.data);
    }

    return Promise.resolve(MockData.CompareCompetency);
  }
  /********************get competency category details************************* */
  public async getCompetencyCategory(itemId: number, categoryId: number): Promise<ICategoryScore> {
    if (process.env.NODE_ENV === "production") {
      const items: any = await this.get(
        "survey/report/categoryscores?itemid=" + itemId + "&categoryid=" + categoryId + "",
      );

      return Promise.resolve(items.data);
    }

    return Promise.resolve(MockData.CompetencyCategories);
  }
}
export default ReportServices;
