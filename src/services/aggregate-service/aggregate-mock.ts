import { statistics } from "./../../entities/aggregate-report/statistics";
export default class MockAggregateData {
  public static statisticMock: statistics = {
    completed: 123,
    uncompleted: 333,
    totalNominated: 3323,
  };
}
