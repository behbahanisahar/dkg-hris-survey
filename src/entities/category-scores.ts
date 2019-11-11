import ReportStructure from "./reportData";
import QuestionData from "./category-score-questiondata";

export default interface ICategoryScore {
  CategoryTitle: string;
  CategoryChart: ReportStructure;
  QuestionsData: QuestionData[];
}
