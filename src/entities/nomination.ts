import SubOrdinate from "./subOrdinate";
import IUser from "./user";

export default interface NominationData {
  Status: string;
  Subordinates: IUser[];
  Other: IUser[];
  Peer: IUser[];
  User?: SubOrdinate;
  LineManager?: SubOrdinate;
}
