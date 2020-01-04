import "chartjs-plugin-annotation";
import * as React from "react";
import { Bar } from "react-chartjs-2";
import { DKPortlet } from "../../../core/components/portlet/portlet";
import { DKSpinner } from "../../../core/components/spinner/spinner";
import AggregateServices from "../../../services/aggregate-service/aggregate-dashboard-service";
import { defaults } from "react-chartjs-2";

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
    if (JSON.stringify(nextProps) !== JSON.stringify(this.props)) {
      this.getData(nextProps);
    }
  }
  async getData(props) {
    console.log(props);
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
        averageValue: response.averageValue.toFixed(2),
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
    this.getData(this.props);
  }
  render() {
    defaults.global.defaultFontFamily = "Poppins";

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
            dataLebel: this.state.data.averageValue,
            label: {
              position: "right",
              enabled: true,
              content: `DK Average: ${this.state.data.averageValue}`,
              backgroundColor: "#ED145A",
            },
            borderColor: "#ED145A",
            borderWidth: 2,
          },
        ],
        drawTime: "afterDraw", // (default)
      },
    };
    return (
      <DKPortlet title="Competencies Average Rates Comparison">
        {this.state.isFetching === true && <DKSpinner></DKSpinner>}
        {this.state.isFetching === false && (
          <Bar height={150} type="bar" data={this.state.barChartData} options={options} />
        )}
      </DKPortlet>
    );
  }
}
