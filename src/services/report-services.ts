import { IComment } from "./../entities/reports/comments";
import ServiceBase from "./service-base";
import MockData from "./mock-data";
import Raters from "../entities/raters";
import ReportStructure from "../entities/reportData";
import ICategoryScore from "../entities/category-scores";
import IndexData from "../entities/reports/index-report";
import CategorySummary from "../entities/reports/category-summary";

class ReportServices extends ServiceBase {
  public constructor() {
    super();
  }

  /**********************get raters ******************************************* */
  public async getraters(itemId: number, lang: string): Promise<Raters[]> {
    if (process.env.NODE_ENV === "production") {
      const items: any = await this.get("survey/report/raters?itemid=" + itemId + "&language=" + lang + "");
      return Promise.resolve(items.data);
    }

    return Promise.resolve(MockData.getRaters);
  }
  /*****************get competency summary(for radar chart)************************ */
  public async getComparingChartData(itemId: number, lang: string): Promise<ReportStructure> {
    if (process.env.NODE_ENV === "production") {
      const items: any = await this.get(
        "survey/report/competencysummary/chartjs?itemid=" + itemId + "&language=" + lang + "",
      );
      return Promise.resolve(items.data);
    }

    return Promise.resolve(MockData.comparingChartData);
  }
  /*************get competency summary(for drilldown chart(highchart))************ */
  public async getCompetencySummary(itemId: number, selectedYear: string, lang: string): Promise<any> {
    if (process.env.NODE_ENV === "production") {
      const items: any = await this.get(
        "survey/report/competencysummary?itemid=" + itemId + "&year=" + selectedYear + "&language=" + lang + "",
      );

      return Promise.resolve(items.data);
    }

    return Promise.resolve(MockData.competencySummary);
  }

  /*******************get compare competency************************************* */
  public async getCompareCompetency(itemId: number, lang: string): Promise<ReportStructure> {
    if (process.env.NODE_ENV === "production") {
      const items: any = await this.get("survey/report/compare?itemid=" + itemId + "&language=" + lang + "");
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
  /***************************************************************************** */

  public async getComments(itemId: number, lang: string): Promise<IComment[]> {
    if (process.env.NODE_ENV === "production") {
      const items: any = await this.get("survey/report/comments?itemid=" + itemId + "&language=" + lang + "");
      return Promise.resolve(items.data);
    }

    return Promise.resolve(MockData.Comments);
  }
  /**************************************************************************** */
  public async getIndex(itemId: number, lang: string): Promise<IndexData[]> {
    if (process.env.NODE_ENV === "production") {
      const items: any = await this.get("survey/report/index?itemid=" + itemId + "&language=" + lang + "");
      return Promise.resolve(items.data);
    }

    return Promise.resolve(MockData.Index);
  }
  /************************************************************************ */
  public async getReportHeaderData(itemId: number): Promise<CategorySummary> {
    if (process.env.NODE_ENV === "production") {
      const items: any = await this.get("survey/report/header?itemid=" + itemId);
      return Promise.resolve(items.data);
    }

    return Promise.resolve(MockData.ReportSummary);
  }
  /*************************************************************** */
  public async getReportAuthentication(itemId: number): Promise<any> {
    if (process.env.NODE_ENV === "production") {
      const items: any = await this.get("survey/report?itemid=" + itemId);
      return Promise.resolve(items.data);
    }

    return Promise.resolve(MockData.ReportSummary);
  }
}
export default ReportServices;
