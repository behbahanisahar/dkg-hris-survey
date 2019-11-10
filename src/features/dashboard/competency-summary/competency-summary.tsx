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
  private util: Util;
  public constructor(props: any) {
    super(props);
    this.ReportServices = new ReportServices();
    this.util = new Util();
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
    const itemId = Number(this.util.getQueryStringValue("itemId"));
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
    return (
      <DKPortlet title="شایستگی ها">
        <HorizontalBar data={this.state.data} />
      </DKPortlet>
    );
  }
}

export default CompetencySummary;
