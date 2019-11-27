import React, { Component } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import ReportServices from "../../../services/report-services";
import Util from "../../../utilities/utilities";
import { borderRight } from "@material-ui/system";
import "./competency-datail.css";
import { DKPortlet } from "../../../core/components/portlet/portlet";
import { DKSpinner } from "../../../core/components/spinner/spinner";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import KeyboardArrowDown from "@material-ui/icons/KeyboardArrowDown";

class ResponsiveBulletClass extends React.Component {
  constructor(props) {
    super(props);
    this.afterChartCreated = this.afterChartCreated.bind(this);
    this.ReportServices = new ReportServices();
    this.state = {
      isFetching: true,
      reportData: {},
      state: 0,
      yearID: "",
      year: "",
      years: [],
      lang: "",
    };
  }
  async componentWillReceiveProps(nextProps) {
    //  if (this.state.itemId !== nextProps.itemId) {
    this.getData(nextProps.itemId, nextProps.lang, true);
    //  }
  }
  async getData(NominationId, lang, isFetching) {
    this.setState(state => ({
      isFetching,
    }));
    const years = [
      { key: "1396", text: "1396" },
      { key: "1397", text: "1397" },
      { key: "1398", text: "1398" },
    ];
    await this.ReportServices.getCompetencySummary(NominationId, "1398", lang).then(response =>
      this.setState(state => ({
        isFetching: false,
        reportData: response,
        itemId: NominationId,
        years,
        lang,
      })),
    );
  }
  async componentDidMount() {
    this.getData(this.props.itemId, this.props.lang, this.state.isFetching);
  }
  render() {
    const colors = ["#3B86FF", "#77E5AA", "#093fb9", "#6d00f6", "#FF006E", "#FFBE0B", "#1EFFBC", "#ff8b12"];
    const itemId = this.props.itemId;
    const lang = this.props.lang;
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
                window.location.href = "#/competency/" + itemId + "/" + this.options.query + "/" + lang;
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
      <DKPortlet title={this.props.lang === "IR" ? "شایستگی‌ها" : "Competency Summary"}>
        <div className="dropdown mb-5" style={{ width: "15%" }}>
          <Select
            margin="dense"
            placeholder="انتخاب سال"
            value={this.state.yearID}
            fullWidth={true}
            onChange={event => this.handleChangeDropdown("year", event)}
            inputProps={{
              name: "year",
              id: "demo-controlled-open-select",
            }}
            IconComponent={KeyboardArrowDown}
            variant="outlined"
          >
            {this.renderDropDown(this.state.years)}
          </Select>
        </div>
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
  renderDropDown = items => {
    return items.map(item => {
      return (
        <MenuItem value={item.key} key={item.key}>
          {" "}
          {item.text}
        </MenuItem>
      );
    });
  };
  /*************************************************** */
  handleChangeDropdown = async (name, event) => {
    const dropdownId = name + "ID";
    debugger;
    this.setState(prevState => {
      return {
        ...prevState,
        year: event.nativeEvent.target.outerText,
        yearID: event.target.value,
      };
    });

    console.log("event", event.nativeEvent.target.outerText);
    console.log("after", this.state.year);

    await this.ReportServices.getCompetencySummary(
      this.state.itemId,
      event.nativeEvent.target.outerText,
      this.state.lang,
    ).then(response => {
      this.setState(prevState => {
        return {
          ...prevState,
          reportData: response,
        };
      });
      this.afterChartCreated(this.internalChart);
    });
  };
}

export default ResponsiveBulletClass;