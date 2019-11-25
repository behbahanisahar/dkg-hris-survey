import UserInfoItem from "../user-info";
import SummarySubordinates from "./category-summary-subordinate";

export default interface CategorySummary {
  User: UserInfoItem;
  SurveyProgress: number;
  Subordinates: SummarySubordinates[];
}
