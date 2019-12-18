import ReportStructure from "./reportData";
import QuestionData from "./category-score-questiondata";
import CompetencyCategory from "./competency-category";

export default interface ICategoryScore {
  categoryTitle: string;
  categoryChart: ReportStructure;
  questionsData: QuestionData[];
  categories: CompetencyCategory[];
}
