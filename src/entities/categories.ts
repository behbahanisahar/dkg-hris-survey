import IQuestion from "./survey-questions";

export default interface ICategory {
  title: string;
  titleFa: string;
  signUrl: string;
  questions: IQuestion[];
  baseCategory: string;
  baseCategoryId: number;
  baseCategoryFa: string;
}
