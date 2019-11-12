import React, { Component } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

class ResponsiveBulletClass extends Component {
  constructor(props) {
    super(props);
    this.afterChartCreated = this.afterChartCreated.bind(this);
  }
  componentDidMount() {
    this.internalChart.series[2].data.forEach(element => {
      element.graphic.translate(10, 0);
    });
    this.internalChart.series[3].data.forEach(element => {
      element.graphic.translate(-10, 0);
    });
  }
  render() {
    const options = {
      title: {
        text: "Combination chart",
      },
      xAxis: {
        categories: ["Apples", "Oranges", "Pears", "Bananas", "Plums"],
      },
      labels: {
        items: [
          {
            html: "Total fruit consumption",
            style: {
              left: "50px",
              top: "18px",
              color:
                // theme
                (Highcharts.defaultOptions.title.style && Highcharts.defaultOptions.title.style.color) || "black",
            },
          },
        ],
      },
      series: [
        {
          type: "bar",
          name: "Jane",
          data: [3, 2, 1, 3, 4],
        },
        {
          type: "bar",
          name: "John",
          data: [2, 3, 5, 7, 6],
        },
        {
          type: "spline",
          name: "Average",
          data: [1, 8.67, 3, 5.33, 1.33],
          lineWidth: 0,
          marker: {
            lineWidth: 2,
            lineColor: Highcharts.getOptions().colors[3],
            fillColor: "white",
          },
        },
        {
          type: "spline",
          name: "Average",
          data: [3, 2.67, 3, 6.33, 3.33],
          lineWidth: 0,
          marker: {
            lineWidth: 2,
            lineColor: Highcharts.getOptions().colors[3],
            fillColor: "white",
          },
        },
      ],
    };

    return (
      <div className="app">
        <HighchartsReact callback={this.afterChartCreated} highcharts={Highcharts} options={options} />
      </div>
    );
  }
  afterChartCreated(chart) {
    this.internalChart = chart;
  }
}

export default ResponsiveBulletClass;
