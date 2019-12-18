import { IAppraiseeStatus } from "./IAppraiseeStatus";
import UserInfoItem from "./user-info";

export interface IAppraisee {
  nominationItemId: number;
  relation: string;
  status: IAppraiseeStatus;
  user: UserInfoItem;
  hasCoworker: boolean;
}
