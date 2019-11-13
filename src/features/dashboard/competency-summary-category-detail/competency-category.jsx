import React, { Component } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import ReportServices from "../../../services/report-services";
import Util from "../../../utilities/utilities";
import { borderRight } from "@material-ui/system";
import "./competency-datail.css";

class ResponsiveBulletClass extends Component {
  constructor(props) {
    super(props);
    this.afterChartCreated = this.afterChartCreated.bind(this);
    this.ReportServices = new ReportServices();
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
      console.log(this.internalChart);
      // this.internalChart.setOptions({
      //   chart: {
      //     style: {
      //       fontFamily: "IRANYekan",
      //     },
      //   },
      // });
    }
    const itemId = Number(Util.getQueryStringValue("itemId"));
    const reportData = await this.ReportServices.getCompetencySummary(itemId);
    this.setState(state => ({
      itemId,
      reportData,
    }));
  }
  render() {
    const colors = ["#3B86FF", "#77E5AA", "#093fb9", "#6d00f6", "#FF006E", "#FFBE0B", "#1EFFBC", "#ff8b12"];
    const itemId = this.state.itemId;
    // console.log(this.state.reportData);
    const options = {
      tooltip: {
        useHTML: true,
        style: {
          textAlign: "right",
        },
      },
      chart: {
        style: {
          fontFamily: "IRANYekan,Poppins",
        },
      },
      title: {
        text: "شایستگی ها",
        style: {
          textAlign: "right",
          float: "right",
        },
      },
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
      yAxis: {
        title: {
          enabled: true,
          text: "",
          style: {
            fontWeight: "normal",
          },
        },
      },
      plotOptions: {
        column: {
          color: "red",
        },
        series: {
          cursor: "pointer",
          states: {
            hover: {
              lineWidth: 0,
            },
          },
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
    console.log(chart);
  }
}

export default ResponsiveBulletClass;
