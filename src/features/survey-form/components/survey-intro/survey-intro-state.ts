import { IAppraisee } from "../../../../entities/appraisee";

export default interface ISurveyIntroState {
  appraisee: IAppraisee[];
  showSpinner: boolean;
  buttonText: string;
}
