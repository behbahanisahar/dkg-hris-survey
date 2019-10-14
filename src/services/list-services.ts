import { sp } from "@pnp/sp";
import ServiceBase from "./service-base";
import MockData from "./mock-data";
import NominationData from "../entities/nomination";
import IUpdatedData from "../entities/updatedNominationItem";
import IHistory from "../entities/history";
import SPLists from "../entities/lists";
import Isurvey from "../entities/survey";
import { ISurveyData } from "../entities/survey-data";

class ListServices extends ServiceBase {
  public constructor() {
    super();
  }

  public async getUserInfo(searchTerm: string): Promise<any> {
    if (process.env.NODE_ENV === "production") {
      var filter =
        searchTerm.length > 0
          ? "(JobStatus eq 'شاغل' and SPLatinFullName ne '') and (substringof('" +
            searchTerm +
            "',Title) or substringof('" +
            searchTerm +
            "',EmailAddress) or substringof('" +
            searchTerm +
            "',SPLatinFullName))"
          : "JobStatus eq 'شاغل' and SPLatinFullName ne ''";
      const result: any[] = await sp.web.lists
        .getByTitle(SPLists.UserInfo)
        .items.filter(filter)
        .select("EmailAddress", "SPLatinFullName", "Department", "ReportedPost", "Id")
        .orderBy("SPLatinFullName", true)
        .top(20)
        .get();
      return Promise.resolve(
        result.map(({ SPLatinFullName: label, Id, EmailAddress, SPLatinFullName, ReportedPost, Department }) => {
          return {
            label,
            value: String(Id),
            Department,
            ReportedPost,
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
      let data: NominationData;

      data = await this.get("survey/nomination?itemId=" + itemId + "")
        .then(response => {
          return {
            Title: "",
            Status: response.data.Status,
            Subordinates: response.data.Subordinates,
            Other: response.data.Other,
            Peer: response.data.Peer,
            User: response.data.User,
            LineManager: response.data.LineManager,
            statusCode: response.status,
          };
        })
        .catch(error => {
          return {
            statusCode: error.response.status,
            Status: "",
            Subordinates: [],
            Other: [],
            Peer: [],
          };
        });

      return Promise.resolve(data);
    } else return Promise.resolve(MockData.NominationData);
  }
  /**********************get nomination form history******************************************* */
  public async getNominationHistory(itemId: number): Promise<IHistory[]> {
    if (process.env.NODE_ENV === "production") {
      const items: any = await this.get("survey/nomination/history?itemId=" + itemId + "");
      return Promise.resolve(items.data);
    }

    return Promise.resolve(MockData.NominationHistory);
  }
  /*******************put nomination form data************************************************** */
  public async updateNominationData(param: IUpdatedData): Promise<IUpdatedData> {
    const items: any = await this.put("survey/nomination", param);
    return Promise.resolve(items.data);
  }
  /********************get survey form ***************************************************************** */
  public async getSurveyFormData(itemId: number): Promise<Isurvey> {
    if (process.env.NODE_ENV === "production") {
      const items: any = await this.get("survey?nominationItemId=" + itemId + "")
        .then(response => {
          return {
            Categories: response.data.Categories,
            SurveyAnswerId: response.data.SurveyAnswerId,
            UserDisplayName: response.data.UserDisplayName,
            statusCode: response.status,
          };
        })

        .catch(function(error) {
          return {
            statusCode: error.response.status,
            Categories: [],
            SurveyAnswerId: 0,
            UserDisplayName: "",
          };
        });

      return Promise.resolve(items);
    }

    return Promise.resolve(MockData.SurveyFormData);
  }
  /*****************************get appraisee***************************************************** */
  public async getAppraisee(): Promise<any[]> {
    if (process.env.NODE_ENV === "production") {
      const result: any = await this.get("Appraisee");

      return Promise.resolve(result.data);
    }

    return Promise.resolve(MockData.Appraisee);
  }
  /************************get nomination task*********************************************** */
  public async getNominationTasks(): Promise<any[]> {
    if (process.env.NODE_ENV === "production") {
      const items: any = await this.get("survey/nomination/tasks");

      return Promise.resolve(items.data);
    }

    return Promise.resolve(MockData.NominationTaks);
  }
  /**************************submit form***************************************************** */
  public async SubmitForm(param: ISurveyData): Promise<any> {
    const items: any = await this.post("survey", param);
    return Promise.resolve(items);
  }
  /************************************************************** */
}
export default ListServices;
