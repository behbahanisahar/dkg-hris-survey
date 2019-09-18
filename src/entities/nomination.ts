import SubOrdinate from "./subOrdinate";

export default interface NominationData{
    Status: string;
    Subordinates: SubOrdinate[];
    User:SubOrdinate;
    LineManager:SubOrdinate;
}
