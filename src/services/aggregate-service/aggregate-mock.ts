import { statistics } from "./../../entities/aggregate-report/statistics";
import ParticipationRate from "../../entities/aggregate-report/paticipation-rate";
import ComparisonCompetency from "../../entities/aggregate-report/comparison-competency";
import ComparisonQuestions from "../../entities/aggregate-report/comparison-questions";
import Heatmap from "./../../entities/aggregate-report/heatmap";
import RadarCoreValues from "../../entities/aggregate-report/core-calues-radar";
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
  public static MockHeat: Heatmap[] = [
    {
      title: "سالار صمدی مقدم",
      category1: 4.7,
      category2: 4.7,
      category3: 5,
      category4: 5,
      category5: 4.5,
      category6: 5,
      category7: 5,
      category8: 5,
      totalAverage: 4.8625,
    },
    {
      title: "هادی اوستان",
      category1: 4.7,
      category2: 4.7,
      category3: 4.7,
      category4: 5,
      category5: 5,
      category6: 4.7,
      category7: 4.3,
      category8: 5,
      totalAverage: 4.7625,
    },
    {
      title: "مجید رامک",
      category1: 5,
      category2: 4.3,
      category3: 5,
      category4: 4.7,
      category5: 5,
      category6: 5,
      category7: 4.3,
      category8: 4.3,
      totalAverage: 4.7,
    },
    {
      title: "روزبه کریمی کوهنجانی",
      category1: 4.6,
      category2: 4.4,
      category3: 4.7,
      category4: 4.6,
      category5: 4.6,
      category6: 4.7,
      category7: 4.5,
      category8: 4.6,
      totalAverage: 4.5875,
    },
    {
      title: "وحید دادخواه",
      category1: 5,
      category2: 4.8,
      category3: 4.8,
      category4: 4.8,
      category5: 3.9,
      category6: 4.7,
      category7: 4.2,
      category8: 4.2,
      totalAverage: 4.55,
    },
    {
      title: "حسین هاشمی",
      category1: 4.5,
      category2: 4.5,
      category3: 4.4,
      category4: 4.4,
      category5: 4.5,
      category6: 4.3,
      category7: 4.4,
      category8: 4.2,
      totalAverage: 4.4,
    },
    {
      title: "محمد نظری ندوشن",
      category1: 4.1,
      category2: 4.8,
      category3: 4.8,
      category4: 4.6,
      category5: 3.9,
      category6: 4.3,
      category7: 4.2,
      category8: 4.2,
      totalAverage: 4.3625,
    },
    {
      title: "روح الله رحمانی",
      category1: 4,
      category2: 4,
      category3: 5,
      category4: 4.3,
      category5: 4.5,
      category6: 4.3,
      category7: 4.3,
      category8: 4,
      totalAverage: 4.3,
    },
    {
      title: "مهیار عباس پور",
      category1: 4.3,
      category2: 4.2,
      category3: 4.5,
      category4: 4.3,
      category5: 3.8,
      category6: 3.8,
      category7: 4.3,
      category8: 4.5,
      totalAverage: 4.2125,
    },
    {
      title: "ساسان جلولی",
      category1: 4.3,
      category2: 4,
      category3: 4.7,
      category4: 4.7,
      category5: 3.8,
      category6: 3.7,
      category7: 4,
      category8: 4.3,
      totalAverage: 4.1875,
    },
    {
      title: "هادی محمدیان",
      category1: 4.1,
      category2: 4.2,
      category3: 4,
      category4: 3.7,
      category5: 4.5,
      category6: 4.3,
      category7: 4.6,
      category8: 4,
      totalAverage: 4.175,
    },
    {
      title: "ابوالفضل جعفرزاده پور",
      category1: 4.3,
      category2: 4.1,
      category3: 4.3,
      category4: 4.3,
      category5: 4.1,
      category6: 3.9,
      category7: 3.9,
      category8: 4,
      totalAverage: 4.1125,
    },
    {
      title: "فرامرز معینی نژاد یگانه",
      category1: 3.9,
      category2: 4.3,
      category3: 4.4,
      category4: 4.1,
      category5: 4.2,
      category6: 3.9,
      category7: 4.1,
      category8: 3.9,
      totalAverage: 4.1,
    },
    {
      title: "کیوان محیط مافی",
      category1: 3.7,
      category2: 4,
      category3: 4.2,
      category4: 4.2,
      category5: 4,
      category6: 4.3,
      category7: 3.9,
      category8: 4,
      totalAverage: 4.0375,
    },
    {
      title: "آرش شمس",
      category1: 3.6,
      category2: 4.3,
      category3: 4.1,
      category4: 4.6,
      category5: 4.1,
      category6: 3.8,
      category7: 3.9,
      category8: 3.8,
      totalAverage: 4.025,
    },
    {
      title: "سید بهزاد لاجوردی",
      category1: 3.9,
      category2: 4,
      category3: 4.1,
      category4: 3.8,
      category5: 3.8,
      category6: 4.2,
      category7: 4.2,
      category8: 4.1,
      totalAverage: 4.0125,
    },
    {
      title: "امیر صالحی طالقانی",
      category1: 4,
      category2: 3.8,
      category3: 3.9,
      category4: 4.1,
      category5: 4.2,
      category6: 4,
      category7: 4,
      category8: 4.1,
      totalAverage: 4.0125,
    },
    {
      title: "سهیل حاجی پور مقدم",
      category1: 4.1,
      category2: 4.1,
      category3: 4,
      category4: 3.8,
      category5: 4,
      category6: 4,
      category7: 4.2,
      category8: 3.6,
      totalAverage: 3.975,
    },
    {
      title: "مسعود آل علی",
      category1: 4.1,
      category2: 4.4,
      category3: 4.3,
      category4: 3.9,
      category5: 3.8,
      category6: 3.6,
      category7: 4,
      category8: 3.7,
      totalAverage: 3.975,
    },
    {
      title: "کیانوش کیقبادی",
      category1: 3.8,
      category2: 4,
      category3: 3.6,
      category4: 4,
      category5: 3.6,
      category6: 4.3,
      category7: 3.8,
      category8: 3.8,
      totalAverage: 3.8625,
    },
    {
      title: "ندا متقی گلشن",
      category1: 3.7,
      category2: 4.1,
      category3: 4,
      category4: 3.8,
      category5: 2.9,
      category6: 3.5,
      category7: 4.6,
      category8: 3.9,
      totalAverage: 3.8125,
    },
    {
      title: "الهام سادات حسینی",
      category1: 3.6,
      category2: 3.7,
      category3: 3.6,
      category4: 3.6,
      category5: 4.4,
      category6: 3.9,
      category7: 3.9,
      category8: 3.7,
      totalAverage: 3.8,
    },
    {
      title: "شادی جعفری موحد",
      category1: 4,
      category2: 3.9,
      category3: 3.9,
      category4: 3.5,
      category5: 3.4,
      category6: 3.7,
      category7: 3.7,
      category8: 3.9,
      totalAverage: 3.75,
    },
    {
      title: "علی محمد فروتن نژاد",
      category1: 3.1,
      category2: 4,
      category3: 4.1,
      category4: 4.5,
      category5: 3.2,
      category6: 3.1,
      category7: 4.3,
      category8: 3.4,
      totalAverage: 3.7125,
    },
    {
      title: "مهدی شایان",
      category1: 3.7,
      category2: 3.6,
      category3: 3.6,
      category4: 4,
      category5: 3.6,
      category6: 3.4,
      category7: 3.5,
      category8: 3.9,
      totalAverage: 3.6625,
    },
    {
      title: "وحید کلهر",
      category1: 3.7,
      category2: 5,
      category3: 5,
      category4: 3,
      category5: 2.2,
      category6: 1,
      category7: 5,
      category8: 4,
      totalAverage: 3.6125,
    },
    {
      title: "سعید طاوسی",
      category1: 2.5,
      category2: 3.3,
      category3: 3.1,
      category4: 4,
      category5: 3.4,
      category6: 3.1,
      category7: 3.9,
      category8: 3.1,
      totalAverage: 3.3,
    },
    {
      title: "کراسیمیر دیمیتروو ایوانوو",
      category1: 2.3,
      category2: 3.3,
      category3: 3,
      category4: 2.6,
      category5: 2.6,
      category6: 2.1,
      category7: 2.6,
      category8: 3.2,
      totalAverage: 2.7125,
    },
    {
      title: "سحر بهبهانی",
      category1: 0,
      category2: 0,
      category3: 0,
      category4: 0,
      category5: 0,
      category6: 0,
      category7: 0,
      category8: 0,
      totalAverage: 0,
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
}
