import * as React from "react";
import ReportServices from "../../../services/report-services";
import Util from "../.././../utilities/utilities";

import { DKPortlet } from "../../../core/components/portlet/portlet";
import { HorizontalBar } from "react-chartjs-2";
interface IProps {
  name?: string;
}
interface IState {
  itemId?: number;
  data: any;
}
class CompetencySummary extends React.Component<IProps, IState> {
  private ReportServices: ReportServices;
  public constructor(props: any) {
    super(props);
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
    const reportData: any = await this.ReportServices.getCompetencySummary(itemId);
    const data = {
      labels: reportData.labels,
      datasets: reportData.datasets,
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
      onClick: (e: any, item: any) => {
        console.log(e);
        console.log(item);
      },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: false,
              min: 0,
              max: 5,
            },
          },
        ],
        xAxes: [
          {
            ticks: {
              beginAtZero: false,
              min: 0,
              max: 5,
            },
          },
        ],
      },
    };
    return (
      <DKPortlet title="شایستگی ها">
        <HorizontalBar options={options} width={400} height={350} data={this.state.data} />
      </DKPortlet>
    );
  }
}

export default CompetencySummary;
