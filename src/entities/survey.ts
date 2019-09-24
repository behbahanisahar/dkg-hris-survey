import IQuestion from "./survey-questions";

export default interface Isurvey {
  Title: string;
  SignUrl: string;
  Questions: IQuestion[];
}
