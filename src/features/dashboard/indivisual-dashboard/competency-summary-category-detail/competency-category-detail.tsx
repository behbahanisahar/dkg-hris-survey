import * as React from "react";
import ReportServices from "../../../../services/report-services";
import { DKPortlet } from "../../../../core/components/portlet/portlet";
import { HorizontalBar } from "react-chartjs-2";
import ICategoryScore from "../../../../entities/category-scores";
import { Grid } from "@material-ui/core";
import QuestionData from "../../../../entities/category-score-questiondata";
import "chartjs-plugin-datalabels";
import { defaults } from "react-chartjs-2";
import { Link } from "react-router-dom";
import "./competency-category-detail.css";
import { HeataMapLegend } from "../../aggregate-dashboard/heatmap/heatmap-legend";

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
        categories: [],
        categoryTitle: "",
        categoryChart: {
          averageValue: 0,
          labels: [],
          datasets: [],
        },
        questionsData: [],
      },
      reportData: {},
      isFetch: false,
      changeCategory: false,
    };
  }

  public async componentWillReceiveProps(nextProps: any) {
    document.getElementById("root")!.className = "";
    if (this.props.match.params.categoryId !== nextProps.match.params.categoryId) {
      this.getData(nextProps.match.params.categoryId);
    }
  }

  public async componentDidMount() {
    document.getElementById("root")!.className = "";
    this.getData(this.props.match.params.categoryId);
  }

  public async getData(categoryid: number) {
    const itemId = this.props.match.params.itemId;
    await this.ReportServices.getCompetencyCategory(itemId, categoryid, this.props.match.params.lang).then(
      (data: ICategoryScore) => {
        const reportData = {
          labels: data.categoryChart.labels,
          datasets: data.categoryChart.datasets,
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
      },
    );
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
      <div className={this.props.match.params.lang === "fa" ? "rtl" : "ltr"}>
        <div className="my-2 text-right">
          <button
            className="btn btn-sm btn-secondary mx-2"
            onClick={e => {
              this.onBackToPrev();
              e.preventDefault();
              return false;
            }}
          >
            بازگشت | Back
          </button>
        </div>
        {this.state.isFetch === true && (
          <div className="kt-section bg-white">
            <div className="kt-section__content kt-section__content--border kt-section__content--fit">
              <div className="kt-grid-nav kt-grid-nav--skin-light">
                <div className="kt-grid-nav__row">{this.OnRenderCategories()}</div>
              </div>
            </div>
          </div>
        )}
        <div className="legend">
          <HeataMapLegend />
        </div>

        <DKPortlet noborder={true} title={this.state.data.categoryTitle}>
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
    return this.state.data.questionsData.map((n: QuestionData, index: any) => {
      let avgClassName: string = "";
      if (n.average > 1 && n.average <= 2) {
        avgClassName = "average1";
      } else if (n.average > 2 && n.average <= 3) {
        avgClassName = "average2";
      } else if (n.average > 3 && n.average <= 4) {
        avgClassName = "average3";
      } else if (n.average > 4 && n.average <= 4.54) {
        avgClassName = "average4";
      } else if (n.average > 4.5 && n.average <= 5) {
        avgClassName = "average5";
      }
      return (
        <Grid item xs={6} sm={6}>
          <DKPortlet hasHeader={false} noborder={true}>
            <span style={{ fontWeight: 400 }} dangerouslySetInnerHTML={{ __html: n.questionTitle }}></span>
            <HorizontalBar height={80} options={options} data={n.questionChart} />
            <span
              className={
                this.props.match.params.lang === "fa"
                  ? avgClassName + " average-bold text-align-right"
                  : avgClassName + " average-bold text-align-left"
              }
            >
              {this.props.match.params.lang === "fa" ? " میانگین سایر ارزیابان :" : "Average:"} {n.average}{" "}
            </span>
          </DKPortlet>
        </Grid>
      );
    });
  };
  /***************************************************************** */
  private OnRenderCategories = () => {
    return this.state.data.categories.map((n: any, index: any) => {
      return (
        <Link
          className={
            this.props.match.params.categoryId === n.id ? "kt-grid-nav__item selected-category" : "kt-grid-nav__item"
          }
          to={"/competency/" + this.state.itemId + "/" + n.id + "/" + this.props.match.params.lang}
        >
          <span className="kt-grid-nav__icon">
            <img alt={n.title} style={{ maxWidth: "80px" }} src={n.signUrl}></img>
          </span>
          <span className="kt-grid-nav__title">
            <span style={{ textAlign: "center", fontWeight: 400 }}>{n.title}</span>
          </span>
          <span className="kt-grid-nav__desc">{n.titleEn}</span>
        </Link>
      );
    });
  };
}

export default CompetencyCategoryComponent;
