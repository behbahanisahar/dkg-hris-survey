import { sp } from "@pnp/sp";
import ServiceBase from "./service-base";
import MockData from "./mock-data";
import NominationData from "../entities/nomination";
import IUpdatedData from "../entities/updatedNominationItem";
import IHistory from "../entities/history";
import SPLists from "../entities/lists";
import Isurvey from "../entities/survey";
import { ISurveyData } from "../entities/survey-data";
import UserTasks from "../entities/user-task";

class ListServices extends ServiceBase {
  public constructor() {
    super();
  }

  public async getUserInfo(searchTerm: string): Promise<any> {
    if (process.env.NODE_ENV === "production") {
      var filter =
        searchTerm.length > 0
          ? "JobStatus eq 'شاغل' and SPLatinFullName ne '' and substringof('" + searchTerm + "',SPLatinFullName)"
          : "JobStatus eq 'شاغل' and SPLatinFullName ne ''";
      const result: any[] = await sp.web.lists
        .getByTitle(SPLists.UserInfo)
        .items.filter(filter)
        .select("EmailAddress", "SPLatinFullName", "Department", "Id")
        .orderBy("SPLatinFullName", true)
        .top(20)
        .get();
      return Promise.resolve(
        result.map(({ SPLatinFullName: label, Id, EmailAddress, SPLatinFullName, Department }) => {
          return {
            label,
            value: String(Id),
            Department,
            SPLatinFullName,
            EmailAddress,
          };
        }),
      );
    }
    return Promise.resolve(MockData.getUserInfo);
  }
  /****************get nomination form data*****************************************************8 */
  public async getNominationData(itemId: number): Promise<NominationData> {
    if (process.env.NODE_ENV === "production") {
      const items: any = await this.get("/survey/nomination?itemId=" + itemId + "").catch(function(error) {
        return {
          statusCode: error.response.status,
        };
      });

      return Promise.resolve({
        Status: items.data.Status,
        Subordinates: items.data.Subordinates,
        Other: items.data.Other,
        Peer: items.data.Peer,
        User: items.data.User,
        LineManager: items.data.LineManager,
        statusCode: items.status,
      });
    }
    return Promise.resolve(MockData.NominationData);
  }
  /**********************get nomination form history******************************************* */
  public async getNominationHistory(itemId: number): Promise<IHistory[]> {
    if (process.env.NODE_ENV === "production") {
      const items: any = await this.get("/survey/nomination/history?itemId=" + itemId + "");
      return Promise.resolve(items.data);
    }

    return Promise.resolve(MockData.NominationHistory);
  }
  /*******************put nomination form data************************************************** */
  public async updateNominationData(param: IUpdatedData): Promise<IUpdatedData> {
    const items: any = await this.put("/survey/nomination", param);
    return Promise.resolve(items.data);
  }
  /********************get survey form ***************************************************************** */
  public async getSurveyFormData(itemId: number): Promise<Isurvey> {
    if (process.env.NODE_ENV === "production") {
      debugger;
      const items: any = await this.get("/survey?nominationItemId=" + itemId + "").catch(function(error) {
        return {
          statusCode: error.response.status,
        };
      });

      return Promise.resolve({
        UserDisplayName: items.data.UserDisplayName,
        SurveyAnswerId: items.data.SurveyAnswerId,
        Categories: items.data.Categories,
        statusCode: items.status,
      });
    }

    return Promise.resolve(MockData.SurveyFormData);
  }
  /*****************************get appraisee***************************************************** */
  public async getAppraisee(): Promise<any[]> {
    if (process.env.NODE_ENV === "production") {
      const result: any = await this.get("/Appraisee");

      return Promise.resolve(result.data);
    }

    return Promise.resolve(MockData.Appraisee);
  }
  /************************get nomination task*********************************************** */
  public async getNominationTasks(): Promise<UserTasks[]> {
    if (process.env.NODE_ENV === "production") {
      const items: any = await this.get("/survey/nomination/tasks");

      return Promise.resolve(items.data);
    }

    return Promise.resolve(MockData.NominationTaks);
  }
  /**************************submit form***************************************************** */
  public async SubmitForm(param: ISurveyData): Promise<any> {
    const items: any = await this.post("/survey", param);
    return Promise.resolve(items);
  }
  /************************************************************** */
}
export default ListServices;
