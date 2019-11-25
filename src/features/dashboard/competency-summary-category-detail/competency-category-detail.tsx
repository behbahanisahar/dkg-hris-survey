import * as React from "react";
import ReportServices from "../../../services/report-services";
import { DKPortlet } from "../../../core/components/portlet/portlet";
import { HorizontalBar } from "react-chartjs-2";
import ICategoryScore from "../../../entities/category-scores";
import { Grid } from "@material-ui/core";
import QuestionData from "../../../entities/category-score-questiondata";
import "chartjs-plugin-datalabels";
import { defaults } from "react-chartjs-2";
import { Link } from "react-router-dom";
import "./competency-summary-detail.css";

interface IProps {
  name?: string;
  match?: any;
}
interface IState {
  itemId?: number;
  data: ICategoryScore;
  reportData: any;
  categoryid: number;
  isFetch: boolean;
  changeCategory: boolean;
}
class CompetencyCategoryComponent extends React.Component<IProps, IState> {
  private ReportServices: ReportServices;
  public constructor(props: any) {
    super(props);
    defaults.global.defaultFontFamily = "IRANYekan,Poppins";
    this.ReportServices = new ReportServices();
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
      isFetch: false,
      changeCategory: false,
    };
  }

  public async componentWillReceiveProps(nextProps: any) {
    if (this.props.match.params.categoryId !== nextProps.match.params.categoryId) {
      console.log("changed");
      console.log(this.props.match.params.categoryId);
      console.log(nextProps.match.params.categoryId);

      this.getData(nextProps.match.params.categoryId);
    }
  }

  public async componentDidMount() {
    console.log(this.props.match);
    this.getData(this.props.match.params.categoryId);
  }

  public async getData(categoryid: number) {
    const itemId = this.props.match.params.itemId;
    // const categoryid = this.props.match.params.categoryId;
    await this.ReportServices.getCompetencyCategory(itemId, categoryid).then((data: ICategoryScore) => {
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
          isFetch: true,
        };
      });
    });
  }
  public render() {
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
        <button
          className="btn btn-secondary mx-2"
          style={{ float: "left" }}
          onClick={e => {
            this.onBackToPrev();
            e.preventDefault();
            return false;
          }}
        >
          بازگشت | Back
        </button>
        {this.state.isFetch === true && (
          <div>
            <Grid style={{ marginRight: "10%", width: "80%" }} container spacing={2}>
              {this.OnRenderCategories()}
            </Grid>
          </div>
        )}
        <DKPortlet noborder={true} title={this.state.data.CategoryTitle}>
          <HorizontalBar height={40} options={options} data={this.state.reportData} />
        </DKPortlet>
        <Grid container spacing={3}>
          {this.onRenderQuestionScore()}
        </Grid>
      </div>
    );
  }
  private onBackToPrev() {
    window.location.href = "#/dashboard/" + this.state.itemId;
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
      let avgClassName: string = "";
      if (n.Average < 2) {
        avgClassName = "average1";
      } else if (n.Average > 1 && n.Average <= 2.5) {
        avgClassName = "average2";
      } else if (n.Average > 2.5 && n.Average <= 3.5) {
        avgClassName = "average3";
      } else if (n.Average > 3.5 && n.Average <= 4.5) {
        avgClassName = "average4";
      } else if (n.Average > 4.5 && n.Average <= 5) {
        avgClassName = "average5";
      }
      return (
        <Grid item xs={6} sm={6}>
          <DKPortlet hasHeader={false} noborder={true}>
            <span style={{ fontWeight: 400 }} dangerouslySetInnerHTML={{ __html: n.QuestionTitle }}></span>
            <HorizontalBar height={80} options={options} data={n.QuestionChart} />
            <span className={avgClassName + " average-bold"}>میانگین : {n.Average} </span>
          </DKPortlet>
        </Grid>
      );
    });
  };
  /***************************************************************** */
  private OnRenderCategories = () => {
    return this.state.data.Categories.map((n: any, index: any) => {
      return (
        <Grid item xs={1} className="mr-5">
          <Link to={"/competency/" + this.state.itemId + "/" + n.Id}>
            <img style={{ width: "100%" }} src={n.SignUrl}></img>
          </Link>
          <Link to={"/competency/" + this.state.itemId + "/" + n.Id}>
            <span style={{ textAlign: "center", fontWeight: 400 }}>{n.Title}</span>
          </Link>
        </Grid>
      );
    });
  };
}

export default CompetencyCategoryComponent;
