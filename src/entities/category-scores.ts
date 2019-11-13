import ReportStructure from "./reportData";
import QuestionData from "./category-score-questiondata";
import CompetencyCategory from "./competency-category";

export default interface ICategoryScore {
  CategoryTitle: string;
  CategoryChart: ReportStructure;
  QuestionsData: QuestionData[];
  Categories: CompetencyCategory[];
}
