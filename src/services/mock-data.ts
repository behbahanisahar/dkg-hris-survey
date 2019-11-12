import NominationData from "../entities/nomination";
import IHistory from "../entities/history";
import Isurvey from "../entities/survey";
import { IAppraisee } from "../entities/appraisee";
import UserTasks from "../entities/user-task";
import ReportStructure from "../entities/reportData";
import ICategoryScore from "../entities/category-scores";

export default class MockData {
  public static getUserInfo: any[] = [
    {
      Department: "HR",
      EmailAddress: "ali.nooshabadi@digikala.com",
      SPLatinFullName: "ali nooshabadi",
      label: "Morteza Faraji Farshd",
      value: "200",
      ReportedPost: "developer",
    },
    {
      Department: "HR",
      EmailAddress: "saharbehbahanii@digikala.com",
      SPLatinFullName: "sahar behbahani",
      label: "Morteza Faraji Farshd",
      value: "126",
      ReportedPost: "manager",
    },
    {
      Department: "HR",
      EmailAddress: "Morteza.eslami@digikala.com",
      SPLatinFullName: "Morteza eslami",
      label: "heilia alizadeh",
      value: "128",
      ReportedPost: "tester",
    },
    {
      Department: "HR",
      EmailAddress: "ali.ahmadi@digikala.com",
      SPLatinFullName: "ali ahmadi",
      label: "ali nooshabadi",
      value: "201",
      ReportedPost: "manager",
    },
    {
      Department: "HR",
      EmailAddress: "pouyan.feizian@digikala.com",
      SPLatinFullName: "pooyan feizian",
      label: "sahar behbahani",
      value: "129",
      ReportedPost: "administrator",
    },
  ];
  public static NominationData: NominationData = {
    Status: "notstarted",
    statusCode: 200,
    Subordinates: [
      {
        AvatarUrl: "/PublishingImages/760674.png",
        Id: 0,
        ItemId: 22,
        SPLatinFullName: "test1",
        ReportedPost: "administrator",
      },
      {
        AvatarUrl: "/PublishingImages/760674.png",
        Id: 0,
        ItemId: 175,
        SPLatinFullName: "test2",
        ReportedPost: "administrator",
      },
    ],
    Peer: [
      {
        AvatarUrl: "/PublishingImages/760674.png",
        Id: 0,
        ItemId: 50,
        SPLatinFullName: "test3",
        ReportedPost: "administrator",
      },
      {
        AvatarUrl: "/PublishingImages/760674.png",
        Id: 0,
        ItemId: 56,
        SPLatinFullName: "test4",
        ReportedPost: "administrator",
      },
    ],
    Other: [
      {
        AvatarUrl: "/PublishingImages/760674.png",
        Id: 0,
        ItemId: 60,
        SPLatinFullName: "sahar5",
        ReportedPost: "administrator",
      },
      {
        AvatarUrl: "/PublishingImages/760674.png",
        Id: 0,
        ItemId: 70,
        SPLatinFullName: "ali2",
        ReportedPost: "administrator",
      },
    ],
    User: {
      AvatarUrl: "/PublishingImages/760674.png",
      Id: 0,
      ItemId: 10,
      SPLatinFullName: "Abdolhossin Mohammbgnhnad Hashemi",
      Department: "HR",
      EmailAddress: "sa.behbahani@digikala.com",
      JobGrade: "specialist",
      Title: "سحر بهبهانی",
      ReportedPost: "developer",
    },

    LineManager: {
      AvatarUrl: "/PublishingImages/760674.png",
      Id: 0,
      ItemId: 14,
      SPLatinFullName: "Abdolhossin Mohvfvfammad Hashemi",
      Department: "HR",
      EmailAddress: "sa.behbahani@digikala.com",
      JobGrade: "specialist",
      Title: "علی نوش آبادی",
      ReportedPost: "developer",
    },
  };
  public static NominationHistory: IHistory[] = [
    {
      Field: "Other",

      Changes: [
        {
          Added: [" Shahbazi"],
          Deleted: [""],
          Id: 20,
          ModifiedBy: "Ali Nooshabadi",
          ModifiedDate: "/Date(1569016495000-0000)/",
          ModifiedDateShamsi: "1398/06/30 02:24",
        },
      ],
    },
    {
      Field: "Subordinate",
      Changes: [
        {
          Added: ["gholami"],
          Deleted: ["nooshabadi"],
          Id: 22,
          ModifiedBy: "sahar behbahani",
          ModifiedDate: "/Date(1569016495000-0000)/",
          ModifiedDateShamsi: "1398/06/31 02:24",
        },
      ],
    },
  ];

