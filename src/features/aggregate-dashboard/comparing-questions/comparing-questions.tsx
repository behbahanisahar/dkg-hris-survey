import { Table, TableBody, TableCell, TableRow } from "@material-ui/core";
import * as React from "react";

import ComparisonQuestions from "../../../entities/aggregate-report/comparison-questions";
import QuestionDetail from "../../../entities/aggregate-report/question-detail";

import { NoContent } from "../../nominationForm/components/no-content/no-content";
import { AggregateReportProps } from "../aggregate-report-props";
import "./comparing-questions.css";

interface IProps {
  comparingType: string;
  data: ComparisonQuestions;
}

interface IState {}

export default class QuestionComparison extends React.Component<AggregateReportProps & IProps, IState> {
  public constructor(props: any) {
    super(props);
  }

  public async componentWillReceiveProps(nextProps: AggregateReportProps) {}

  public async componentDidMount() {}
  public render() {
    return (
      <>
        <Table className="table table-questions table-bordered">
          <thead className="dk-brand-grey">
            <tr>
              <th>Rank</th>
              <th>Statements</th>
              <th>Competency</th>
              <th>Average Rating</th>
            </tr>
          </thead>
          <TableBody>{this.onRenderTable()}</TableBody>
        </Table>
      </>
    );
  }
  private onRenderTable = () => {
    let Questions: QuestionDetail[] = [];

    if (this.props.comparingType === "top") {
      Questions = this.props.data.top;
    } else {
      Questions = this.props.data.bottom;
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
            <td className={this.props.comparingType === "top" ? "top" : "bottom"} align="center">
              {n.rank}
            </td>
            <td align="left">
              <span dangerouslySetInnerHTML={{ __html: n.statements }}></span>
            </td>
            <td align="center" style={{ width: "20%" }}>
              {n.competency}
            </td>
            <td align="center" style={{ width: "8%" }}>
              {n.averageRating}
            </td>
          </tr>
        );
      });
    }
  };
}
