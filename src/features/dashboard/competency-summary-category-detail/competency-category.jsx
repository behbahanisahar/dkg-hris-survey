import React, { Component } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import ReportServices from "../../../services/report-services";
import Util from "../../../utilities/utilities";
import { borderRight } from "@material-ui/system";
import "./competency-datail.css";
import { DKPortlet } from "../../../core/components/portlet/portlet";
import { DKSpinner } from "../../../core/components/spinner/spinner";

class ResponsiveBulletClass extends React.Component {
  constructor(props) {
    super(props);
    this.afterChartCreated = this.afterChartCreated.bind(this);
    this.ReportServices = new ReportServices();
    this.state = {
      isFetching: true,
      reportData: {},
    };
  }

  async componentDidMount() {
    await this.ReportServices.getCompetencySummary(this.props.itemId).then(response =>
      this.setState(state => ({
        isFetching: false,
        reportData: response,
      })),
    );
  }
  async componentDidUpdate() {}
  render() {
    const colors = ["#3B86FF", "#77E5AA", "#093fb9", "#6d00f6", "#FF006E", "#FFBE0B", "#1EFFBC", "#ff8b12"];
    const itemId = this.props.itemId;
    const options = {
      legend: {
        align: "center",
        rtl: true,
      },
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
        text: "",
        style: {
          textAlign: "right",
          float: "right",
        },
      },
      xAxis: {
        ticks: {
          beginAtZero: false,
        },
        categories: this.state.reportData.categories,

        labels: {
          events: {
            click: function() {},
          },
        },
      },
      yAxis: {
        labels: {
          align: "right",
        },
        max: 5,
        stackLabels: {
          enabled: true,
          textAlign: "right",
        },
        tickInterval: 1,
        ticks: {
          beginAtZero: false,
        },
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
              enabled: false,
              lineWidth: 0,
            },
          },
          point: {
            events: {
              click: function() {
                window.location.href = "#/competency/" + itemId + "/" + this.options.query;
              },
            },
          },
        },
      },
      credits: {
        enabled: false,
      },
      series: this.state.reportData.series,
    };

    return (
      <DKPortlet title="شایستگی‌ها">
        {this.state.isFetching === true && <DKSpinner></DKSpinner>}
        {this.state.isFetching === false && (
          <HighchartsReact callback={this.afterChartCreated} highcharts={Highcharts} options={options} />
        )}
      </DKPortlet>
    );
  }
  afterChartCreated(chart) {
    console.log("this.state.isFetching", this.state.isFetching);

    this.internalChart = chart;
    if (this.state.isFetching == false && this.internalChart.series.length >= 2) {
      this.internalChart.series[2].data.forEach(element => {
        element.graphic.translate(6, 0);
      });
      this.internalChart.series[3].data.forEach(element => {
        element.graphic.translate(-6, 0);
      });
    }
  }
}

export default ResponsiveBulletClass;
