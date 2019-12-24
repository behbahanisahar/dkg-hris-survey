import { Table, TableBody, TableCell, TableRow } from "@material-ui/core";
import * as React from "react";
import { DKSpinner } from "../../../core/components/spinner/spinner";
import ComparisonQuestions from "../../../entities/aggregate-report/comparison-questions";
import QuestionDetail from "../../../entities/aggregate-report/question-detail";
import AggregateServices from "../../../services/aggregate-service/aggregate-dashboard-service";
import { NoContent } from "../../nominationForm/components/no-content/no-content";
import { AggregateReportProps } from "../aggregate-report-props";
import "./comparing-questions.css";

interface IProps {
  comparingType: string;
}

interface IState {
  data: ComparisonQuestions;
  isFetching: boolean;
}

export default class QuestionComparison extends React.Component<AggregateReportProps & IProps, IState> {
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
    this.getData(nextProps.reportType);
  }
  public async getData(props: AggregateReportProps) {
    this.setState(current => ({
      ...current,
      isFetching: true,
    }));
    await this.AggregateServices.getComparisonQuestions(props).then(response =>
      this.setState(prevState => {
        return {
          ...prevState,

          data: response,
          isFetching: false,
        };
      }),
    );
  }

  public async componentDidMount() {
    this.getData(this.props);
  }
  public render() {
    return (
      <div>
        {this.state.isFetching === true && <DKSpinner></DKSpinner>}
        {this.state.isFetching === false && (
          <div className="mb-5">
            {/* <h4 className="ltr">{this.props.comparingType === "top" ? "Strengths" : "improvement Areas"} </h4> */}
            <Table className="table table-bordered mt-3 ltr">
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
