import * as React from "react";
import ReportServices from "../../../services/report-services";
import Util from "../../../utilities/utilities";
import { DKPortlet } from "../../../core/components/portlet/portlet";
import { HorizontalBar } from "react-chartjs-2";
import ICategoryScore from "../../../entities/category-scores";
import { Grid } from "@material-ui/core";
import QuestionData from "../../../entities/category-score-questiondata";
import "chartjs-plugin-datalabels";
import { defaults } from "react-chartjs-2";

interface IProps {
  name?: string;
}
interface IState {
  itemId?: number;
  data: ICategoryScore;
  reportData: any;
  categoryid: number;
}
class CompetencyCategoryComponent extends React.Component<IProps, IState> {
  private ReportServices: ReportServices;
  private util: Util;
  public constructor(props: any) {
    super(props);
    defaults.global.defaultFontFamily = "IRANYekan,Poppins";
    this.ReportServices = new ReportServices();
    this.util = new Util();
    this.state = {
      itemId: 0,
      categoryid: 0,
      data: {
        Categories: [],
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
    const categoryid = Number(this.util.getQueryStringValue("categoryid"));
    const data: ICategoryScore = await this.ReportServices.getCompetencyCategory(itemId, categoryid);

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
        categoryid,
      };
    });
  }
  public render() {
    console.log(this.state.data.Categories);
    const options = {
      plugins: {
        datalabels: {
          display: true,
          align: "center",
          anchor: "end",
          color: "white",
          labels: {
            value: {
              color: "white",
            },
          },
        },
      },
      legend: {
        display: false,
      },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: false,
              stepSize: 1,
              min: 0,
              max: 5,
            },
          },
        ],
        xAxes: [
          {
            ticks: {
              beginAtZero: false,
              stepSize: 1,

              min: 0,
              max: 5,
            },
          },
        ],
      },
    };
    return (
      <div className="rtl">
        {/* <Grid container spacing={3}>
          <Grid item xs={1}>
             <img src={this.state.data.Categories[0].SignUrl}></img> 
            <span>{this.state.data.Categories[0].Title}</span>
          </Grid>
          <Grid item xs={1}></Grid>
          <Grid item xs={1}></Grid>
          <Grid item xs={1}></Grid>
          <Grid item xs={1}></Grid>
          <Grid item xs={1}></Grid>
          <Grid item xs={1}></Grid>
          <Grid item xs={1}></Grid>
        </Grid> */}
        <DKPortlet noborder={true} title={this.state.data.CategoryTitle}>
          <HorizontalBar height={60} options={options} data={this.state.reportData} />
        </DKPortlet>
        <Grid container spacing={3}>
          {this.onRenderQuestionScore()}
        </Grid>
      </div>
    );
  }
  /*********************************************************** */
  private onRenderQuestionScore = () => {
    const options = {
      plugins: {
        datalabels: {
          display: true,
          align: "center",
          anchor: "end",
          color: "white",
          labels: {
            value: {
              color: "white",
            },
          },
        },
      },
      legend: {
        display: false,
      },
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
              stepSize: 1,
              min: 0,
              max: 5,
            },
          },
        ],
      },
    };
    return this.state.data.QuestionsData.map((n: QuestionData, index: any) => {
      return (
        <Grid item xs={6} sm={6}>
          <DKPortlet noborder={true}>
            <span dangerouslySetInnerHTML={{ __html: n.QuestionTitle }}></span>
            <HorizontalBar height={80} options={options} data={n.QuestionChart} />
            <span>میانگین : {n.Average} </span>
          </DKPortlet>
        </Grid>
      );
    });
  };
}

export default CompetencyCategoryComponent;
