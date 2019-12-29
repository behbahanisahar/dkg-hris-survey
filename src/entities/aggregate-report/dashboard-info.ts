import DropDownModel from "../dropdown";
import UserInfoItem from "../user-info";

export default interface DashboardInfo {
  dropdownValues: DropDownModel[];
  userClevel?: string;
  title: string;
  user?: UserInfoItem;
}
