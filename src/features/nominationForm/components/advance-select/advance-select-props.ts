import UserInfoItem from "../../../../entities/user-info";
import NominationData from "../../../../entities/nomination";

export default interface IAdvanceSelectProps {
  fieldName: string;
  UserInfo: UserInfoItem[];
  tableName: string;
  NominationData: NominationData;
  AddOrder: string;
  onChangeDataTableValue: (st: any) => void;
  onAddField: (st: any) => void;
  onError: (st: any) => void;
}
