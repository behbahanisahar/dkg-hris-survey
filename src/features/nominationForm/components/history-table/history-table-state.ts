import IHistory from "../../../../entities/history";

export default interface IHistoryTableState {
    Items: IHistory[];
    page: number;
    rowsPerPage: number;
    order: string;
    orderBy: string;
    NominationHistory:IHistory[];
}