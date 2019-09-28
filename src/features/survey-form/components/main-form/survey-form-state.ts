import Isurvey from "../../../../entities/survey";

export default interface ISurveyFromState {
  score: string;
  radio: number;
  marks: any[];
  selectedValue: number;
  SurveyFormData: Isurvey;
  itemid: number;
}
