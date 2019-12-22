import { statistics } from "./../../entities/aggregate-report/statistics";
import ParticipationRate from "../../entities/aggregate-report/paticipation-rate";
import ComparisonCompetency from "../../entities/aggregate-report/comparison-competency";
import ComparisonQuestions from "../../entities/aggregate-report/comparison-questions";
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
  public static MockComparingQuestion: ComparisonQuestions = {
    top: [
      {
        rank: 1,
        statements: "Develops strong interpersonal relationships among the people whom he/she works with",
        competency: "Teamwork",
        averageRating: 4.64,
      },
      {
        rank: 2,
        statements:
          "Identifies current problems or issues, takes ownership of them, working on them until they are resolved.",
        competency: "Builder approach & Result oriented",
        averageRating: 4.43,
      },
      {
        rank: 3,
        statements:
          "Gives people an appropriate level of freedom and choice in deciding how to do their work and supports their decisions.",
        competency: "Managing & Developing People",
        averageRating: 4.43,
      },
      {
        rank: 4,
        statements: "Maintains focus on the goals in the face of obstacles and frustrations.",
        competency: "Builder approach & Result oriented",
        averageRating: 4.38,
      },
      {
        rank: 5,
        statements:
          "Utilize obtained data of internal and external customers to anticipate and satisfy their current and future needs",
        competency: "Customer Centric",
        averageRating: 4.36,
      },
    ],
    bottom: [
      {
        rank: 1,
        statements: "Paints the “big picture” of what we aspire to accomplish.",
        competency: "Inspire a Shared Vision",
        averageRating: 3.86,
      },
      {
        rank: 2,
        statements:
          "<b class=bold-text> Proactively </b> provides & seeks effective feedback about own and others performance and acts on it to improve & develop self & others.",
        competency: "Managing & Developing People",
        averageRating: 3.93,
      },
      {
        rank: 3,
        statements: "Talks about future trends that will influence how their work gets done.",
        competency: "Inspire a Shared Vision",
        averageRating: 4,
      },
      {
        rank: 4,
        statements:
          "Building a transparent and trustful environment by being open to the ideas of others and sharing relevant information with them",
        competency: "Teamwork",
        averageRating: 4.07,
      },
      {
        rank: 5,
        statements: "Seeks out challenging opportunities that test his/her skills and abilities",
        competency: "Drive for Excellence",
        averageRating: 4.07,
      },
    ],
  };
}
