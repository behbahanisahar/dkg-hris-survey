import * as React from "react";

import AggregateServices from "../../../services/aggregate-service/aggregate-dashboard-service";
import Heatmap from "./../../../entities/aggregate-report/heatmap";
import { DKSpinner } from "../../../core/components/spinner/spinner";
import { Table, TableBody, TableRow, TableCell } from "@material-ui/core";
import { NoContent } from "../../nominationForm/components/no-content/no-content";
import "./heatmap.css";
import { DKPortlet } from "../../../core/components/portlet/portlet";
import { HeataMapLegend } from "./heatmap-legend";

interface IProps {
  reportType: string;
}
interface IState {
  data: Heatmap[];
  isFetching: boolean;
}
export default class HeatMap extends React.Component<IProps, IState> {
  private AggregateServices: AggregateServices;
  public constructor(props: any) {
    super(props);
    this.AggregateServices = new AggregateServices();
    this.state = {
      isFetching: true,
      data: [],
    };
  }
  public async componentWillReceiveProps(nextProps: any) {
    if (this.props.reportType !== nextProps.reportType) {
      this.getData(nextProps.reportType);
    }
  }
  public async getData(props: string) {
    this.setState(current => ({
      ...current,
      isFetching: true,
    }));
    await this.AggregateServices.getHeatmap(props).then(response =>
      this.setState(prevState => {
        return {
          ...prevState,

          isFetching: false,
          data: response,
        };
      }),
    );
  }

  public async componentDidMount() {
    this.getData(this.props.reportType);
  }
  public render() {
    return (
      <DKPortlet hasHeader={false}>
        {this.state.isFetching === true && <DKSpinner></DKSpinner>}
        {this.state.isFetching === false && (
          <div>
            <HeataMapLegend></HeataMapLegend>
            <Table className="table table-bordered mt-3 ltr table-sm">
              <thead className="thead-dark">
                <tr>
                  <th className="none-thead"> </th>
                  <th className="none-thead"> </th>
                  <th>Customer Centric</th>
                  <th> Builder approach and Result oriented</th>
                  <th> Drive for Excellence</th>
                  <th> Teamwork</th>
                  <th>Decision Making</th>
                  <th> Managing People</th>
                  <th> Developing Vision & Strategy</th>
                  <th> Business Acumen</th>
                  <th>Total Average Rate</th>
                </tr>
              </thead>
              <TableBody>{this.onRenderTable()}</TableBody>
            </Table>
          </div>
        )}
      </DKPortlet>
    );
  }
  private onRenderTable = () => {
    if (this.state.data.length === 0) {
      return (
        <TableRow>
          <TableCell align="center" colSpan={3} className="emptyRowLog">
            <NoContent></NoContent>
          </TableCell>
        </TableRow>
      );
    } else {
      return this.state.data?.map((n: Heatmap, index: any) => {
        return (
          <tr key={index}>
            <td style={{ width: "1%" }} align="center">
              {index + 1}
            </td>
            <td align="left">{n.title}</td>
            <td style={{ width: "8%" }} className={this.averageClass(n.category1, false)} align="center">
              {n.category1}
            </td>
            <td style={{ width: "8%" }} className={this.averageClass(n.category2, false)} align="center">
              {n.category2}
            </td>
            <td style={{ width: "8%" }} className={this.averageClass(n.category3, false)} align="center">
              {n.category3}
            </td>
            <td style={{ width: "8%" }} className={this.averageClass(n.category4, false)} align="center">
              {n.category4}
            </td>
            <td style={{ width: "8%" }} className={this.averageClass(n.category5, false)} align="center">
              {n.category5}
            </td>
            <td style={{ width: "8%" }} className={this.averageClass(n.category6, false)} align="center">
              {n.category6}
            </td>
            <td style={{ width: "8%" }} className={this.averageClass(n.category7, false)} align="center">
              {n.category7}
            </td>
            <td style={{ width: "8%" }} className={this.averageClass(n.category8, false)} align="center">
              {n.category8}
            </td>
            <td style={{ width: "12%" }} className={this.averageClass(n.totalAverage, true)} align="center">
              {n.totalAverage}
            </td>
          </tr>
        );
      });
    }
  };

  public averageClass = (category: number, isTotal: boolean) => {
    let avgClassName: string = "";
    if (isTotal) {
      if (category <= 2) {
        avgClassName = "average1 average-bold ";
      } else if (category > 2 && category <= 3) {
        avgClassName = "average2 average-bold ";
      } else if (category > 3 && category <= 4) {
        avgClassName = "average3 average-bold ";
      } else if (category > 4 && category <= 4.5) {
        avgClassName = "average4 average-bold ";
      } else if (category > 4.5 && category <= 5) {
        avgClassName = "average5 average-bold ";
      }
      return avgClassName;
    } else {
      if (category <= 2) {
        avgClassName = "averageBackground1 ";
      } else if (category > 2 && category <= 3) {
        avgClassName = "averageBackground2 ";
      } else if (category > 3 && category <= 4) {
        avgClassName = "averageBackground3 ";
      } else if (category > 4 && category <= 4.5) {
        avgClassName = "averageBackground4 ";
      } else if (category > 4.5 && category <= 5) {
        avgClassName = "averageBackground5 ";
      }
      return avgClassName;
    }
  };
}
