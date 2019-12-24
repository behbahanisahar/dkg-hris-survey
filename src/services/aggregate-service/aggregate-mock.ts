import { statistics } from "./../../entities/aggregate-report/statistics";
import ParticipationRate from "../../entities/aggregate-report/paticipation-rate";
import ComparisonCompetency from "../../entities/aggregate-report/comparison-competency";
import ComparisonQuestions from "../../entities/aggregate-report/comparison-questions";
import Heatmap from "./../../entities/aggregate-report/heatmap";
import RadarCoreValues from "../../entities/aggregate-report/core-calues-radar";
import AverageCompetency from "./../../entities/aggregate-report/average-competency";
import DashboardInfo from "../../entities/aggregate-report/dashboard-info";
export default class MockAggregateData {
  public static statisticMock: statistics = {
    completed: 213,
    uncompleted: 41,
    totalNominated: 254,
    participationRate: 50,
    overallImprovement: 10,
    total98Score: 3.8,
    total97Score: 3.5,
    numberOfAsseses: 300,
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
  public static MockHeat: Heatmap[] = [
    {
      nominationId: 486,
      title: "Saeid Mohammadi",
      category1: 4.5,
      category2: 4.59,
      category3: 4.46,
      category4: 4.44,
      category5: 3.96,
      category6: 4.64,
      category7: 4.57,
      category8: 4.43,
      numberOfAssessors: 17,
      totalAverage: 4.45,
      improvement: 0,
    },
    {
      nominationId: 486,
      title: "Saeid Mohammadi",
      category1: 4.5,
      category2: 4.59,
      category3: 4.46,
      category4: 4.44,
      category5: 3.96,
      category6: 4.64,
      category7: 4.57,
      category8: 4.43,
      numberOfAssessors: 17,
      totalAverage: 4.45,
      improvement: 0,
    },
    {
      nominationId: 486,
      title: "Saeid Mohammadi",
      category1: 4.5,
      category2: 4.59,
      category3: 4.46,
      category4: 4.44,
      category5: 3.96,
      category6: 4.64,
      category7: 4.57,
      category8: 4.43,
      numberOfAssessors: 17,
      totalAverage: 4.45,
      improvement: 0,
    },
    {
      nominationId: 486,
      title: "Saeid Mohammadi",
      category1: 4.5,
      category2: 4.59,
      category3: 4.46,
      category4: 4.44,
      category5: 3.96,
      category6: 4.64,
      category7: 4.57,
      category8: 4.43,
      numberOfAssessors: 17,
      totalAverage: 4.45,
      improvement: 0,
    },

    {
      nominationId: 486,
      title: "Saeid Mohammadi",
      category1: 4.5,
      category2: 4.59,
      category3: 4.46,
      category4: 4.44,
      category5: 3.96,
      category6: 4.64,
      category7: 4.57,
      category8: 4.43,
      numberOfAssessors: 17,
      totalAverage: 4.45,
      improvement: 0,
    },
    {
      nominationId: 486,
      title: "Saeid Mohammadi",
      category1: 4.5,
      category2: 4.59,
      category3: 4.46,
      category4: 4.44,
      category5: 3.96,
      category6: 4.64,
      category7: 4.57,
      category8: 4.43,
      numberOfAssessors: 17,
      totalAverage: 4.45,
      improvement: 0,
    },
    {
      nominationId: 486,
      title: "Saeid Mohammadi",
      category1: 4.5,
      category2: 4.59,
      category3: 4.46,
      category4: 4.44,
      category5: 3.96,
      category6: 4.64,
      category7: 4.57,
      category8: 4.43,
      numberOfAssessors: 17,
      totalAverage: 4.45,
      improvement: 0,
    },
    {
      nominationId: 486,
      title: "Saeid Mohammadi",
      category1: 4.5,
      category2: 4.59,
      category3: 4.46,
      category4: 4.44,
      category5: 3.96,
      category6: 4.64,
      category7: 4.57,
      category8: 4.43,
      numberOfAssessors: 17,
      totalAverage: 4.45,
      improvement: 0,
    },
    {
      nominationId: 486,
      title: "Saeid Mohammadi",
      category1: 4.5,
      category2: 4.59,
      category3: 4.46,
      category4: 4.44,
      category5: 3.96,
      category6: 4.64,
      category7: 4.57,
      category8: 4.43,
      numberOfAssessors: 17,
      totalAverage: 4.45,
      improvement: 0,
    },
    {
      nominationId: 486,
      title: "Saeid Mohammadi",
      category1: 4.5,
      category2: 4.59,
      category3: 4.46,
      category4: 4.44,
      category5: 3.96,
      category6: 4.64,
      category7: 4.57,
      category8: 4.43,
      numberOfAssessors: 17,
      totalAverage: 4.45,
      improvement: 0,
    },
    {
      nominationId: 486,
      title: "Saeid Mohammadi",
      category1: 4.5,
      category2: 4.59,
      category3: 4.46,
      category4: 4.44,
      category5: 3.96,
      category6: 4.64,
      category7: 4.57,
      category8: 4.43,
      numberOfAssessors: 17,
      totalAverage: 4.45,
      improvement: 0,
    },
    {
      nominationId: 486,
      title: "Saeid Mohammadi",
      category1: 4.5,
      category2: 4.59,
      category3: 4.46,
      category4: 4.44,
      category5: 3.96,
      category6: 4.64,
      category7: 4.57,
      category8: 4.43,
      numberOfAssessors: 17,
      totalAverage: 4.45,
      improvement: 0,
    },
    {
      nominationId: 486,
      title: "Saeid Mohammadi",
      category1: 4.5,
      category2: 4.59,
      category3: 4.46,
      category4: 4.44,
      category5: 3.96,
      category6: 4.64,
      category7: 4.57,
      category8: 4.43,
      numberOfAssessors: 17,
      totalAverage: 4.45,
      improvement: 0,
    },
    {
      nominationId: 486,
      title: "Saeid Mohammadi",
      category1: 4.5,
      category2: 4.59,
      category3: 4.46,
      category4: 4.44,
      category5: 3.96,
      category6: 4.64,
      category7: 4.57,
      category8: 4.43,
      numberOfAssessors: 17,
      totalAverage: 4.45,
      improvement: 0,
    },
    {
      nominationId: 486,
      title: "Saeid Mohammadi",
      category1: 4.5,
      category2: 4.59,
      category3: 4.46,
      category4: 4.44,
      category5: 3.96,
      category6: 4.64,
      category7: 4.57,
      category8: 4.43,
      numberOfAssessors: 17,
      totalAverage: 4.45,
      improvement: 0,
    },
    {
      nominationId: 486,
      title: "Saeid Mohammadi",
      category1: 4.5,
      category2: 4.59,
      category3: 4.46,
      category4: 4.44,
      category5: 3.96,
      category6: 4.64,
      category7: 4.57,
      category8: 4.43,
      numberOfAssessors: 17,
      totalAverage: 4.45,
      improvement: 0,
    },
    {
      nominationId: 486,
      title: "Saeid Mohammadi",
      category1: 4.5,
      category2: 4.59,
      category3: 4.46,
      category4: 4.44,
      category5: 3.96,
      category6: 4.64,
      category7: 4.57,
      category8: 4.43,
      numberOfAssessors: 17,
      totalAverage: 4.45,
      improvement: 0,
    },
    {
      nominationId: 486,
      title: "Saeid Mohammadi",
      category1: 4.5,
      category2: 4.59,
      category3: 4.46,
      category4: 4.44,
      category5: 3.96,
      category6: 4.64,
      category7: 4.57,
      category8: 4.43,
      numberOfAssessors: 17,
      totalAverage: 4.45,
      improvement: 0,
    },
    {
      nominationId: 486,
      title: "Saeid Mohammadi",
      category1: 4.5,
      category2: 4.59,
      category3: 4.46,
      category4: 4.44,
      category5: 3.96,
      category6: 4.64,
      category7: 4.57,
      category8: 4.43,
      numberOfAssessors: 17,
      totalAverage: 4.45,
      improvement: 0,
    },
    {
      nominationId: 486,
      title: "Saeid Mohammadi",
      category1: 4.5,
      category2: 4.59,
      category3: 4.46,
      category4: 4.44,
      category5: 3.96,
      category6: 4.64,
      category7: 4.57,
      category8: 4.43,
      numberOfAssessors: 17,
      totalAverage: 4.45,
      improvement: 0,
    },
    {
      nominationId: 486,
      title: "Saeid Mohammadi",
      category1: 4.5,
      category2: 4.59,
      category3: 4.46,
      category4: 4.44,
      category5: 3.96,
      category6: 4.64,
      category7: 4.57,
      category8: 4.43,
      numberOfAssessors: 17,
      totalAverage: 4.45,
      improvement: 0,
    },
    {
      nominationId: 486,
      title: "Saeid Mohammadi",
      category1: 4.5,
      category2: 4.59,
      category3: 4.46,
      category4: 4.44,
      category5: 3.96,
      category6: 4.64,
      category7: 4.57,
      category8: 4.43,
      numberOfAssessors: 17,
      totalAverage: 4.45,
      improvement: 0,
    },
    {
      nominationId: 485,
      title: "Hamid Mohammadi",
      category1: 4.08,
      category2: 4.58,
      category3: 4.36,
      category4: 4.59,
      category5: 3.68,
      category6: 4.48,
      category7: 4.73,
      category8: 4.2,
      numberOfAssessors: 17,
      totalAverage: 4.34,
      improvement: 0,
    },
    {
      nominationId: 428,
      title: "Kaveh Ehsani",
      category1: 4.13,
      category2: 4.28,
      category3: 4.48,
      category4: 4.28,
      category5: 3.97,
      category6: 4.3,
      category7: 4.33,
      category8: 4.38,
      numberOfAssessors: 22,
      totalAverage: 4.27,
      improvement: 0,
    },
    {
      nominationId: 647,
      title: "Alessandro Duri",
      category1: 3.96,
      category2: 4.13,
      category3: 4.29,
      category4: 4.33,
      category5: 3.93,
      category6: 4.21,
      category7: 4.44,
      category8: 4.2,
      numberOfAssessors: 28,
      totalAverage: 4.19,
      improvement: 0,
    },
    {
      nominationId: 453,
      title: "Mohsen Mokremi",
      category1: 4.21,
      category2: 4.12,
      category3: 4.28,
      category4: 4.01,
      category5: 4.15,
      category6: 3.93,
      category7: 4,
      category8: 3.99,
      numberOfAssessors: 27,
      totalAverage: 4.09,
      improvement: 0,
    },
    {
      nominationId: 552,
      title: "Hooman Amini",
      category1: 3.64,
      category2: 4.12,
      category3: 4.19,
      category4: 4.15,
      category5: 3.15,
      category6: 4.32,
      category7: 4.63,
      category8: 3.74,
      numberOfAssessors: 14,
      totalAverage: 3.99,
      improvement: 0,
    },
    {
      nominationId: 383,
      title: "Manfred Meyer",
      category1: 3.58,
      category2: 4.06,
      category3: 4.26,
      category4: 4.03,
      category5: 3.31,
      category6: 4.03,
      category7: 4.01,
      category8: 3.87,
      numberOfAssessors: 28,
      totalAverage: 3.89,
      improvement: 0,
    },
    {
      nominationId: 357,
      title: "Javad Najafi",
      category1: 3.55,
      category2: 3.87,
      category3: 4.07,
      category4: 3.81,
      category5: 3.55,
      category6: 3.85,
      category7: 4.23,
      category8: 3.82,
      numberOfAssessors: 22,
      totalAverage: 3.84,
      improvement: 0,
    },
    {
      nominationId: 419,
      title: "Soheil Haji Moughadam",
      category1: 3.75,
      category2: 4.04,
      category3: 3.94,
      category4: 3.62,
      category5: 3.74,
      category6: 3.75,
      category7: 3.97,
      category8: 3.67,
      numberOfAssessors: 24,
      totalAverage: 3.81,
      improvement: 0,
    },
    {
      nominationId: 488,
      title: "Majid Ghasemi",
      category1: 3.41,
      category2: 3.92,
      category3: 3.89,
      category4: 3.81,
      category5: 3.11,
      category6: 3.72,
      category7: 4.22,
      category8: 3.33,
      numberOfAssessors: 20,
      totalAverage: 3.68,
      improvement: 0,
    },
    {
      nominationId: 360,
      title: "Amir Pashazanous",
      category1: 3.77,
      category2: 3.66,
      category3: 3.36,
      category4: 3.76,
      category5: 3.16,
      category6: 3.58,
      category7: 3.75,
      category8: 3.41,
      numberOfAssessors: 28,
      totalAverage: 3.56,
      improvement: 0,
    },
  ];

  public static MockRadarCoreValues: RadarCoreValues = {
    averageValue: 0,
    labels: [
      "Teamwork",
      "Customer Centric",
      "Builder approach & Result oriented",
      "Drive for Excellence",
      "Managing & Developing People",
      "Inspire a Shared Vision",
      "Business Acumen",
      "Decision Making",
    ],
    datasets: [
      {
        borderDash: [0, 0],
        fill: false,
        lineTension: 0,
        label: "Self",
        drilldownData: "",
        backgroundColor: [
          "rgba(25, 191, 211, 0)",
          "rgba(25, 191, 211, 0)",
          "rgba(25, 191, 211, 0)",
          "rgba(25, 191, 211, 0)",
          "rgba(25, 191, 211, 0)",
          "rgba(25, 191, 211, 0)",
          "rgba(25, 191, 211, 0)",
          "rgba(25, 191, 211, 0)",
        ],
        borderColor: "rgba(25, 191, 211, 1)",
        hoverBackgroundColor: [
          "rgba(25, 191, 211, 0.4)",
          "rgba(25, 191, 211, 0.4)",
          "rgba(25, 191, 211, 0.4)",
          "rgba(25, 191, 211, 0.4)",
          "rgba(25, 191, 211, 0.4)",
          "rgba(25, 191, 211, 0.4)",
          "rgba(25, 191, 211, 0.4)",
          "rgba(25, 191, 211, 0.4)",
        ],
        hoverBorderColor: "rgba(25, 191, 211, 1)",
        borderWidth: 3,
        data: [4.3, 4.3, 4, 3.7, 3.8, 4.3, 3.7, 4.3],
      },
      {
        borderDash: [0, 0],
        fill: false,
        lineTension: 0,
        label: "Raters",
        drilldownData: "",
        backgroundColor: [
          "rgba(239, 57, 78, 0)",
          "rgba(239, 57, 78, 0)",
          "rgba(239, 57, 78, 0)",
          "rgba(239, 57, 78, 0)",
          "rgba(239, 57, 78, 0)",
          "rgba(239, 57, 78, 0)",
          "rgba(239, 57, 78, 0)",
          "rgba(239, 57, 78, 0)",
        ],
        borderColor: "rgba(239, 57, 78, 1)",
        hoverBackgroundColor: [
          "rgba(239, 57, 78, 0.4)",
          "rgba(239, 57, 78, 0.4)",
          "rgba(239, 57, 78, 0.4)",
          "rgba(239, 57, 78, 0.4)",
          "rgba(239, 57, 78, 0.4)",
          "rgba(239, 57, 78, 0.4)",
          "rgba(239, 57, 78, 0.4)",
          "rgba(239, 57, 78, 0.4)",
        ],
        hoverBorderColor: "rgba(239, 57, 78, 1)",
        borderWidth: 3,
        data: [4.3, 4.3, 4.4, 4.2, 4.2, 4, 4.3, 4.1],
      },
    ],
  };
  public static MockAvgCompetency: AverageCompetency = {
    averageValue: 3.86,
    labels: ["CCO", "CTO", "COO", "CMO", "CEO", "CHRO", "CFO", "Fidibo", "Digipay"],
    datasets: [
      {
        borderDash: [0, 0],
        fill: false,
        lineTension: 0,
        label: "Self",
        drilldownData: "",
        backgroundColor: [
          "rgba(25, 191, 211, 0)",
          "rgba(25, 191, 211, 0)",
          "rgba(25, 191, 211, 0)",
          "rgba(25, 191, 211, 0)",
          "rgba(25, 191, 211, 0)",
          "rgba(25, 191, 211, 0)",
          "rgba(25, 191, 211, 0)",
          "rgba(25, 191, 211, 0)",
          "rgba(25, 191, 211, 0)",
          "rgba(25, 191, 211, 0)",
        ],
        borderColor: "rgba(25, 191, 211, 1)",
        hoverBackgroundColor: [
          "rgba(25, 191, 211, 0.4)",
          "rgba(25, 191, 211, 0.4)",
          "rgba(25, 191, 211, 0.4)",
          "rgba(25, 191, 211, 0.4)",
          "rgba(25, 191, 211, 0.4)",
          "rgba(25, 191, 211, 0.4)",
          "rgba(25, 191, 211, 0.4)",
          "rgba(25, 191, 211, 0.4)",
          "rgba(25, 191, 211, 0.4)",
          "rgba(25, 191, 211, 0.4)",
        ],
        hoverBorderColor: "rgba(25, 191, 211, 1)",
        borderWidth: 3,
        data: [
          3.92472820441798,
          3.96054929353866,
          3.94308995389729,
          3.78152598812799,
          4.24252651880424,
          3.80172146401985,
          3.78072044647387,
          3.53255528255528,
          3.61262683201804,
          4.72,
        ],
      },
    ],
  };

  public static MockDashboardInfo: DashboardInfo = {
    dropdownValues: [
      {
        key: "Clevel",
        text: "Clevel",
      },
      {
        key: "All",
        text: "All",
      },
      {
        key: "CCO",
        text: "CCO",
      },
      {
        key: "CEO",
        text: "CEO",
      },
      {
        key: "CFO",
        text: "CFO",
      },
      {
        key: "CHRO",
        text: "CHRO",
      },
      {
        key: "CMO",
        text: "CMO",
      },
      {
        key: "COO",
        text: "COO",
      },
      {
        key: "CTO",
        text: "CTO",
      },
      {
        key: "Fidibo",
        text: "Fidibo",
      },
      {
        key: "DigiPay",
        text: "DigiPay",
      },
    ],
    userClevel: "CEO",
  };
}
