import React, { Component } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import AggregateServices from "../../../services/aggregate-service/aggregate-dashboard-service";
import Util from "../../../utilities/utilities";
import { borderRight } from "@material-ui/system";
import { DKPortlet } from "../../../core/components/portlet/portlet";
import { DKSpinner } from "../../../core/components/spinner/spinner";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import KeyboardArrowDown from "@material-ui/icons/KeyboardArrowDown";

class CompetencyCompetency extends React.Component {
  constructor(props) {
    super(props);
    //  this.afterChartCreated = this.afterChartCreated.bind(this);

    this.AggregateServices = new AggregateServices();
    this.state = {
      isFetching: true,
      reportData: {},
    };
  }
  async componentWillReceiveProps(nextProps) {
    if (this.props.reportType !== nextProps.reportType) {
      this.getData(nextProps.reportType);
    }
  }
  async getData(props) {
    await this.AggregateServices.getComparisonCompetency(props).then(response =>
      this.setState(state => ({
        isFetching: false,
        reportData: response,
      })),
    );
  }
  async componentDidMount() {
    this.getData(this.props.reportType);
  }

  render() {
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
                //   window.location.href = "#/competency/" + itemId + "/" + this.options.query + "/" + lang;
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
      <DKPortlet title="Competencies Average Rates Comparison">
        <div className="dropdown mb-5" style={{ width: "15%" }}></div>

        <HighchartsReact callback={this.afterChartCreated} highcharts={Highcharts} options={options} />
      </DKPortlet>
    );
  }
}

export default CompetencyCompetency;
