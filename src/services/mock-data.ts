import NominationData from "../entities/nomination";
import IHistory from "../entities/history";

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
    Peers: [
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
    Others: [
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
}
