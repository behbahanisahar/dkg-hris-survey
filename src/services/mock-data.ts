import NominationData from "../entities/nomination";
import IHistory from "../entities/history";
import Isurvey from "../entities/survey";
import { IAppraisee } from "../entities/appraisee";
import UserTasks from "../entities/user-task";

export default class MockData {
  public static getUserInfo: any[] = [
    {
      Department: "HR",
      EmailAddress: "Morteza.Faraji@digikala.com",
      SPLatinFullName: "Morteza Faraji Farshd",
      label: "Morteza Faraji Farshd",
      value: "126",
    },
    {
      Department: "HR",
      EmailAddress: "Morteza.Faraji@digikala.com",
      SPLatinFullName: "sahar behbahani",
      label: "Morteza Faraji Farshd",
      value: "125",
    },
    {
      Department: "HR",
      EmailAddress: "Morteza.Faraji@digikala.com",
      SPLatinFullName: "Morteza Faraji Farshd",
      label: "Morteza Faraji Farshd",
      value: "127",
    },
    {
      Department: "HR",
      EmailAddress: "Morteza.Faraji@digikala.com",
      SPLatinFullName: "ali nooshabadi",
      label: "Morteza Faraji Farshd",
      value: "128",
    },
    {
      Department: "HR",
      EmailAddress: "Morteza.Faraji@digikala.com",
      SPLatinFullName: "pooyan feizian",
      label: "Morteza Faraji Farshd",
      value: "129",
    },
  ];
  public static NominationData: NominationData = {
    Status: "notstarted",
    Subordinates: [
      {
        AvatarUrl: "/PublishingImages/760674.png",
        Id: 0,
        ItemId: 22,
        SPLatinFullName: "Vahifgfgfgd Dadkhah",
      },
      {
        AvatarUrl: "/PublishingImages/760674.png",
        Id: 0,
        ItemId: 175,
        SPLatinFullName: "Vahid nhnhnDadkhah",
      },
    ],
    Peer: [
      {
        AvatarUrl: "/PublishingImages/760674.png",
        Id: 0,
        ItemId: 22,
        SPLatinFullName: "Vahifgfgfgd Dadkhah",
      },
      {
        AvatarUrl: "/PublishingImages/760674.png",
        Id: 0,
        ItemId: 175,
        SPLatinFullName: "Vahid nhnhnDadkhah",
      },
    ],
    Other: [
      {
        AvatarUrl: "/PublishingImages/760674.png",
        Id: 0,
        ItemId: 22,
        SPLatinFullName: "Vahifgfgfgd Dadkhah",
      },
      {
        AvatarUrl: "/PublishingImages/760674.png",
        Id: 0,
        ItemId: 175,
        SPLatinFullName: "Vahid nhnhnDadkhah",
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
    Categories: [
      {
        Title: "Builder Approach & Result Oriented",
        SignUrl: "",
        Questions: [
          {
            ItemId: 1,
            Question:
              "Focusing self and others on providing a prompt, professional and timely service to enhance customer experience",
            QuestionFa:
              "بر ارائه خدمات به صورت سریع، حرفه ای و به موقع در راستای ایجاد بهترین تجربه برای مشتریان، توجه دارد و دیگران را نیز در این راستا تشویق می کند.",
            Field: "Q1",
            Category: "",
            Value: 0,
          },
          {
            ItemId: 3,
            Question: "ss",
            QuestionFa: "ss",
            Field: "Q2",
            Category: "",
            Value: 0,
          },
        ],
      },

      {
        Title: "Builder Approach & Result Oriented",
        SignUrl: "",
        Questions: [
          {
            ItemId: 2,
            Question:
              "Focusing self and others on providing a prompt, professional and timely service to enhance customer experience",
            QuestionFa:
              "بر ارائه خدمات به صورت سریع، حرفه ای و به موقع در راستای ایجاد بهترین تجربه برای مشتریان، توجه دارد و دیگران را نیز در این راستا تشویق می کند.",
            Field: "Q3",
            Category: "",
            Value: 0,
          },
          {
            ItemId: 3,
            Question: "ss",
            QuestionFa: "ss",
            Field: "Q4",
            Category: "",
            Value: 0,
          },
        ],
      },
    ],
  };

  public static Appraisee: IAppraisee[] = [
    {
      NominationItemId: 2,
      Progress: 64,
      Relation: "Peer",
      Status: "Not Completed",
      Title: "Atria KhodaRahmi",
    },
    {
      NominationItemId: 4,
      Progress: 64,
      Relation: "Line Manager",
      Status: "Not Completed",
      Title: "Ali Nooshabadi",
    },
    {
      NominationItemId: 5,
      Progress: 64,
      Relation: "Self",
      Status: "Not Completed",
      Title: "Sahar Behbahani",
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
