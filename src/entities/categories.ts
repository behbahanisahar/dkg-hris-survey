import IQuestion from "./survey-questions";

export default interface ICategory {
  Title: string;
  SignUrl: string;
  Questions: IQuestion[];
}
