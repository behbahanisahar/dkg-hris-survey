import * as React from 'react';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import ITableHeader from '../../../../entities/table-headers';
import ITableProps from './reapiting-table-props';
import ITableState from './reapiting-table-state';
import IUser from '../../../../entities/user';
import Delete from "@material-ui/icons/Delete";


export default class ReapitingTable extends React.Component<ITableProps, ITableState> {
    private tableHeaders: ITableHeader[];
    public constructor(props: ITableProps) {
        super(props);
        this.tableHeaders = [
            { id: "Row", label: "Row" },
            { id: "Selected", label: "Selected Person" },
            { id: "Action", label: "Delete" },
          ];

        this.state = {
            logItems: [],
            page: 0,
            rowsPerPage: 5,
            order: 'desc',
            orderBy: 'Id',
        };
    }
    public async componentDidMount() {
       const items=this.props.Items;
       this.setState(prevState => {
        return {
          ...prevState,
         logItems:items
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
        if(this.props.tableName==="SelectedSubordinate"){
          return   this.state.logItems.map((n: any, index: any) => {
            return (
              <TableRow key={index}>
                <TableCell align="center">{index + 1}</TableCell>
                <TableCell align="center">{n.SPLatinFullName}</TableCell>
                <TableCell
                  align="center"
                  onClick={() => this.DeleteItem(n.SPLatinFullName, this.props.tableName,this.state.logItems)}
                >
                  <Delete cursor="pointer" color="primary" />
                </TableCell>
              </TableRow>
            );
          })

        }
        else{
          return   this.state.logItems.map((n: any, index: any) => {
            return (
              <TableRow key={index}>
                <TableCell align="center">{index + 1}</TableCell>
                <TableCell align="center">{n.SPLatinFullName}</TableCell>
                <TableCell
                  align="center"
                  onClick={() => this.DeleteItem(n.SPLatinFullName, this.props.tableName,this.state.logItems)}
                >
                  <Delete cursor="pointer" color="primary" />
                </TableCell>
              </TableRow>
            );
          })
        }          
    }
    /******************************delete item from table***************************************************** */
    private DeleteItem = (currentItem: any, SelectedField: string,items:IUser[]) => {
        if (SelectedField === "SelectedOther") {
          this.setState(prevState => {
        const prevValues = prevState.logItems || [];
       // const prevValues=items;
            const newValue = prevValues.filter(el => el.SPLatinFullName !== currentItem);
            return {
              ...prevState,
              logItems: newValue,
            };
          });
        }
    
        if (SelectedField === "SelectedPeer") {
          this.setState(prevState => {
         // const prevValues=items;
         const prevValues = prevState.logItems || [];
            const newValue = prevValues.filter(el => el.SPLatinFullName !== currentItem);
            return {
              ...prevState,
              logItems: newValue,
            };
          });
        }
      };
}