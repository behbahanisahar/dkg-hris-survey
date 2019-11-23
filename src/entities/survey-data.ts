import { IAnswer } from "./answer";

export interface ISurveyData {
  nominationItemId: number;
  currentUserId: number;
  status: string;
  answers: IAnswer[];
  ShouldBeStarted: string;
  ShouldBeContinued: string;
  ShouldBeStopped: string;
  impersonated?: boolean;
}
