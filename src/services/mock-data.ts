import NominationData from "../entities/nomination";

export default class MockData {
    public static getUserInfo: any[] = [
        {Department: "HR",
        EmailAddress: "Morteza.Faraji@digikala.com",
        SPLatinFullName: "Morteza Faraji Farshd",
        label: "Morteza Faraji Farshd",
        value: "126"},
        {Department: "HR",
        EmailAddress: "Morteza.Faraji@digikala.com",
        SPLatinFullName: "sahar behbahani",
        label: "Morteza Faraji Farshd",
        value: "125"},
        {Department: "HR",
        EmailAddress: "Morteza.Faraji@digikala.com",
        SPLatinFullName: "Morteza Faraji Farshd",
        label: "Morteza Faraji Farshd",
        value: "127"},
        {Department: "HR",
        EmailAddress: "Morteza.Faraji@digikala.com",
        SPLatinFullName: "ali nooshabadi",
        label: "Morteza Faraji Farshd",
        value: "128"},
        {Department: "HR",
        EmailAddress: "Morteza.Faraji@digikala.com",
        SPLatinFullName: "pooyan feizian",
        label: "Morteza Faraji Farshd",
        value: "129"},

    ];
    public static NominationData:NominationData ={
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
    }
      ],
        User:{
        AvatarUrl: "/PublishingImages/760674.png",
        Id: 0,
        ItemId: 10,
        SPLatinFullName: "Abdolhossin Mohammbgnhnad Hashemi",
    },

        LineManager:{
            AvatarUrl: "/PublishingImages/760674.png",
            Id: 0,
            ItemId: 14,
            SPLatinFullName: "Abdolhossin Mohvfvfammad Hashemi",
        },

    };

   
}


