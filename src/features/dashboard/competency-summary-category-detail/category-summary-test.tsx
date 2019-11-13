import * as React from "react";

import { DKPortlet } from "../../../core/components/portlet/portlet";
import { HorizontalBar } from "react-chartjs-2";
import ICategoryScore from "../../../entities/category-scores";
import { Grid } from "@material-ui/core";
import QuestionData from "../../../entities/category-score-questiondata";
import "chartjs-plugin-datalabels";
import { defaults } from "react-chartjs-2";

interface IProps {
  data: ICategoryScore;
  categoryid: number;
  itemId: number;
  reportData: any;
}
interface IState {
  itemId?: number;
  data: ICategoryScore;
  reportData: any;
  categoryid: number;
}
class CompetencyCategoryComponent extends React.Component<IProps, IState> {
  public constructor(props: any) {
    super(props);
    defaults.global.defaultFontFamily = "IRANYekan,Poppins";
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
    this.setState(prevState => {
      return {
        ...prevState,
        data: this.props.data,
        itemId: this.props.itemId,
        reportData: this.props.reportData,
        categoryid: this.props.categoryid,
      };
    });
  }
  public render() {
    console.log(this.props);
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
        <DKPortlet noborder={true} title={this.props.data.CategoryTitle}>
          <HorizontalBar height={60} options={options} data={this.props.reportData} />
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
  /***************************************************************** */
}

export default CompetencyCategoryComponent;
