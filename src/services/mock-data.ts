import NominationData from "../entities/nomination";
import IHistory from "../entities/history";
import Isurvey from "../entities/survey";
import { IAppraisee } from "../entities/appraisee";
import UserTasks from "../entities/user-task";
import ReportStructure from "../entities/reportData";
import ICategoryScore from "../entities/category-scores";
import { IComment } from "./../entities/reports/comments";

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
    status: "notstarted",
    statusCode: 200,
    subordinates: [
      {
        avatarUrl: "/PublishingImages/760674.png",
        id: 0,
        itemId: 22,
        spLatinFullName: "test1",
        reportedPost: "administrator",
      },
      {
        avatarUrl: "/PublishingImages/760674.png",
        id: 0,
        itemId: 175,
        spLatinFullName: "test2",
        reportedPost: "administrator",
      },
    ],
    peer: [
      {
        avatarUrl: "/PublishingImages/760674.png",
        id: 0,
        itemId: 50,
        spLatinFullName: "test3",
        reportedPost: "administrator",
      },
      {
        avatarUrl: "/PublishingImages/760674.png",
        id: 0,
        itemId: 56,
        spLatinFullName: "test4",
        reportedPost: "administrator",
      },
    ],
    other: [
      {
        avatarUrl: "/PublishingImages/760674.png",
        id: 0,
        itemId: 60,
        spLatinFullName: "sahar5",
        reportedPost: "administrator",
      },
      {
        avatarUrl: "/PublishingImages/760674.png",
        id: 0,
        itemId: 70,
        spLatinFullName: "ali2",
        reportedPost: "administrator",
      },
    ],
    user: {
      avatarUrl: "/PublishingImages/760674.png",
      id: 0,
      itemId: 10,
      spLatinFullName: "Abdolhossin Mohammbgnhnad Hashemi",
      department: "HR",
      emailAddress: "sa.behbahani@digikala.com",
      jobGrade: "specialist",
      title: "سحر بهبهانی",
      reportedPost: "developer",
    },

    lineManager: {
      avatarUrl: "/PublishingImages/760674.png",
      id: 0,
      itemId: 14,
      spLatinFullName: "Abdolhossin Mohvfvfammad Hashemi",
      department: "HR",
      emailAddress: "sa.behbahani@digikala.com",
      jobGrade: "specialist",
      title: "علی نوش آبادی",
      reportedPost: "developer",
    },
  };
  public static NominationHistory: IHistory[] = [
    {
      field: "Other",

      changes: [
        {
          added: [" Shahbazi"],
          deleted: [""],
          id: 20,
          modifiedBy: "Ali Nooshabadi",
          modifiedDate: "/Date(1569016495000-0000)/",
          modifiedDateShamsi: "1398/06/30 02:24",
        },
      ],
    },
    {
      field: "Subordinate",
      changes: [
        {
          added: ["gholami"],
          deleted: ["nooshabadi"],
          id: 22,
          modifiedBy: "sahar behbahani",
          modifiedDate: "/Date(1569016495000-0000)/",
          modifiedDateShamsi: "1398/06/31 02:24",
        },
      ],
    },
  ];

  public static SurveyFormData: Isurvey = {
    user: {
      avatarUrl: "/PublishingImages/760674.png",
      id: 0,
      itemId: 10,
      spLatinFullName: "Abdolhossin Mohammbgnhnad Hashemi",
      department: "HR",
      emailAddress: "sa.behbahani@digikala.com",
      jobGrade: "specialist",
      title: "سحر بهبهانی",
      reportedPost: "developer",
    },
    shouldBeStarted: "",
    shouldBeContinued: "",
    shouldBeStopped: "",
    surveyAnswerId: 0,
    statusCode: 200,
    categories: [
      {
        title: "Builder Approach & Result Oriented",
        baseCategory: "Core Values",
        baseCategoryId: 2,
        baseCategoryFa: "کتگوری ۱",
        titleFa: "مشتری محوری",
        signUrl: "",
        questions: [
          {
            itemId: 1,
            question:
              "Focusing self and others on providing a prompt, professional and timely service to enhance customer experience",
            questionFa:
              "بر ارائه خدمات به صورت سریع، حرفه ای و به موقع در راستای ایجاد بهترین تجربه برای مشتریان، توجه دارد و دیگران را نیز در این راستا تشویق می کند.",
            field: "Question1",
            category: "",
            value: 5,
            questionNumber: "1",
          },
          {
            itemId: 3,
            question: "ss",
            questionFa: "ss",
            field: "Question2",
            category: "",
            value: 2,
            questionNumber: "2",
          },
        ],
      },

      {
        title: "Builder Approach & Result Oriented",
        baseCategory: "Leadership Competencies",
        baseCategoryId: 2,
        baseCategoryFa: "کتگوری ۲",
        titleFa: "نتیجه گرایی",
        signUrl: "",
        questions: [
          {
            itemId: 2,
            question:
              "Focusing self and others on providing a prompt, professional and timely service to enhance customer experience",
            questionFa:
              "بر ارائه خدمات به صورت سریع، حرفه ای و به موقع در راستای ایجاد بهترین تجربه برای مشتریان، توجه دارد و دیگران را نیز در این راستا تشویق می کند.",
            field: "Question3",
            category: "",
            value: 2,
            questionNumber: "3",
          },
          {
            itemId: 4,
            question: "ss",
            questionFa: "ss",
            field: "Question4",
            category: "",
            value: 7,
            questionNumber: "4",
          },
        ],
      },
    ],
  };

  public static Appraisee: IAppraisee[] = [
    {
      nominationItemId: 2,
      relation: "Peer",
      status: { status: "NotStarted", progress: 40 },
      user: {},
      hasCoworker: false,
    },
    {
      nominationItemId: 4,
      relation: "Line Manager",
      status: { status: "NotStarted", progress: 40 },
      user: {},
      hasCoworker: false,
    },
    {
      nominationItemId: 5,
      relation: "Self",
      status: { status: "NotStarted", progress: 40 },
      user: {},
      hasCoworker: false,
    },
  ];
  public static NominationTaks: UserTasks[] = [
    {
      itemId: 2,
      status: "",
      title: "",
      user: {},
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
    categories: [
      {
        id: 1,
        title: "کار گروهـــــــــی",
        signUrl: "/SiteAssets/Pics/Survey/Team%20Working.png",
      },
      {
        id: 2,
        title: "مشتری محوری",
        signUrl: "/SiteAssets/Pics/Survey/Customer%20Centric.png",
      },
      {
        id: 3,
        title: "نتیــــــــــــجه گرایی",
        signUrl: "/SiteAssets/Pics/Survey/Result%20Oriented.png",
      },
      {
        id: 4,
        title: "اشتیاق برای تعـــــــــالی",
        signUrl: "/SiteAssets/Pics/Survey/Drive%20For%20Excellence.png",
      },
      {
        id: 5,
        title: "مدیریت و توسعه افراد",
        signUrl: "http://hq-spsrv03:90/SiteAssets/Pics/Survey/People%20Development.png",
      },
      {
        id: 6,
        title: "ایجاد و توسعه چشم انداز مشترک",
        signUrl: "/SiteAssets/Pics/Survey/Vision.png",
      },
      {
        id: 7,
        title: "شم تجــــــــــــاری",
        signUrl: "http://hq-spsrv03:90/SiteAssets/Pics/Survey/Business%20Acumen.png",
      },
      {
        id: 8,
        title: "تصمیـــــم گیری",
        signUrl: "/SiteAssets/Pics/Survey/Decision%20Making.png",
      },
    ],
    categoryTitle: "کار گروهـــــــــی",
    categoryChart: {
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
    questionsData: [
      {
        questionTitle: "در ﺑﯿﻦ ﻫﻤﮑﺎران راﺑﻄﻪ ﺑﯿﻦb ﻓﺮدي ﻗﻮي اﯾﺠﺎد ﮐﺮده و ﺑﻪ ﺗﻮﺳﻌﻪ رواﺑﻂ/b ﮐﻤﮏ ﻣﯽ ﮐﻨﺪ.",
        average: 0,
        questionChart: {
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
        questionTitle:
          "از ﻃﺮﯾﻖ ﭘﺬﯾﺮا ﺑﻮدن ﻧﻈﺮات دﯾﮕﺮان و ﺑﻪ اﺷﺘﺮاك ﮔﺬاري اﻃﻼﻋﺎت ﻣﺮﺗﺒﻂ ﺑﺎ ﮐﺎرﺷﺎن، ﺑﺎ آﻧﻬﺎ ﺑﻪ اﯾﺠﺎد ﺳﻄﺢ ﺑﺎﻻﯾﯽ از ﺷﻔﺎﻓﯿﺖ و اﻋﺘﻤﺎد در ﻣﺤﯿﻂ ﮐﺎر ﮐﻤﮏ ﻣﯽ ﮐﻨﺪ.",
        average: 0,
        questionChart: {
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
        questionTitle:
          "ﺑﻪ دﺳﺘﯿﺎﺑﯽ ﺑﻪ اﻫﺪاف ﮔﺮوه و ﺗﻼش در اﯾﻦ زﻣﯿﻨﻪ ﻣﺘﻌﻬﺪ اﺳﺖ ﺣﺘﯽ اﮔﺮ اﯾﻦ اﻫﺪاف ﺑﺎ ﻧﻈﺮات و ﻋﻼﯾﻖ ﺷﺨﺼﯽ اش در ﺗﻀﺎد ﺑﺎﺷﻨﺪ.",
        average: 0,
        questionChart: {
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

  public static Comments: IComment[] = [
    {
      title: "ادامه - عادات و رفتاریهایی موثری که می‌بایست ادامه پیدا کنند",
      value: "continue",
      comments: ["ادامه ۱", "ادامه ۲"],
      description: "",
    },
    {
      title: "شروع - عادات و رفتارهایی که می‌بایست شروع شوند",
      value: "start",
      comments: ["شروع ۳", "شروع ۲", "شروع ۱"],
      description: "",
    },
    {
      title: "توقف - رفتاریهایی که می‌بایست متوقف شده یا به نحو دیگری صورت پذیرند",
      value: "stop",
      comments: ["توقف ۱", "s​top"],
      description: "",
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
    itemId: 513,
    hasAccess: true,
  };
  public static ReportIntro: any = {
    users: [
      {
        user: {
          title: "امیر صالحی طالقانی",

          emailAddress: "a.salehi@digikala.com",
          cLevel: "CMO",
          department: "Digikala Next",

          spLatinFullName: "Amir Salehi Talaghani",
          itemId: 7513,
          avatarUrl: null,
          avatarTextPlaceholder: "AS",
          attachments: null,
        },
        nominationId: 645,
        category: "Self //TODO",
      },
      {
        user: {
          title: "امیر صالحی طالقانی",

          emailAddress: "a.salehi@digikala.com",
          cLevel: "CMO",
          department: "Digikala Next",

          spLatinFullName: "Amir Salehi Talaghani",
          itemId: 7513,
          avatarUrl: null,
          avatarTextPlaceholder: "AS",
          attachments: null,
        },
        nominationId: 645,
        category: "Self //TODO",
      },
    ],
  };
}
