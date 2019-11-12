import React, { Component } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import ReportServices from "../../../services/report-services";
import Util from "../../../utilities/utilities";

class ResponsiveBulletClass extends Component {
  constructor(props) {
    super(props);
    this.afterChartCreated = this.afterChartCreated.bind(this);
    this.ReportServices = new ReportServices();
    this.util = new Util();
    this.state = {
      itemId: 0,
      reportData: {},
    };
  }
  async componentDidMount() {
    if (this.internalChart.series.length >= 2) {
      this.internalChart.series[0].type = "bar";
      this.internalChart.series[1].type = "bar";
      this.internalChart.series[2].data.forEach(element => {
        element.graphic.translate(10, 0);
      });
      this.internalChart.series[3].data.forEach(element => {
        element.graphic.translate(-10, 0);
      });
    }
    const itemId = Number(this.util.getQueryStringValue("itemId"));
    const reportData = await this.ReportServices.getCompetencySummary(itemId);
    this.setState(state => ({
      itemId,
      reportData,
    }));
  }
  render() {
    const itemId = this.state.itemId;
    console.log(this.state.reportData);
    const options = {
      xAxis: {
        categories: this.state.reportData.categories,
        labels: {
          events: {
            click: function() {
              console.log(this);
            },
          },
        },
      },
      plotOptions: {
        series: {
          cursor: "pointer",
          point: {
            events: {
              click: function() {
                //  alert("Category: " + this.category + ", value: " + this.options.query);
                // console.log(this);
                window.location.href = "?page=competency&itemid=" + itemId + "&categoryid=" + this.options.query + "";
              },
            },
          },
        },
      },

      series: this.state.reportData.series,
    };

    return (
      <div className="app">
        <HighchartsReact callback={this.afterChartCreated} highcharts={Highcharts} options={options} />
      </div>
    );
  }
  afterChartCreated(chart) {
    this.internalChart = chart;
    console.log(chart.xAxis.labelGroup);
  }
}

export default ResponsiveBulletClass;
