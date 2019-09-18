export default interface ITableHeader {
    id: string;
    numeric?: boolean;
    disablePadding?: boolean;
    label: string;
    sortable?: boolean;
}