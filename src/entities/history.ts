import { IChangedField } from "./changedFiled";

export default interface IHistory {
  changes: IChangedField[];
  field: string;
}
