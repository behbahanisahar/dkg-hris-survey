import { Grid } from "@material-ui/core";
import React from "react";
import ComparisonQuestions from "../../../../entities/aggregate-report/comparison-questions";
import AggregateServices from "../../../../services/aggregate-service/aggregate-dashboard-service";
import { AggregateReportProps } from "../aggregate-report-props";
import "./comparing-questions.less";

import QuestionComparison from "./comparing-questions";
import { DKSpinner } from "../../../../core/components/spinner/spinner";
import { DKPortlet } from "../../../../core/components/portlet/portlet";

interface IProps {
  // comparingType: string;
}

interface IState {
  data: ComparisonQuestions;
  isFetching: boolean;
}

export default class MainQuestionComparison extends React.Component<AggregateReportProps & IProps, IState> {
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

  public async componentWillReceiveProps(nextProps: AggregateReportProps) {
    if (JSON.stringify(nextProps) !== JSON.stringify(this.props)) {
      this.getData(nextProps);
    }
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
      <>
        {this.state.isFetching === true && <DKSpinner></DKSpinner>}
        {this.state.isFetching === false && (
          <Grid container spacing={3} className="mt-4">
            <Grid item xs={6} sm={6}>
              <DKPortlet title="Top5 / Strengths">
                <QuestionComparison
                  viewAs={this.props.viewAs}
                  level={this.props.level}
                  subDepLevel={this.props.subDepLevel}
                  depLevel={this.props.depLevel}
                  comparingType="top"
                  data={this.state.data}
                />
              </DKPortlet>
            </Grid>
            <Grid item xs={6} sm={6}>
              <DKPortlet title="Bottom5 / Improvement Areas">
                <QuestionComparison
                  viewAs={this.props.viewAs}
                  subDepLevel={this.props.subDepLevel}
                  depLevel={this.props.depLevel}
                  level={this.props.level}
                  comparingType="bottom"
                  data={this.state.data}
                />
              </DKPortlet>
            </Grid>
          </Grid>
        )}
      </>
    );
  }
}
