import IQuestion from "./survey-questions";

export default interface ICategory {
  title: string;
  titleFa: string;
  SignUrl: string;
  questions: IQuestion[];
  baseCategory: string;
  baseCategoryId: number;
  baseCategoryFa: string;
}
