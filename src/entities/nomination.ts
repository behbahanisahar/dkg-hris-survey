import SubOrdinate from "./subOrdinate";
import IUser from "./user";

export default interface INominationData {
  status: string;
  subordinates: IUser[];
  other: IUser[];
  peer: IUser[];
  user?: SubOrdinate;
  lineManager?: SubOrdinate;
  statusCode?: number;
  hasCoworker?: boolean;
}
