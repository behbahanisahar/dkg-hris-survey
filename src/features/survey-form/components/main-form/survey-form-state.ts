import { IAnswer } from "./../../../../entities/answer";
import Isurvey from "../../../../entities/survey";

export default interface ISurveyFromState {
  open: boolean;
  score: string;
  radio: number;
  marks: any[];
  selectedValue: number;
  answers: IAnswer[];
  SurveyFormData: Isurvey;
  itemid: number;
  showSpinner: boolean;
  submittingForm: boolean;
  savingForm: boolean;
  userId: number;
}
