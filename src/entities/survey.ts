import ICategory from "./categories";
import SubOrdinate from "./subOrdinate";

export default interface Isurvey {
  User: SubOrdinate;
  SurveyAnswerId: number;
  Categories: ICategory[];
  statusCode?: number;
  ShouldBeStarted: string;
  ShouldBeContinued: string;
  ShouldBeStopped: string;
}
