import NominationData from "../entities/nomination";
import IHistory from "../entities/history";
import Isurvey from "../entities/survey";

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
    Status: "not started",
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

  public static SurveyFormData: Isurvey[] = [
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
          Field: "Cat1",
          Category: "",
        },
        {
          ItemId: 3,
          Question: "ss",
          QuestionFa: "ss",
          Field: "ss",
          Category: "",
        },
      ],
    },
    {
      Title: "Customer Centric",
      SignUrl: "",
      Questions: [
        {
          ItemId: 2,
          Question: "Persisting to see things through, regardless of challenges and barriers faced\t",
          QuestionFa: "در پیگیری امور بدون توجه به چالش ها و موانع پیش رو، پافشاری می کند.\t",
          Field: "null",
          Category: "",
        },
      ],
    },
  ];
}
