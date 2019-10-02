import IQuestion from "./survey-questions";

export default interface ICategory {
  Title: string;
  TitleFa: string;
  SignUrl: string;
  Questions: IQuestion[];
  BaseCategory: string;
  BaseCategoryId: number;
  BaseCategoryFa: string;
}
