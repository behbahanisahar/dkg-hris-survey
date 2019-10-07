import UserInfoItem from "./user-info";

export default interface UserTasks {
  ItemId: number;
  Status: string;
  Title: string;
  User: UserInfoItem;
}
