// import * as React from "react";
// import { DKPortlet } from "../../../core/components/portlet/portlet";
// import { Radar } from "react-chartjs-2";
// interface IProps {
//   name?: string;
// }
// const data = {
//   labels: ["Eating", "Drinking", "Sleeping", "Designing", "Coding", "Cycling", "Running"],
//   datasets: [
//     {
//       label: "My First dataset",
//       backgroundColor: "rgba(179,181,198,0.2)",
//       borderColor: "rgba(179,181,198,1)",
//       pointBackgroundColor: "rgba(179,181,198,1)",
//       pointBorderColor: "#fff",
//       pointHoverBackgroundColor: "#fff",
//       pointHoverBorderColor: "rgba(179,181,198,1)",
//       data: [65, 59, 90, 81, 56, 55, 40],
//     },
//     {
//       label: "My Second dataset",
//       backgroundColor: "rgba(255,99,132,0.2)",
//       borderColor: "rgba(255,99,132,1)",
//       pointBackgroundColor: "rgba(255,99,132,1)",
//       pointBorderColor: "#fff",
//       pointHoverBackgroundColor: "#fff",
//       pointHoverBorderColor: "rgba(255,99,132,1)",
//       data: [28, 48, 40, 19, 96, 27, 100],
//     },
//   ],
// };

// const DKValueRadarChart: React.SFC<IProps> = props => {
//   return (
//     <DKPortlet title="Comparing Chart">
//       <Radar height={140} data={data} />
//     </DKPortlet>
//   );
// };

// export default DKValueRadarChart;

import * as React from "react";
import ReportServices from "../../../services/report-services";
import Util from "../.././../utilities/utilities";
import { DKPortlet } from "../../../core/components/portlet/portlet";
import { Radar } from "react-chartjs-2";
import { defaults } from "react-chartjs-2";
interface IProps {
  name?: string;
}
interface IState {
  itemId?: number;
  data: any;
}
export default class ComparingChart extends React.Component<IProps, IState> {
  private ReportServices: ReportServices;
  public constructor(props: any) {
    super(props);
    defaults.global.defaultFontFamily = "IRANYekan,Poppins";
    this.ReportServices = new ReportServices();
    this.state = {
      itemId: 0,
      data: {
        averageValue: 0,
        labels: [],
        datasets: [],
      },
    };
  }
  public async componentDidMount() {
    const itemId = Number(Util.getQueryStringValue("itemId"));
    const reportData: any = await this.ReportServices.getComparingChartData(itemId);
    const dataset: any[] = reportData.datasets;
    const NewDataSet = dataset.map(
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
          data: data.slice(0, 4),
          drilldownData,
          hoverBackgroundColor,
          hoverBorderColor,
          items,
        };
      },
    );
    const data = {
      labels: reportData.labels.slice(0, 4),
      datasets: NewDataSet,
    };

    console.log(reportData);
    console.log(data);
    this.setState(prevState => {
      return {
        ...prevState,
        data,
        itemId,
      };
    });
  }
  public render() {
    const options = {
      scale: {
        reverse: false,
        ticks: {
          beginAtZero: false,
          min: 1,
          max: 5,
          stepSize: 1,
        },
        scaleLabel: { fontFamily: "IRANYekan" },
        labels: {
          // This more specific font property overrides the global property
          fontFamily: "IRANYekan",
        },
      },
      legend: {
        labels: {
          // This more specific font property overrides the global property
          fontFamily: "IRANYekan",
        },
        pointLabels: {
          fontFamily: "IRANYekan",
        },
      },
    };
    return (
      <DKPortlet title="امتیازات شما براساس ارزش های دیجی کالا">
        <Radar data={this.state.data} options={options} width={400} height={350}></Radar>
      </DKPortlet>
    );
  }
}
