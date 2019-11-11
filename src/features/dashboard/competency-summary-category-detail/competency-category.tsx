import * as React from "react";
import ReportServices from "../../../services/report-services";
import Util from "../.././../utilities/utilities";

import { DKPortlet } from "../../../core/components/portlet/portlet";
import { HorizontalBar } from "react-chartjs-2";
import ICategoryScore from "../../../entities/category-scores";
import { Grid } from "@material-ui/core";
import QuestionData from "../../../entities/category-score-questiondata";
interface IProps {
  name?: string;
}
interface IState {
  itemId?: number;
  data: ICategoryScore;
  reportData: any;
}
class CompetencyCategory extends React.Component<IProps, IState> {
  private ReportServices: ReportServices;
  private util: Util;
  public constructor(props: any) {
    super(props);
    this.ReportServices = new ReportServices();
    this.util = new Util();
    this.state = {
      itemId: 0,
      data: {
        CategoryTitle: "",
        CategoryChart: {
          averageValue: 0,
          labels: [],
          datasets: [],
        },
        QuestionsData: [],
      },
      reportData: {},
    };
  }
  public async componentDidMount() {
    const itemId = Number(this.util.getQueryStringValue("itemId"));
    const data: ICategoryScore = await this.ReportServices.getCompetencyCategory(itemId, 1);
    // const data = {
    //   labels: reportData.labels,
    //   datasets: reportData.datasets,
    // };
    const reportData = {
      labels: data.CategoryChart.labels,
      datasets: data.CategoryChart.datasets,
    };
    this.setState(prevState => {
      return {
        ...prevState,
        data,
        itemId,
        reportData,
      };
    });
  }
  public render() {
    const options = {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: false,
              min: 0,
              max: 5,
            },
          },
        ],
        xAxes: [
          {
            ticks: {
              beginAtZero: false,
              min: 0,
              max: 5,
            },
          },
        ],
      },
    };
    return (
      <DKPortlet title={this.state.data.CategoryTitle}>
        <HorizontalBar options={options} data={this.state.reportData} />
        <div>{this.onRenderQuestionScore()}</div>
      </DKPortlet>
    );
  }
  /*********************************************************** */
  private onRenderQuestionScore = () => {
    return this.state.data.QuestionsData.map((n: QuestionData, index: any) => {
      return (
        <DKPortlet>
          <Grid item xs={12} sm={8}>
            {n.QuestionTitle}
            <HorizontalBar data={n.QuestionChart} />
          </Grid>
        </DKPortlet>
      );
    });
  };
}

export default CompetencyCategory;
