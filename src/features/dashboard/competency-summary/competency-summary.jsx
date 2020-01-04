import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import KeyboardArrowDown from "@material-ui/icons/KeyboardArrowDown";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import React from "react";
import { DKPortlet } from "../../../core/components/portlet/portlet";
import { DKSpinner } from "../../../core/components/spinner/spinner";
import ReportServices from "../../../services/report-services";
import "./competency-summary.css";

class CompetencySummaryClass extends React.Component {
  constructor(props) {
    super(props);
    this.afterChartCreated = this.afterChartCreated.bind(this);
    this.ReportServices = new ReportServices();
    this.state = {
      isFetching: true,
      reportData: {},
      state: 0,
      yearID: "1397",
      year: "1397",
      years: [
        { key: "1396", text: "1396" },
        { key: "1397", text: "1397" },
      ],
      lang: "",
    };
  }
  async componentWillReceiveProps(nextProps) {
    this.getData(nextProps.itemId, nextProps.lang, true, this.state.year);
  }
  async getData(NominationId, lang, isFetching, year) {
    this.setState(state => ({
      isFetching,
    }));

    await this.ReportServices.getCompetencySummary(NominationId, year, lang).then(response =>
      this.setState(state => ({
        isFetching: false,
        reportData: response,
        itemId: NominationId,
        lang,
      })),
    );
  }
  async componentDidMount() {
    this.getData(this.props.itemId, this.props.lang, this.state.isFetching, this.state.year);
  }
  yearSelect() {
    return (
      <div style={{ display: "inline-flex", width: "150px" }}>
        <span className="kt-widget17__desc mt-2 w-100">انتخاب سال</span>
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
    );
  }

  render() {
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
      <DKPortlet
        headerToolbar={this.yearSelect()}
        title={this.props.lang === "fa" ? "شایستگی‌ها" : "Competency Summary"}
      >
        <div
          className={
            this.props.lang === "fa"
              ? "text-align-right alert alert-secondary"
              : "text-align-left alert alert-secondary"
          }
        >
          {this.props.lang === "fa"
            ? `	برای مشاهده جزییات هر شایستگی بر روی نمودار آن کلیک کنید. `
            : "By clicking on each competencies, you will see the details about it."}{" "}
        </div>
        {this.state.isFetching === true && <DKSpinner></DKSpinner>}
        {this.state.isFetching === false && (
          <HighchartsReact callback={this.afterChartCreated} highcharts={Highcharts} options={options} />
        )}
      </DKPortlet>
    );
  }
  afterChartCreated(chart) {
    this.internalChart = chart;
    if (this.state.isFetching === false && this.internalChart.series.length >= 2) {
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
          {item.text}
        </MenuItem>
      );
    });
  };
  /*************************************************** */
  handleChangeDropdown = async (name, event) => {
    const dropdownId = name + "ID";

    this.setState(state => ({
      year: event.nativeEvent.target.outerText,
      yearID: event.target.value,
    }));
    this.getData(this.state.itemId, this.state.lang, true, event.nativeEvent.target.outerText).then(
      this.afterChartCreated(this.internalChart),
    );
  };
}

export default CompetencySummaryClass;
