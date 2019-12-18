import UserInfoItem from "./user-info";

export default interface UserTasks {
  itemId: number;
  status: string;
  title: string;
  user: UserInfoItem;
}
