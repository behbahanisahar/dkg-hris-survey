import Isurvey from "../../../../entities/survey";

export default interface ISurveyFromState {
  SurveyFormData: Isurvey[];
  score: string;
  radio: number;
}
