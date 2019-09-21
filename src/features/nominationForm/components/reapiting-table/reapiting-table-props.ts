import IUser from "../../../../entities/user";

export default interface ITableProps {

    Items: IUser[];
    tableName:string;
}