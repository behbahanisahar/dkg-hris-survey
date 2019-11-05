import { IAppraiseeStatus } from "./IAppraiseeStatus";
import UserInfoItem from "./user-info";

export interface IAppraisee {
  NominationItemId: number;
  Relation: string;
  Status: IAppraiseeStatus;
  User: UserInfoItem;
  HasCoworker: boolean;
}
