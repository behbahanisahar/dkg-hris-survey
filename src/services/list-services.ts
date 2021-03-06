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
            "',NickName) or substringof('" +
            searchTerm +
            "',EmailAddress) or substringof('" +
            searchTerm +
            "',SPLatinFullName))"
          : "JobStatus eq 'شاغل' and SPLatinFullName ne ''";
      const result: any[] = await sp.web.lists
        .getByTitle(SPLists.UserInfo)
        .items.filter(encodeURIComponent(filter))
        .select("EmailAddress", "SPLatinFullName", "Department", "ReportedPost", "Id", "NickName")
        .orderBy("SPLatinFullName", true)
        .top(20)
        .get();
      return Promise.resolve(
        result.map(({ SPLatinFullName: label, Id: id, EmailAddress, SPLatinFullName, ReportedPost, Department }) => {
          return {
            label,
            value: String(id),
            department: Department,
            reportedPost: ReportedPost,
            spLatinFullName: SPLatinFullName,
            emailAddress: EmailAddress,
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
            title: "",
            hasCoworker: response.data.hasCoworker,
            status: response.data.status,
            subordinates: response.data.subordinates,
            other: response.data.other,
            peer: response.data.peer,
            user: response.data.user,
            lineManager: response.data.lineManager,
            statusCode: response.status,
          };
        })
        .catch(error => {
          return {
            hasCoworker: false,
            statusCode: error.response.status,
            status: "",
            subordinates: [],
            other: [],
            peer: [],
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
            categories: response.data.categories,
            surveyAnswerId: response.data.surveyAnswerId,
            user: response.data.user,
            statusCode: response.status,
            shouldBeContinued: response.data.shouldBeContinued,
            shouldBeStarted: response.data.shouldBeStarted,
            shouldBeStopped: response.data.shouldBeStopped,
          };
        })

        .catch(function(error) {
          return {
            statusCode: error.response.status,
            categories: [],
            surveyAnswerId: 0,
            user: {},
            shouldBeContinued: "",
            shouldBeStarted: "",
            shouldBeStopped: "",
          };
        });

      return Promise.resolve(items);
    }

    return Promise.resolve(MockData.SurveyFormData);
  }
  /*****************************get appraisee***************************************************** */
  public async getAppraisee(username: string): Promise<any[]> {
    if (process.env.NODE_ENV === "production") {
      const result: any = await this.get("Appraisee?username=" + username);

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
    const items: any = await this.put("survey", param);
    return Promise.resolve(items);
  }
  /************************************************************** */
}
export default ListServices;
