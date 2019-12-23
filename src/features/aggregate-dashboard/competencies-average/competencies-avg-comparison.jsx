import "chartjs-plugin-annotation";
import * as React from "react";
import { Bar } from "react-chartjs-2";
import { DKPortlet } from "../../../core/components/portlet/portlet";
import { DKSpinner } from "../../../core/components/spinner/spinner";
import AggregateServices from "../../../services/aggregate-service/aggregate-dashboard-service";

export default class CompetencyAvgComparison extends React.Component {
  constructor(props) {
    super(props);
    this.AggregateServices = new AggregateServices();
    this.state = {
      isFetching: true,
      data: {
        averageValue: 0,
        labels: [],
        datasets: [],
      },
      barChartData: {},
    };
  }
  async componentWillReceiveProps(nextProps) {
    if (this.props.reportType !== nextProps.reportType) {
      this.getData(nextProps.reportType);
    }
  }
  async getData(props) {
    this.setState(current => ({
      ...current,
      isFetching: true,
    }));
    await this.AggregateServices.getAverageCompetency(props).then(response => {
      const newDataSet = response.datasets.map(
        ({
          backgroundColor,
          borderColor,
          borderWidth,
          data,
          drilldownData,
          hoverBackgroundColor,
          hoverBorderColor,
          items,
          label,
        }) => {
          return {
            label,
            backgroundColor,
            borderColor,
            borderWidth,
            data: data,
            drilldownData,
            hoverBackgroundColor,
            hoverBorderColor,
            items,
          };
        },
      );

      const data = {
        labels: response.labels,
        datasets: newDataSet,
        averageValue: response.averageValue,
      };
      const barChartData = {
        labels: response.labels,
        datasets: newDataSet,
      };
      this.setState(prevState => {
        return {
          ...prevState,
          data,
          isFetching: false,
          barChartData,
        };
      });
    });
  }
  async componentDidMount() {
    this.getData(this.props.reportType);
  }
  render() {
    var data = {
      labels: ["2010", "2011", "2012", "2013", "2014", "2015", "2016"],
      datasets: [
        {
          label: "My Second dataset",
          fillColor: "rgba(0,191,255,0.5)",
          strokeColor: "rgba(0,191,255,0.8)",
          highlightFill: "rgba(100,149,237,0.75)",
          highlightStroke: "rgba(100,149,237,1)",
          data: [60, 50, 40, 30, 20, 10, 20],
          borderColor: "grey",
          borderWidth: 1,
        },
      ],
    };

    var options = {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: false,
              stepSize: 0.5,
              min: 1,
              max: 5,
            },
          },
        ],
        xAxes: [
          {
            ticks: {
              beginAtZero: false,
              stepSize: 0.5,

              min: 1,
              max: 5,
            },
          },
        ],
      },

      legend: {
        display: false,
      },
      annotation: {
        annotations: [
          {
            type: "line",
            mode: "horizontal",
            scaleID: "y-axis-0",
            value: this.state.data.averageValue,
            borderColor: "#ED145A",
            borderWidth: 3,
          },
        ],
        drawTime: "afterDraw", // (default)
      },
    };
    return (
      <div className="ltr">
        <DKPortlet title="Competencies Average Rates Comparison">
          {this.state.isFetching === true && <DKSpinner></DKSpinner>}
          {this.state.isFetching === false && <Bar type="bar" data={this.state.barChartData} options={options} />}
        </DKPortlet>
      </div>
    );
  }
}
