import { statistics } from "./../../entities/aggregate-report/statistics";
import ParticipationRate from "../../entities/aggregate-report/paticipation-rate";
export default class MockAggregateData {
  public static statisticMock: statistics = {
    completed: 123,
    uncompleted: 333,
    totalNominated: 3323,
  };
  public static MockParticipationRate: ParticipationRate[] = [
    {
      title: "CEO",
      rate: 52.2,
      isTotal: false,
    },
    {
      title: "CHRO",
      rate: 36.4,
      isTotal: false,
    },
    {
      title: "Total",
      rate: 44.3,
      isTotal: true,
    },
  ];
}
