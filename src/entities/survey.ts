import ICategory from "./categories";
import SubOrdinate from "./subOrdinate";

export default interface Isurvey {
  user: SubOrdinate;
  surveyAnswerId: number;
  categories: ICategory[];
  statusCode?: number;
  shouldBeStarted: string;
  shouldBeContinued: string;
  shouldBeStopped: string;
}