  public static SurveyFormData: Isurvey = {
    User: {
      AvatarUrl: "/PublishingImages/760674.png",
      Id: 0,
      ItemId: 10,
      SPLatinFullName: "Abdolhossin Mohammbgnhnad Hashemi",
      Department: "HR",
      EmailAddress: "sa.behbahani@digikala.com",
      JobGrade: "specialist",
      Title: "سحر بهبهانی",
      ReportedPost: "developer",
    },
    ShouldBeStarted: "",
    ShouldBeContinued: "",
    ShouldBeStopped: "",
    SurveyAnswerId: 0,
    statusCode: 200,
    Categories: [
      {
        Title: "Builder Approach & Result Oriented",
        BaseCategory: "Core Values",
        BaseCategoryId: 2,
        BaseCategoryFa: "کتگوری ۱",
        TitleFa: "مشتری محوری",
        SignUrl: "",
        Questions: [
          {
            ItemId: 1,
            Question:
              "Focusing self and others on providing a prompt, professional and timely service to enhance customer experience",
            QuestionFa:
              "بر ارائه خدمات به صورت سریع، حرفه ای و به موقع در راستای ایجاد بهترین تجربه برای مشتریان، توجه دارد و دیگران را نیز در این راستا تشویق می کند.",
            Field: "Question1",
            Category: "",
            Value: 5,
            QuestionNumber: "1",
          },
          {
            ItemId: 3,
            Question: "ss",
            QuestionFa: "ss",
            Field: "Question2",
            Category: "",
            Value: 2,
            QuestionNumber: "2",
          },
        ],
      },

      {
        Title: "Builder Approach & Result Oriented",
        BaseCategory: "Leadership Competencies",
        BaseCategoryId: 2,
        BaseCategoryFa: "کتگوری ۲",
        TitleFa: "نتیجه گرایی",
        SignUrl: "",
        Questions: [
          {
            ItemId: 2,
            Question:
              "Focusing self and others on providing a prompt, professional and timely service to enhance customer experience",
            QuestionFa:
              "بر ارائه خدمات به صورت سریع، حرفه ای و به موقع در راستای ایجاد بهترین تجربه برای مشتریان، توجه دارد و دیگران را نیز در این راستا تشویق می کند.",
            Field: "Question3",
            Category: "",
            Value: 2,
            QuestionNumber: "3",
          },
          {
            ItemId: 4,
            Question: "ss",
            QuestionFa: "ss",
            Field: "Question4",
            Category: "",
            Value: 7,
            QuestionNumber: "4",
          },
        ],
      },
    ],
  };

