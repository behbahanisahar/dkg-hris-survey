import * as React from 'react';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import ITableHeader from '../../../../entities/table-headers';
import IHistoryTableProps from './history-table-props';
import IHistoryTableState from './history-table-state';
import ListServices from '../../../../services/list-services';
import IHistory from '../../../../entities/history';


export default class HistoryTable extends React.Component<IHistoryTableProps, IHistoryTableState> {
    private tableHeaders: ITableHeader[];
    private ListService: ListServices;
    public constructor(props: IHistoryTableProps) {
        super(props);
        this.tableHeaders = [
          { id: "Row", label: "Row" },
            { id: "ModifiedBy", label: "ModifiedBy" },
            { id: "ModifiedDate", label: "ModifiedDate" },
            { id: "Added", label: "Added" },
            { id: "Deleted", label: "Deleted" },
          ];
          this.ListService = new ListServices();
        this.state = {
            Items: [],
            page: 0,
            rowsPerPage: 5,
            order: 'desc',
            orderBy: 'Id',
            NominationHistory: [
              {
                Changes: [],
                Field:""
              },
            ],
        };
       
    }
    public async componentDidMount() {
      const NominationHistory: IHistory[] = await this.ListService.getNominationHistory(Number(this.props.itemId));
      //  const items=this.props.Items;
       this.setState(prevState => {
        return {
          ...prevState,
          NominationHistory
        };
      });
      }
    public render() {

        return (
           
                <Table className="table" >
                    <TableHead>
                        <TableRow>
                            {this.renderHeader(this.tableHeaders)}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.onRenderRows()}
                    </TableBody>
                </Table>
           
        );
    }

    /**************************** Repeat Table ****************************** */
    private renderHeader = (columnDetail: any[]) => {
        return columnDetail.map(
            row => (
                <TableCell
                className="LogPadding" 
                    key={row.id}
                    align="center"
                    padding='none'
                    sortDirection='desc'
                >
                    {row.label}
                </TableCell>
            ),
            this,
        );
    }

    private onRenderRows = () => {
      console.log(this.state.NominationHistory);
          return   this.state.NominationHistory.map((n: any, index: any) => {
            return (
              <TableRow key={index}>
                <TableCell style={{width:'2%'}} align="center">{index + 1}</TableCell>
                <TableCell align="center">{n.ModifiedBy}</TableCell>
      
              </TableRow>
            );
          })

             
    }
 
}