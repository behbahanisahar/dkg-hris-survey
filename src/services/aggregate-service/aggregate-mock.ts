import { statistics } from "./../../entities/aggregate-report/statistics";
import ParticipationRate from "../../entities/aggregate-report/paticipation-rate";
import ComparisonCompetency from "../../entities/aggregate-report/comparison-competency";
export default class MockAggregateData {
  public static statisticMock: statistics = {
    completed: 24,
    uncompleted: 32,
    totalNominated: 56,
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
  public static MockComparisonCompetency: ComparisonCompetency = {
    categories: [
      "Teamwork",
      "Customer Centric",
      "Builder approach & Result oriented",
      "Drive for Excellence",
      "Managing & Developing People",
      "Inspire a Shared Vision",
      "Business Acumen",
      "Decision Making",
    ],
    series: [
      {
        type: "bar",
        name: "Self",
        color: "#19BFD3",
        data: [
          {
            y: 4.3,
            query: "1",
          },
          {
            y: 4.3,
            query: "2",
          },
          {
            y: 4,
            query: "3",
          },
          {
            y: 3.7,
            query: "4",
          },
          {
            y: 3.8,
            query: "5",
          },
          {
            y: 4.3,
            query: "6",
          },
          {
            y: 3.7,
            query: "7",
          },
          {
            y: 4.3,
            query: "8",
          },
        ],
        lineWidth: 3,
      },
      {
        type: "bar",
        name: "Raters",
        color: "#EF394E",
        data: [
          {
            y: 4.3,
            query: "1",
          },
          {
            y: 4.3,
            query: "2",
          },
          {
            y: 4.4,
            query: "3",
          },
          {
            y: 4.2,
            query: "4",
          },
          {
            y: 4.2,
            query: "5",
          },
          {
            y: 4,
            query: "6",
          },
          {
            y: 4.3,
            query: "7",
          },
          {
            y: 4.1,
            query: "8",
          },
        ],
        lineWidth: 3,
      },
    ],
  };
}