  public static Appraisee: IAppraisee[] = [
    {
      NominationItemId: 2,
      Relation: "Peer",
      Status: { Status: "NotStarted", Progress: 40 },
      User: {},
      HasCoworker: false,
    },
    {
      NominationItemId: 4,
      Relation: "Line Manager",
      Status: { Status: "NotStarted", Progress: 40 },
      User: {},
      HasCoworker: false,
    },
    {
      NominationItemId: 5,
      Relation: "Self",
      Status: { Status: "NotStarted", Progress: 40 },
      User: {},
      HasCoworker: false,
    },
  ];
  public static NominationTaks: UserTasks[] = [
    {
      ItemId: 2,
      Status: "",
      Title: "",
      User: {},
    },
  ];
  /*********************************reports mock data**************************************************** */
  public static getRaters: any[] = [
    {
      RaterGroup: "Self",
      NominatedCount: 1,
      CompletedCount: 1,
      IsTotal: false,
    },
    {
      RaterGroup: "Line Manager",
      NominatedCount: 1,
      CompletedCount: 0,
      IsTotal: false,
    },
    {
      RaterGroup: "Peer",
      NominatedCount: 0,
      CompletedCount: 0,
      IsTotal: false,
    },
    {
      RaterGroup: "Direct Report",
      NominatedCount: 0,
      CompletedCount: 0,
      IsTotal: false,
    },
    {
      RaterGroup: "Others",
      NominatedCount: 1,
      CompletedCount: 0,
      IsTotal: false,
    },
    {
      RaterGroup: "Total",
      NominatedCount: 3,
      CompletedCount: 1,
      IsTotal: true,
    },
  ];

  public static competencySummary: ReportStructure = {
    averageValue: 0,
    labels: [
      "کار گروهـــــــــی",
      "مشتری محوری",
      "نتیــــــــــــجه گرایی",
      "اشتیاق برای تعـــــــــالی",
      "مدیریت و توسعه افراد",
      "ایجاد و توسعه چشم انداز مشترک",
      "شم تجــــــــــــاری",
      "تصمیـــــم گیری",
    ],
    datasets: [
      {
        label: "خود فرد",
        drilldownData: "",
        backgroundColor: ["rgba(239, 57, 78, 0.2)"],
        borderColor: "rgba(239, 57, 78, 1)",
        hoverBackgroundColor: "rgba(239, 57, 78, 0.4)",
        hoverBorderColor: "rgba(239, 57, 78, 1)",
        borderWidth: 1,
        data: [0, 0, 0, 0, 0, 0, 0, 0],
        items: "",
      },
      {
        label: "سایر ارزیابان",
        drilldownData: "",
        backgroundColor: ["rgba(25, 191, 211, 0.2)"],
        borderColor: "rgba(25, 191, 211, 1)",
        hoverBackgroundColor: "rgba(25, 191, 211, 0.4)",
        hoverBorderColor: "rgba(25, 191, 211, 1)",
        borderWidth: 1,
        data: [0, 0, 0, 0, 0, 0, 0, 0],
        items: "",
      },
    ],
  };

  public static CompareCompetency: ReportStructure = {
    averageValue: 0,
    labels: [
      "کار گروهی",
      "مشتری محوری",
      "نتیجه گرایی",
      "اشتیاق برای تعالی",
      "مدیریت و توسعه افراد",
      "ایجاد و توسعه چشم انداز مشترک",
      "شم تجاری",
      "تصمیم گیری",
    ],
    datasets: [
      {
        label: "امتیاز دیجی‌کالا",
        drilldownData: "",
        backgroundColor: ["rgba(239, 57, 78, 0.2)"],
        borderColor: "rgba(239, 57, 78, 1)",
        hoverBackgroundColor: "rgba(239, 57, 78, 0.4)",
        hoverBorderColor: "rgba(239, 57, 78, 1)",
        borderWidth: 1,
        data: [3, 4.25, 3, 3.28571428571429, 2.5, 4, 3.66666666666667, 2],
        items: "",
      },
      {
        label: "امتیاز شما",
        drilldownData: "",
        backgroundColor: ["rgba(25, 191, 211, 0.2)"],
        borderColor: "rgba(25, 191, 211, 1)",
        hoverBackgroundColor: "rgba(25, 191, 211, 0.4)",
        hoverBorderColor: "rgba(25, 191, 211, 1)",
        borderWidth: 1,
        data: [3, 4.25, 3, 3.28571428571429, 2.5, 4, 3.66666666666667, 2],
        items: "",
      },
    ],
  };

