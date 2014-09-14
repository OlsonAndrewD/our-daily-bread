angular.module("odb").value("people", [
    {
        name: "Me",
        days: [
            { date: '9/10/2014', completed: false },
            { date: '9/11/2014', completed: true, scripture: "Ps 34", response: "Tasted and saw that the Lord is good. :-)" },
            { date: '9/12/2014', completed: false },
            { date: '9/13/2014', completed: true, scripture: "Ps 35" },
            { date: '9/14/2014', completed: true, scripture: "Ps 36" },
            { date: '9/15/2014', completed: false },
        ]
    },
    {
        name: "Alice",
        days: [
            { date: '9/10/2014', completed: true, scripture: "Gal 1" },
            { date: '9/11/2014', completed: false },
            { date: '9/12/2014', completed: true, scripture: "Gal 2" },
            { date: '9/13/2014', completed: true, scripture: "Gal 3" },
            { date: '9/14/2014', completed: true, scripture: "Gal 4" },
            { date: '9/15/2014', completed: false },
        ]
    },
    {
        name: "Bob",
        days: [
            { date: '9/10/2014', completed: true, scripture: "Gal 6" },
            { date: '9/11/2014', completed: true, scripture: "Eph 1" },
            { date: '9/12/2014', completed: true, scripture: "Eph 2", response: "I'm part of God's workmanship/masterpiece. I should think more often about what work God prepared in advance for me to do." },
            { date: '9/13/2014', completed: false },
            { date: '9/14/2014', completed: true, scripture: "Eph 3" },
            { date: '9/15/2014', completed: false },
        ]
    }
]);
