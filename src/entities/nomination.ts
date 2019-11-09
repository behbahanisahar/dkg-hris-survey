import SubOrdinate from "./subOrdinate";
import IUser from "./user";

export default interface INominationData {
  Status: string;
  Subordinates: IUser[];
  Other: IUser[];
  Peer: IUser[];
  User?: SubOrdinate;
  LineManager?: SubOrdinate;
  statusCode?: number;
  HasCoworker?: boolean;
}
