import IUser from "../../../../entities/user";

export default interface ITableState {
    logItems: IUser[];
    page: number;
    rowsPerPage: number;
    order: string;
    orderBy: string;
}