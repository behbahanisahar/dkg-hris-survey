import NominationData from "../entities/nomination";
import IHistory from "../entities/history";
import Isurvey from "../entities/survey";
import { IAppraisee } from "../entities/appraisee";
import UserTasks from "../entities/user-task";

export default class MockData {
  public static getUserInfo: any[] = [
    {
      Department: "HR",
      EmailAddress: "ali.nooshabadi@digikala.com",
      SPLatinFullName: "ali nooshabadi",
      label: "Morteza Faraji Farshd",
      value: "126",
    },
    {
      Department: "HR",
      EmailAddress: "saharbehbahanii@digikala.com",
      SPLatinFullName: "sahar behbahani",
      label: "Morteza Faraji Farshd",
      value: "125",
    },
    {
      Department: "HR",
      EmailAddress: "Morteza.eslami@digikala.com",
      SPLatinFullName: "Morteza eslami",
      label: "Morteza Faraji Farshd",
      value: "127",
    },
    {
      Department: "HR",
      EmailAddress: "ali.ahmadi@digikala.com",
      SPLatinFullName: "ali ahmadi",
      label: "Morteza Faraji Farshd",
      value: "128",
    },
    {
      Department: "HR",
      EmailAddress: "pouyan.feizian@digikala.com",
      SPLatinFullName: "pooyan feizian",
      label: "Morteza Faraji Farshd",
      value: "129",
    },
  ];
  public static NominationData: NominationData = {
    Status: "notstarted1",
    statusCode: 200,
    Subordinates: [
      {
        AvatarUrl: "/PublishingImages/760674.png",
        Id: 0,
        ItemId: 22,
        SPLatinFullName: "test1",
      },
      {
        AvatarUrl: "/PublishingImages/760674.png",
        Id: 0,
        ItemId: 175,
        SPLatinFullName: "test2",
      },
    ],
    Peer: [
      {
        AvatarUrl: "/PublishingImages/760674.png",
        Id: 0,
        ItemId: 22,
        SPLatinFullName: "test1",
      },
      {
        AvatarUrl: "/PublishingImages/760674.png",
        Id: 0,
        ItemId: 175,
        SPLatinFullName: "test2",
      },
    ],
    Other: [
      {
        AvatarUrl: "/PublishingImages/760674.png",
        Id: 0,
        ItemId: 22,
        SPLatinFullName: "sahar",
      },
      {
        AvatarUrl: "/PublishingImages/760674.png",
        Id: 0,
        ItemId: 175,
        SPLatinFullName: "ali",
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
    },

    LineManager: {
      AvatarUrl: "/PublishingImages/760674.png",
      Id: 0,
      ItemId: 14,
      SPLatinFullName: "Abdolhossin Mohvfvfammad Hashemi",
      Department: "HR",
      EmailAddress: "sa.behbahani@digikala.com",
      JobGrade: "specialist",
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
    UserDisplayName: "Sahar Behbahani",
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
          },
          {
            ItemId: 3,
            Question: "ss",
            QuestionFa: "ss",
            Field: "Question2",
            Category: "",
            Value: 2,
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
          },
          {
            ItemId: 4,
            Question: "ss",
            QuestionFa: "ss",
            Field: "Question4",
            Category: "",
            Value: 7,
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
      Title: "Atria KhodaRahmi",
      UserAvatar:
        "https://keenthemes.com/metronic/themes/metronic/theme/default/demo5/dist/assets/media/users/100_14.jpg",
    },
    {
      NominationItemId: 4,
      Relation: "Line Manager",
      Status: { Status: "NotStarted", Progress: 40 },
      Title: "Ali Nooshabadi",
      UserAvatar:
        "https://keenthemes.com/metronic/themes/metronic/theme/default/demo5/dist/assets/media/users/100_14.jpg",
    },
    {
      NominationItemId: 5,
      Relation: "Self",
      Status: { Status: "NotStarted", Progress: 40 },
      Title: "Sahar Behbahani",
      UserAvatar:
        "https://keenthemes.com/metronic/themes/metronic/theme/default/demo5/dist/assets/media/users/100_14.jpg",
    },
  ];
  public static NominationTaks: UserTasks[] = [
    {
      ItemId: 5,
      Title: "Sahar Behbahani",
      Status: "Approved",
    },
  ];
}
