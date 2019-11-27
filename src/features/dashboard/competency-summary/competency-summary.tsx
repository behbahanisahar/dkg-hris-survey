import * as React from "react";
import ReportServices from "../../../services/report-services";
import Util from "../.././../utilities/utilities";
import { DKPortlet } from "../../../core/components/portlet/portlet";
import { HorizontalBar } from "react-chartjs-2";
import { DKSpinner } from "../../../core/components/spinner/spinner";
interface IProps {
  name?: string;
  itemId: number;
}
interface IState {
  isFetching: boolean;
  data: any;
}
class CompetencySummary extends React.Component<IProps, IState> {
  private ReportServices: ReportServices;
  public constructor(props: any) {
    super(props);
    this.ReportServices = new ReportServices();
    this.state = {
      isFetching: true,
      data: {
        averageValue: 0,
        labels: [],
        datasets: [],
      },
    };
  }
  public async componentDidMount() {
    const itemId = Number(Util.getQueryStringValue("itemId"));
    await this.ReportServices.getCompetencySummary(itemId, "1398", "IR").then(response => {
      const data = {
        labels: response.labels,
        datasets: response.datasets,
      };
      this.setState(current => ({
        ...current,
        data: data,
        isFetching: false,
      }));
    });
  }

  public render() {
    const options = {
      onClick: (e: any, item: any) => {},
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
        {this.state.isFetching === true && <DKSpinner></DKSpinner>}
        {this.state.isFetching === false && (
          <HorizontalBar options={options} width={400} height={350} data={this.state.data} />
        )}
      </DKPortlet>
    );
  }
}

export default CompetencySummary;
