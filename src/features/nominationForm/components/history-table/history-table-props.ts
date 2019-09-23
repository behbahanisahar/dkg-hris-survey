import IHistory from "../../../../entities/history";

export default interface IHistoryTableProps {

    Items?: IHistory[];
    tableName?:string;
    itemId:number;
}