import { IAnswer } from "./answer";

export interface ISurveyData {
  nominationItemId: number;
  currentUserId: number;
  status: string;
  answers: IAnswer[];
  shouldBeStarted: string;
  shouldBeContinued: string;
  shouldBeStopped: string;
  impersonated?: boolean;
}
