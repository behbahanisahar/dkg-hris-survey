import SubOrdinate from "./subOrdinate";
import IUser from "./user";

export default interface NominationData{
    Status: string;
    Subordinates: IUser[];
    Others: IUser[];
    Peers: IUser[];
    User?:SubOrdinate;
    LineManager?:SubOrdinate;
}
