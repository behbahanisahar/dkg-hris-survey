import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import addTreemapModule from "highcharts/modules/treemap";
import React from "react";
import AggregateServices from "../../../../services/aggregate-service/aggregate-dashboard-service";
import { DKPortlet } from "../../../../core/components/portlet/portlet";

addTreemapModule(Highcharts);
class TotalLeaders extends React.Component {
  constructor(props) {
    super(props);

    this.AggregateServices = new AggregateServices();
    this.state = {
      isFetching: true,
      data: [],
    };
  }
  async componentWillReceiveProps(nextProps) {
    if (JSON.stringify(nextProps) !== JSON.stringify(this.props)) {
      this.getData(nextProps);
    }
  }

  async getData(props) {
    this.setState(current => ({
      ...current,
      isFetching: true,
    }));

    await this.AggregateServices.getNumberOfLeaders(props).then(response =>
      this.setState(prevState => {
        return {
          ...prevState,
          data: response,
          isFetching: false,
        };
      }),
    );
  }
  async componentDidMount() {
    this.getData(this.props);
  }
  render() {
    const options = {
      plotOptions: {
        treemap: {
          dataLabels: {
            formatter: function() {
              var key = this.key,
                point = this.point,
                value = point.value;

              // return value && point.parent ? key + ": " + value : key;
              return value && point.parent ? value : key;
            },
          },
        },
      },

      chart: {
        height: 400,
        style: {
          fontFamily: "IRANYekan,Poppins",
        },
        type: "line",

        dataLabels: {
          enabled: true,
        },
      },
      credits: {
        enabled: false,
      },

      title: {
        text: "",
      },
      series: [
        {
          type: "treemap",

          layoutAlgorithm: "stripes",
          alternateStartingDirection: true,
          levels: [
            {
              level: 1,
              layoutAlgorithm: "strip",
              dataLabels: {
                enabled: true,

                align: "left",
                verticalAlign: "top",
                style: {
                  fontSize: "15px",
                  fontWeight: "bold",
                  height: "200",
                },
              },
            },
          ],
          data: this.state.data,
        },
      ],
    };

    return (
      <DKPortlet title="# Assessed Leaders">
        <HighchartsReact style={{ height: "600px" }} highcharts={Highcharts} options={options} />
      </DKPortlet>
    );
  }
}

export default TotalLeaders;
