import { IAppraiseeStatus } from "./IAppraiseeStatus";

export interface IAppraisee {
  NominationItemId: number;
  Relation: string;
  Status: IAppraiseeStatus;
  Title: string;
  UserAvatar: string;
}
