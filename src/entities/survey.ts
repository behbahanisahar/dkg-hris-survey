import ICategory from "./categories";

export default interface Isurvey {
  UserDisplayName: string;
  SurveyAnswerId: number;
  Categories: ICategory[];
}