  public static CompetencyCategories: ICategoryScore = {
    CategoryTitle: "کار گروهـــــــــی",
    CategoryChart: {
      averageValue: 0,
      labels: ["خودفرد", "مدیر مستقیم", "همکار همرده", "همکار", "سایرین"],
      datasets: [
        {
          borderDash: [0],
          fill: false,
          lineTension: 0,
          label: "",
          drilldownData: "",
          backgroundColor: [""],
          borderColor: "",
          hoverBackgroundColor: "",
          hoverBorderColor: "",
          borderWidth: 0,
          data: [4],
          items: "",
        },
      ],
    },
    QuestionsData: [
      {
        QuestionTitle: "در ﺑﯿﻦ ﻫﻤﮑﺎران راﺑﻄﻪ ﺑﯿﻦb ﻓﺮدي ﻗﻮي اﯾﺠﺎد ﮐﺮده و ﺑﻪ ﺗﻮﺳﻌﻪ رواﺑﻂ/b ﮐﻤﮏ ﻣﯽ ﮐﻨﺪ.",
        Average: 0,
        QuestionChart: {
          averageValue: 0,
          labels: ["خودفرد", "مدیر مستقیم", "همکار همرده", "همکار", "سایرین"],
          datasets: [
            {
              borderDash: [],
              fill: false,
              lineTension: 0,
              label: "",
              drilldownData: "",
              backgroundColor: [""],
              borderColor: "",
              hoverBackgroundColor: "",
              hoverBorderColor: "",
              borderWidth: 0,
              data: [0, 0, 0, 0, 0],
              items: "",
            },
          ],
        },
      },
      {
        QuestionTitle:
          "از ﻃﺮﯾﻖ ﭘﺬﯾﺮا ﺑﻮدن ﻧﻈﺮات دﯾﮕﺮان و ﺑﻪ اﺷﺘﺮاك ﮔﺬاري اﻃﻼﻋﺎت ﻣﺮﺗﺒﻂ ﺑﺎ ﮐﺎرﺷﺎن، ﺑﺎ آﻧﻬﺎ ﺑﻪ اﯾﺠﺎد ﺳﻄﺢ ﺑﺎﻻﯾﯽ از ﺷﻔﺎﻓﯿﺖ و اﻋﺘﻤﺎد در ﻣﺤﯿﻂ ﮐﺎر ﮐﻤﮏ ﻣﯽ ﮐﻨﺪ.",
        Average: 0,
        QuestionChart: {
          averageValue: 0,
          labels: ["خودفرد", "مدیر مستقیم", "همکار همرده", "همکار", "سایرین"],
          datasets: [
            {
              borderDash: [],
              fill: false,
              lineTension: 0,
              label: "",
              drilldownData: "",
              backgroundColor: [""],
              borderColor: "",
              hoverBackgroundColor: "",
              hoverBorderColor: "",
              borderWidth: 0,
              data: [0, 0, 0, 0, 0],
              items: "",
            },
          ],
        },
      },
      {
        QuestionTitle:
          "ﺑﻪ دﺳﺘﯿﺎﺑﯽ ﺑﻪ اﻫﺪاف ﮔﺮوه و ﺗﻼش در اﯾﻦ زﻣﯿﻨﻪ ﻣﺘﻌﻬﺪ اﺳﺖ ﺣﺘﯽ اﮔﺮ اﯾﻦ اﻫﺪاف ﺑﺎ ﻧﻈﺮات و ﻋﻼﯾﻖ ﺷﺨﺼﯽ اش در ﺗﻀﺎد ﺑﺎﺷﻨﺪ.",
        Average: 0,
        QuestionChart: {
          averageValue: 0,
          labels: ["خودفرد", "مدیر مستقیم", "همکار همرده", "همکار", "سایرین"],
          datasets: [
            {
              borderDash: [],
              fill: false,
              lineTension: 0,
              label: "",
              drilldownData: "",
              backgroundColor: [""],
              borderColor: "",
              hoverBackgroundColor: "",
              hoverBorderColor: "",
              borderWidth: 0,
              data: [0, 0, 0, 0, 0],
              items: "",
            },
          ],
        },
      },
    ],
  };
}
