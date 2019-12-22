import * as React from "react";
import { Table, TableBody, TableRow, TableCell } from "@material-ui/core";

import AggregateServices from "../../../services/aggregate-service/aggregate-dashboard-service";
import ComparisonQuestions from "../../../entities/aggregate-report/comparison-questions";
import { DKSpinner } from "../../../core/components/spinner/spinner";
import { NoContent } from "../../nominationForm/components/no-content/no-content";
import QuestionDetail from "../../../entities/aggregate-report/question-detail";
import "./comparing-questions.css";

interface IProps {
  reportType: string;
  comparingType: string;
}
interface IState {
  data: ComparisonQuestions;
  isFetching: boolean;
}
export default class QuestionComparison extends React.Component<IProps, IState> {
  private AggregateServices: AggregateServices;
  public constructor(props: any) {
    super(props);
    this.AggregateServices = new AggregateServices();
    this.state = {
      isFetching: true,
      data: {
        top: [],
        bottom: [],
      },
    };
  }
  public async componentWillReceiveProps(nextProps: any) {
    if (this.props.reportType !== nextProps.reportType) {
      this.getData(nextProps.reportType);
    }
  }
  public async getData(props: string) {
    await this.AggregateServices.getComparisonQuestions(props).then(response =>
      this.setState(current => ({
        ...current,
        data: response,
        isFetching: false,
      })),
    );
  }

  public async componentDidMount() {
    this.getData(this.props.reportType);
  }
  public render() {
    return (
      <div>
        {this.state.isFetching === true && <DKSpinner></DKSpinner>}
        {this.state.isFetching === false && (
          <div className="mb-5">
            <h4 className="ltr">{this.props.comparingType === "top" ? "Strengths" : "improvement Areas"} </h4>
            <Table className="table table-bordered mt-3 ltr">
              <thead className="thead-dark">
                <tr>
                  <th>Rank </th>
                  <th>Statements </th>
                  <th> Competency</th>
                  <th> Average Rating</th>
                </tr>
              </thead>
              <TableBody>{this.onRenderTable()}</TableBody>
            </Table>
          </div>
        )}
      </div>
    );
  }
  private onRenderTable = () => {
    let Questions: QuestionDetail[] = [];

    if (this.props.comparingType === "top") {
      Questions = this.state.data.top;
    } else {
      Questions = this.state.data.bottom;
    }
    if (Questions.length === 0) {
      return (
        <TableRow>
          <TableCell align="center" colSpan={3} className="emptyRowLog">
            <NoContent></NoContent>
          </TableCell>
        </TableRow>
      );
    } else {
      return Questions?.map((n: QuestionDetail, index: any) => {
        return (
          <tr key={index}>
            <th className={this.props.comparingType === "top" ? "top" : "bottom"} align="center">
              {n.rank}
            </th>
            <th align="center">
              {" "}
              <span dangerouslySetInnerHTML={{ __html: n.statements }}></span>
            </th>
            <td align="center">{n.competency}</td>
            <td align="center">{n.averageRating}</td>
          </tr>
        );
      });
    }
  };
}
