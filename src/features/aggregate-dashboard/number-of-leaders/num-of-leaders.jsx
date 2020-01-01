import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import addTreemapModule from "highcharts/modules/treemap";
import React from "react";
import AggregateServices from "../../../services/aggregate-service/aggregate-dashboard-service";
import { DKPortlet } from "../../../core/components/portlet/portlet";

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
    console.log(this.state.data);
    const options = {
      plotOptions: {
        treemap: {
          dataLabels: {
            formatter: function() {
              var key = this.key,
                point = this.point,
                value = point.value;

              return value && point.parent ? key + ": " + value : key;
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
          // [
          //   {
          //     id: "COO",
          //     name: "COO",
          //     color: "rgb(239, 57, 78,0.8)",
          //   },
          //   {
          //     id: "CFO",
          //     name: "CFO",
          //     color: "rgb(236,0,140,0.8)",
          //   },
          //   {
          //     id: "CHRO",
          //     name: "CHRO",
          //     color: "rgb(111,44,145,0.8)",
          //   },
          //   {
          //     id: "CTO",
          //     name: "CTO",
          //     color: "rgb(0,131,202,0.8)",
          //   },
          //   {
          //     id: "CCO",
          //     name: "CCO",
          //     color: "rgb(251,173,24,0.8)",
          //   },
          //   {
          //     id: "CMO",
          //     name: "CMO",
          //     color: "rgb(0, 169, 152,0.8)",
          //   },
          //   {
          //     id: "CEO",
          //     name: "CEO",
          //     color: "rgb(0, 171, 190,0.8)",
          //   },
          //   {
          //     id: "Fidibo",
          //     name: "FIdibo",
          //     color: "rgb(240, 83, 45,0.8)",
          //   },
          //   {
          //     id: "DigiPay",
          //     name: "DigiPay",
          //     color: "rgb(28, 77, 161,0.8)",
          //   },
          //   {
          //     name: "CS",
          //     parent: "COO",
          //     value: 9,
          //   },
          //   {
          //     name: "Full",
          //     parent: "COO",
          //     value: 9,
          //   },
          //   {
          //     name: "Log",
          //     parent: "COO",
          //     value: 6,
          //   },
          //   {
          //     name: "Content",
          //     parent: "COO",
          //     value: 15,
          //   },
          //   {
          //     name: "Legal",
          //     parent: "CFO",
          //     value: 1,
          //   },
          //   {
          //     name: "Pro",
          //     parent: "CFO",
          //     value: 4,
          //   },
          //   {
          //     name: "Fin",
          //     parent: "CFO",
          //     value: 6,
          //   },
          //   {
          //     name: "Fac",
          //     parent: "CHRO",
          //     value: 1,
          //   },
          //   {
          //     name: "Sec",
          //     parent: "CHRO",
          //     value: 1,
          //   },
          //   {
          //     name: "HSE",
          //     parent: "CHRO",
          //     value: 1,
          //   },
          //   {
          //     name: "HR",
          //     parent: "CHRO",
          //     value: 8,
          //   },
          //   {
          //     name: "Tech",
          //     parent: "CTO",
          //     value: 36,
          //   },
          //   {
          //     name: "Com",
          //     parent: "CCO",
          //     value: 39,
          //   },
          //   {
          //     name: "Mar",
          //     parent: "CMO",
          //     value: 15,
          //   },
          //   {
          //     name: "CXQA",
          //     parent: "CEO",
          //     value: 3,
          //   },
          //   {
          //     name: "Dir",
          //     parent: "CEO",
          //     value: 1,
          //   },
          //   {
          //     name: "Fidibo",
          //     parent: "Fidibo",
          //     value: 3,
          //   },
          //   {
          //     name: "DigiPay",
          //     parent: "DigiPay",
          //     value: 9,
          //   },
          // ],
        },
      ],
    };

    return (
      <DKPortlet title="Number of Leaders">
        <HighchartsReact style={{ height: "600px" }} highcharts={Highcharts} options={options} />
      </DKPortlet>
    );
  }
}

export default TotalLeaders;
