import NominationData from "../entities/nomination";
import IHistory from "../entities/history";
import Isurvey from "../entities/survey";
import { IAppraisee } from "../entities/appraisee";
import UserTasks from "../entities/user-task";
import ReportStructure from "../entities/reportData";
import ICategoryScore from "../entities/category-scores";
import IReportIntro from "../entities/reports/report-intro";

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

  public static comparingChartData: ReportStructure = {
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
        hoverBackgroundColor: ["rgba(239, 57, 78, 0.4)"],
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
        hoverBackgroundColor: ["rgba(25, 191, 211, 0.4)"],
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
        borderDash: [10, 5],
        fill: false,
        lineTension: 0,
        label: "امتیاز دیجی‌کالا",
        drilldownData: "",
        backgroundColor: [""],
        borderColor: "rgba(239, 57, 78, 1)",
        hoverBackgroundColor: [""],
        hoverBorderColor: "rgba(239, 57, 78, 1)",
        borderWidth: 2,
        data: [2.5, 3, 2.83, 3.5, 2.1, 2.67, 2.17, 3.25],
        items: null,
      },
      {
        borderDash: [1, 1],
        fill: false,
        lineTension: 0,
        label: "امتیاز شما",
        drilldownData: "",
        backgroundColor: [""],
        borderColor: "rgba(25, 191, 211, 1)",
        hoverBackgroundColor: [""],
        hoverBorderColor: "rgba(25, 191, 211, 1)",
        borderWidth: 3,
        data: [2.29, 3, 2.82, 3.59, 2.17, 2.9, 2.3, 3.33],
        items: null,
      },
    ],
  };

  public static CompetencyCategories: ICategoryScore = {
    Categories: [
      {
        Id: 1,
        Title: "کار گروهـــــــــی",
        SignUrl: "/SiteAssets/Pics/Survey/Team%20Working.png",
      },
      {
        Id: 2,
        Title: "مشتری محوری",
        SignUrl: "/SiteAssets/Pics/Survey/Customer%20Centric.png",
      },
      {
        Id: 3,
        Title: "نتیــــــــــــجه گرایی",
        SignUrl: "/SiteAssets/Pics/Survey/Result%20Oriented.png",
      },
      {
        Id: 4,
        Title: "اشتیاق برای تعـــــــــالی",
        SignUrl: "/SiteAssets/Pics/Survey/Drive%20For%20Excellence.png",
      },
      {
        Id: 5,
        Title: "مدیریت و توسعه افراد",
        SignUrl: "http://hq-spsrv03:90/SiteAssets/Pics/Survey/People%20Development.png",
      },
      {
        Id: 6,
        Title: "ایجاد و توسعه چشم انداز مشترک",
        SignUrl: "/SiteAssets/Pics/Survey/Vision.png",
      },
      {
        Id: 7,
        Title: "شم تجــــــــــــاری",
        SignUrl: "http://hq-spsrv03:90/SiteAssets/Pics/Survey/Business%20Acumen.png",
      },
      {
        Id: 8,
        Title: "تصمیـــــم گیری",
        SignUrl: "/SiteAssets/Pics/Survey/Decision%20Making.png",
      },
    ],
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
          hoverBackgroundColor: [""],
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
              hoverBackgroundColor: [""],
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
              hoverBackgroundColor: [""],
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
              hoverBackgroundColor: [""],
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
  public static competencySummary: any = {
    categories: [
      "کار گروهی",
      "مشتری محوری",
      "نتیجه گرایی",
      "اشتیاق برای تعالی",
      "مدیریت و توسعه افراد",
      "ایجاد و توسعه چشم انداز مشترک",
      "شم تجاری",
      "تصمیم گیری",
    ],
    series: [
      {
        type: "bar",
        name: "خود فرد",
        color: "#19BFD3",
        data: [
          {
            y: 3,
            query: "1",
          },
          {
            y: 3,
            query: "2",
          },
          {
            y: 2.5,
            query: "3",
          },
          {
            y: 4.5,
            query: "4",
          },
          {
            y: 2.5,
            query: "5",
          },
          {
            y: 3,
            query: "6",
          },
          {
            y: 2.5,
            query: "7",
          },
          {
            y: 4,
            query: "8",
          },
        ],
        lineWidth: 0,
        marker: null,
      },
      {
        type: "bar",
        name: "سایر ارزیابان",
        color: "#EF394E",
        data: [
          {
            y: 2.17,
            query: "1",
          },
          {
            y: 3,
            query: "2",
          },
          {
            y: 2.89,
            query: "3",
          },
          {
            y: 3.47,
            query: "4",
          },
          {
            y: 2.12,
            query: "5",
          },
          {
            y: 2.88,
            query: "6",
          },
          {
            y: 2.25,
            query: "7",
          },
          {
            y: 3.2,
            query: "8",
          },
        ],
        lineWidth: 0,
        marker: null,
      },
      {
        type: "spline",
        name: "خود فرد - اطلاعات پیشین",
        color: null,
        data: [
          {
            y: 1,
            query: "1",
          },
          {
            y: 2,
            query: "2",
          },
          {
            y: 3,
            query: "3",
          },
          {
            y: 4,
            query: "4",
          },
          {
            y: 3,
            query: "5",
          },
          {
            y: 2,
            query: "6",
          },
          {
            y: 1,
            query: "7",
          },
          {
            y: 5,
            query: "8",
          },
        ],
        lineWidth: 0,
        marker: {
          lineWidth: 2,
          lineColor: "#56C7DA",
          fillColor: "#FFF",
          symbol: "square",
        },
      },
      {
        type: "spline",
        name: "سایر ارزیابان - اطلاعات پیشین",
        color: null,
        data: [
          {
            y: 5,
            query: "1",
          },
          {
            y: 1,
            query: "2",
          },
          {
            y: 2,
            query: "3",
          },
          {
            y: 5,
            query: "4",
          },
          {
            y: 4,
            query: "5",
          },
          {
            y: 3,
            query: "6",
          },
          {
            y: 2,
            query: "7",
          },
          {
            y: 1,
            query: "8",
          },
        ],
        lineWidth: 0,
        marker: {
          lineWidth: 2,
          lineColor: "#F05662",
          fillColor: "#FFF",
          symbol: "square",
        },
      },
    ],
  };

  public static Comments: any = [
    {
      Title: "ادامه - عادات و رفتاریهایی موثری که می‌بایست ادامه پیدا کنند",
      Value: "Continue",
      Comments: ["ادامه ۱", "ادامه ۲"],
    },
    {
      Title: "شروع - عادات و رفتارهایی که می‌بایست شروع شوند",
      Value: "Start",
      Comments: ["شروع ۳", "شروع ۲", "شروع ۱"],
    },
    {
      Title: "توقف - رفتاریهایی که می‌بایست متوقف شده یا به نحو دیگری صورت پذیرند",
      Value: "Stop",
      Comments: ["توقف ۱", "S​top"],
    },
  ];
  public static Index: any[] = [
    {
      Title: "نقاط قوت",
      Description: "رفتارهای زیر همواره در تمامی گروه‌ها، با بالاترین امتیاز ارزیابی شده است",
      Items: [
        {
          Question:
            "از ﻃﺮﯾﻖ ﭘﺬﯾﺮا ﺑﻮدن ﻧﻈﺮات دﯾﮕﺮان و ﺑﻪ اﺷﺘﺮاك ﮔﺬاري اﻃﻼﻋﺎت ﻣﺮﺗﺒﻂ ﺑﺎ ﮐﺎرﺷﺎن، ﺑﺎ آﻧﻬﺎ ﺑﻪ اﯾﺠﺎد ﺳﻄﺢ ﺑﺎﻻﯾﯽ از ﺷﻔﺎﻓﯿﺖ و اﻋﺘﻤﺎد در ﻣﺤﯿﻂ ﮐﺎر ﮐﻤﮏ ﻣﯽ ﮐﻨﺪ.",
        },
        {
          Question:
            "ﻣﺴﺎﺋﻞ و ﻣﺸﮑﻼت ﻣﻮﺟﻮد را ﺷﻨﺎﺳﺎﯾﯽ ﮐﺮده، ﻣﺴﺌﻮﻟﯿﺘﺸﺎن را ﺑﺮ ﻋﻬﺪه ﮔﺮﻓﺘﻪ و ﺗﺎ زﻣﺎن ﺣﻞ ﺷﺪن آﻧﻬﺎ و دﺳﺘﯿﺎﺑﯽ ﺑﻪ ﻧﺘﺎﯾﺞ ﻣﻄﻠﻮب ﺑﻪ ﺗﻼﺷﺶ اداﻣﻪ ﻣﯽ دﻫﺪ",
        },
        {
          Question: "ﺗﺼﻮﯾﺮ ﮐﻠﯽ از اﻫﺪاﻓﯽ ﮐﻪ ﺳﺎزﻣﺎن ﻣﯽ ﺧﻮاﻫﺪ ﺑﻪ آﻧﻬﺎ دﺳﺖ ﯾﺎﺑﺪ را ﺑﻪ اﻓﺮاد اراﺋﻪ ﻣﯽ ﮐﻨﺪ.",
        },
      ],
    },
    {
      Title: "نقاط بهبود",
      Description: "رفتارهای زیر همواره در تمامی گروه‌ها، با پایین‌ترین امتیاز ارزیابی شده است",
      Items: [
        {
          Question: "دﯾﮕﺮان را ﻣﺘﻘﺎﻋﺪ ﻣﯽ ﮐﻨﺪ ﮐﻪ ﻣﻨﺎﻓﻊ ﺑﻠﻨﺪ ﻣﺪت آﻧﻬﺎ در ﮔﺮو دﺳﺘﯿﺎﺑﯽ ﺑﻪ ﭼﺸﻢ اﻧﺪازﻫﺎي ﻣﺸﺘﺮك ﺳﺎزﻣﺎن اﺳﺖ",
        },
        {
          Question: "در ﺑﯿﻦ ﻫﻤﮑﺎران راﺑﻄﻪ ﺑﯿﻦb ﻓﺮدي ﻗﻮي اﯾﺠﺎد ﮐﺮده و ﺑﻪ ﺗﻮﺳﻌﻪ رواﺑﻂ/b ﮐﻤﮏ ﻣﯽ ﮐﻨﺪ.",
        },
        {
          Question:
            "از ﻃﺮﯾﻖ ﭘﺬﯾﺮا ﺑﻮدن ﻧﻈﺮات دﯾﮕﺮان و ﺑﻪ اﺷﺘﺮاك ﮔﺬاري اﻃﻼﻋﺎت ﻣﺮﺗﺒﻂ ﺑﺎ ﮐﺎرﺷﺎن، ﺑﺎ آﻧﻬﺎ ﺑﻪ اﯾﺠﺎد ﺳﻄﺢ ﺑﺎﻻﯾﯽ از ﺷﻔﺎﻓﯿﺖ و اﻋﺘﻤﺎد در ﻣﺤﯿﻂ ﮐﺎر ﮐﻤﮏ ﻣﯽ ﮐﻨﺪ.",
        },
      ],
    },
    {
      Title: "نقاط کور",
      Description:
        "رفتارهایی هستند که امتیاز خودارزیابی بالاتر از امتیازی است که سایر ارزیابان به شما اختصاص داده‌اند. این رفتارها ممکن است حوزه‌های توسعه‌ای شما باشد که هنوز شناخته نشده‌اند",
      Items: [
        {
          Question: "ﺑﻪ ﺗﺎﺛﯿﺮ اﻗﺪاﻣﺎت و ﺑﺮﻧﺎﻣﻪ ﻫﺎﯾﺶ ﺑﺮ روي ﻣﺸﺘﺮﯾﺎن ﺗﻮﺟﻪ ﮐﺮده و آن را در ﻧﻈﺮ ﻣﯽ ﮔﯿﺮد.",
        },
        {
          Question:
            "<b class=bold-text>فعالانه</b> به دنبال راهکارهای خلاقانه ای است که عملکرد خودش و دیگران را بهبود دهند.",
        },
        {
          Question: "<b class=bold-text>شخصا</b> از افراد تقدیر کرده و دستاوردها را جشن می گیرد.",
        },
      ],
    },
    {
      Title: "نقاط قوت پنهان",
      Description:
        "در رفتارهای زیر، شما خودتان را کمتر از امتیاز سایر ارزیابانتان ارزیابی کرده اید، ممکن است این رفتارها نقاط قوت پنهان شما باشند که هنوز آن را در خودتان نشناخته‌اید",
      Items: [
        {
          Question: "ﺗﺼﻮﯾﺮ ﮐﻠﯽ از اﻫﺪاﻓﯽ ﮐﻪ ﺳﺎزﻣﺎن ﻣﯽ ﺧﻮاﻫﺪ ﺑﻪ آﻧﻬﺎ دﺳﺖ ﯾﺎﺑﺪ را ﺑﻪ اﻓﺮاد اراﺋﻪ ﻣﯽ ﮐﻨﺪ.",
        },
        {
          Question:
            "<b class=bold-text>بصورت فعال</b> تجربه های برتر ،  روندها و وضعیت رقبا را بررسی کرده و اطلاعات خود را در این زمینه ها به روز می کند.",
        },
        {
          Question:
            "از ﻃﺮﯾﻖ ﭘﺬﯾﺮا ﺑﻮدن ﻧﻈﺮات دﯾﮕﺮان و ﺑﻪ اﺷﺘﺮاك ﮔﺬاري اﻃﻼﻋﺎت ﻣﺮﺗﺒﻂ ﺑﺎ ﮐﺎرﺷﺎن، ﺑﺎ آﻧﻬﺎ ﺑﻪ اﯾﺠﺎد ﺳﻄﺢ ﺑﺎﻻﯾﯽ از ﺷﻔﺎﻓﯿﺖ و اﻋﺘﻤﺎد در ﻣﺤﯿﻂ ﮐﺎر ﮐﻤﮏ ﻣﯽ ﮐﻨﺪ.",
        },
      ],
    },
  ];

  public static ReportSummary: any = {
    User: {
      Title: null,
      Username: null,
      LastSyncDate: null,
      PerssonelSystemCode: null,
      PerssonelCode: null,
      Gender: null,
      BirthPlace: null,
      CentralRef: null,
      FirstName: null,
      LastName: null,
      FatherName: null,
      BirthId: null,
      NationalId: null,
      BirthDate: null,
      StrBirthDate: null,
      IssueDate: null,
      StrIssueDate: null,
      FullAddress: null,
      MobileNumber: null,
      EmailAddress: "A.Nooshabadi@digikala.com",
      CLevel: "CTO",
      CostCenterName: null,
      ContractType: null,
      RetirmentDate: null,
      JobGrade: null,
      LatinLastName: null,
      SubDept: null,
      PersianDepartment: null,
      SubDivs: null,
      EmploymentTo: null,
      ContractStatus: null,
      WorkPlace: null,
      DemandNoteValue: null,
      JobGradeCode: null,
      BonusDate: null,
      LatinFirstName: null,
      JobStatus: null,
      Department: "Platform Services",
      SocialSecurityJob: null,
      DateOfEmployment: null,
      PersianReportedPost: null,
      ReportedPost: "SharePoint Developer",
      DirectManagerSystemCode: null,
      InsuranceNumber: null,
      IBANCode: null,
      BonusPercent: null,
      EmploymentFrom: null,
      AccountNumber: null,
      Degree: null,
      FieldOfStudy: null,
      CollegeOrUniversity: null,
      SPLatinFullName: "Ali Nooshabadi",
      ItemId: 1981,
      AvatarUrl: null,
      AvatarTextPlaceholder: "AN",
      Attachments: null,
    },
    SurveyProgress: 100,
    Subordinates: [
      {
        User: {
          Title: null,
          Username: null,
          LastSyncDate: null,
          PerssonelSystemCode: null,
          PerssonelCode: null,
          Gender: null,
          BirthPlace: null,
          CentralRef: null,
          FirstName: null,
          LastName: null,
          FatherName: null,
          BirthId: null,
          NationalId: null,
          BirthDate: null,
          StrBirthDate: null,
          IssueDate: null,
          StrIssueDate: null,
          FullAddress: null,
          MobileNumber: null,
          EmailAddress: "Sa.Behbahani@digikala.com",
          CLevel: "CTO",
          CostCenterName: null,
          ContractType: null,
          RetirmentDate: null,
          JobGrade: null,
          LatinLastName: null,
          SubDept: null,
          PersianDepartment: null,
          SubDivs: null,
          EmploymentTo: null,
          ContractStatus: null,
          WorkPlace: null,
          DemandNoteValue: null,
          JobGradeCode: null,
          BonusDate: null,
          LatinFirstName: null,
          JobStatus: null,
          Department: "Platform Services",
          SocialSecurityJob: null,
          DateOfEmployment: null,
          PersianReportedPost: null,
          ReportedPost: "SharePoint Developer",
          DirectManagerSystemCode: null,
          InsuranceNumber: null,
          IBANCode: null,
          BonusPercent: null,
          EmploymentFrom: null,
          AccountNumber: null,
          Degree: null,
          FieldOfStudy: null,
          CollegeOrUniversity: null,
          SPLatinFullName: "Sahar Behbahani",
          ItemId: 1976,
          AvatarUrl: null,
          AvatarTextPlaceholder: "SB",
          Attachments: null,
        },
        NominationId: 14,
      },
      {
        User: {
          Title: null,
          Username: null,
          LastSyncDate: null,
          PerssonelSystemCode: null,
          PerssonelCode: null,
          Gender: null,
          BirthPlace: null,
          CentralRef: null,
          FirstName: null,
          LastName: null,
          FatherName: null,
          BirthId: null,
          NationalId: null,
          BirthDate: null,
          StrBirthDate: null,
          IssueDate: null,
          StrIssueDate: null,
          FullAddress: null,
          MobileNumber: null,
          EmailAddress: "A.Nooshabadi@digikala.com",
          CLevel: "CTO",
          CostCenterName: null,
          ContractType: null,
          RetirmentDate: null,
          JobGrade: null,
          LatinLastName: null,
          SubDept: null,
          PersianDepartment: null,
          SubDivs: null,
          EmploymentTo: null,
          ContractStatus: null,
          WorkPlace: null,
          DemandNoteValue: null,
          JobGradeCode: null,
          BonusDate: null,
          LatinFirstName: null,
          JobStatus: null,
          Department: "Platform Services",
          SocialSecurityJob: null,
          DateOfEmployment: null,
          PersianReportedPost: null,
          ReportedPost: "SharePoint Developer",
          DirectManagerSystemCode: null,
          InsuranceNumber: null,
          IBANCode: null,
          BonusPercent: null,
          EmploymentFrom: null,
          AccountNumber: null,
          Degree: null,
          FieldOfStudy: null,
          CollegeOrUniversity: null,
          SPLatinFullName: "Ali Nooshabadi",
          ItemId: 1981,
          AvatarUrl: null,
          AvatarTextPlaceholder: "AN",
          Attachments: null,
        },
        NominationId: 15,
      },
      {
        User: {
          Title: null,
          Username: null,
          LastSyncDate: null,
          PerssonelSystemCode: null,
          PerssonelCode: null,
          Gender: null,
          BirthPlace: null,
          CentralRef: null,
          FirstName: null,
          LastName: null,
          FatherName: null,
          BirthId: null,
          NationalId: null,
          BirthDate: null,
          StrBirthDate: null,
          IssueDate: null,
          StrIssueDate: null,
          FullAddress: null,
          MobileNumber: null,
          EmailAddress: "L.Maharati@digikala.com",
          CLevel: "COO",
          CostCenterName: null,
          ContractType: null,
          RetirmentDate: null,
          JobGrade: null,
          LatinLastName: null,
          SubDept: null,
          PersianDepartment: null,
          SubDivs: null,
          EmploymentTo: null,
          ContractStatus: null,
          WorkPlace: null,
          DemandNoteValue: null,
          JobGradeCode: null,
          BonusDate: null,
          LatinFirstName: null,
          JobStatus: null,
          Department: "Customer Services",
          SocialSecurityJob: null,
          DateOfEmployment: null,
          PersianReportedPost: null,
          ReportedPost: "Contact Center Manager",
          DirectManagerSystemCode: null,
          InsuranceNumber: null,
          IBANCode: null,
          BonusPercent: null,
          EmploymentFrom: null,
          AccountNumber: null,
          Degree: null,
          FieldOfStudy: null,
          CollegeOrUniversity: null,
          SPLatinFullName: "Leila Maharati",
          ItemId: 5902,
          AvatarUrl: null,
          AvatarTextPlaceholder: "LM",
          Attachments: null,
        },
        NominationId: 16,
      },
      {
        User: {
          Title: null,
          Username: null,
          LastSyncDate: null,
          PerssonelSystemCode: null,
          PerssonelCode: null,
          Gender: null,
          BirthPlace: null,
          CentralRef: null,
          FirstName: null,
          LastName: null,
          FatherName: null,
          BirthId: null,
          NationalId: null,
          BirthDate: null,
          StrBirthDate: null,
          IssueDate: null,
          StrIssueDate: null,
          FullAddress: null,
          MobileNumber: null,
          EmailAddress: "G.Daryadel@digikala.com",
          CLevel: "COO",
          CostCenterName: null,
          ContractType: null,
          RetirmentDate: null,
          JobGrade: null,
          LatinLastName: null,
          SubDept: null,
          PersianDepartment: null,
          SubDivs: null,
          EmploymentTo: null,
          ContractStatus: null,
          WorkPlace: null,
          DemandNoteValue: null,
          JobGradeCode: null,
          BonusDate: null,
          LatinFirstName: null,
          JobStatus: null,
          Department: "Customer Services",
          SocialSecurityJob: null,
          DateOfEmployment: null,
          PersianReportedPost: null,
          ReportedPost: "AS Expansion Supervisor",
          DirectManagerSystemCode: null,
          InsuranceNumber: null,
          IBANCode: null,
          BonusPercent: null,
          EmploymentFrom: null,
          AccountNumber: null,
          Degree: null,
          FieldOfStudy: null,
          CollegeOrUniversity: null,
          SPLatinFullName: "Gohar Daryadel",
          ItemId: 3211,
          AvatarUrl: null,
          AvatarTextPlaceholder: "GD",
          Attachments: null,
        },
        NominationId: 17,
      },
    ],
    HasAccess: true,
  };
  public static ReportIntro: IReportIntro = {
    Users: [
      {
        User: {
          EmailAddress: "G.Daryadel@digikala.com",
          CLevel: "COO",

          Department: "Customer Services",

          ReportedPost: "AS Expansion Supervisor",

          SPLatinFullName: "Gohar Daryadel",
          ItemId: 3211,
          AvatarUrl: "",
          AvatarTextPlaceholder: "GD",
        },
        NominationId: 14,
        Category: "Self //TODO",
      },
      {
        User: {
          EmailAddress: "G.Daryadel@digikala.com",
          CLevel: "COO",

          Department: "Customer Services",

          ReportedPost: "AS Expansion Supervisor",

          SPLatinFullName: "sahar",
          ItemId: 3211,
          AvatarUrl: "",
          AvatarTextPlaceholder: "GD",
        },
        NominationId: 15,
        Category: "Self //TODO",
      },
      {
        User: {
          EmailAddress: "G.Daryadel@digikala.com",
          CLevel: "COO",

          Department: "Customer Services",

          ReportedPost: "AS Expansion Supervisor",

          SPLatinFullName: "test2",
          ItemId: 3211,
          AvatarUrl: "",
          AvatarTextPlaceholder: "GD",
        },
        NominationId: 16,
        Category: "Self //TODO",
      },
    ],
  };
}
