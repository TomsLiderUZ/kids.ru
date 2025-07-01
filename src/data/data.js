export const vocabularyData = [
    {
        id: "course1",
        name: "Курс",
        modules: [
            {
                id: "module1",
                name: "Модуль 1",
                blocks: [
                    {
                        id: "block1",
                        name: "«Знакомство»",
                        lessons: [
                            {
                                id: "lesson1",
                                lesson: "Урок 1",
                                name: "«Приветствия»",
                                words: [
                                    { ru: "Здравствуйте", uz: "Assalomu aleykum" },
                                    { ru: "Привет", uz: "Salom" },
                                    { ru: "Доброе утро", uz: "Hayrli tong" },
                                    { ru: "Добрый день", uz: "Hayrli kun" },
                                    { ru: "Добрый вечер", uz: "Hayrli kech" },
                                    { ru: "Доброй ночи", uz: "Hayrli tun" }
                                ]
                            },
                            {
                                id: "lesson2",
                                lesson: "Урок 2",
                                name: "«Ты или вы?»",
                                words: []
                            }
                        ]
                    },
                    {
                        id: "block2",
                        name: "«Цвета»",
                        lessons: []
                    }
                ]
            },
            {
                id: "module2",
                name: "Модуль 2",
                blocks: [
                    {
                        id: "block1",
                        name: "«Числа»",
                        lessons: [
                            {
                                id: "lesson1",
                                name: "Урок 1 - «Приветствия»",
                                words: [
                                    { ru: "Как ты", uz: "Qalesan" },
                                    { ru: "Что там", uz: "Nima gap" },
                                    { ru: "Телефон", uz: "Telefon" },
                                ]
                            },
                            {
                                id: "lesson2",
                                name: "Урок 2 - «Ты или вы?»",
                                words: []
                            }
                        ]
                    },
                    {
                        id: "block2",
                        name: "«Семья»",
                        lessons: []
                    }
                ]
            },

        ]
    },

];

// 👇 Alohida arraylar "Я знаю" va "Я не знаю" sahifalari uchun 
export const knownWords = [
    { ru: "Здравствуйте", uz: "Assalomu aleykum" },
    { ru: "Привет", uz: "Salom" },
    { ru: "Доброе утро", uz: "Hayrli tong" },
];

export const unknownWords = [
    { ru: "Добрый день", uz: "Hayrli kun" },
    { ru: "Добрый вечер", uz: "Hayrli kech" },
    { ru: "Доброй ночи", uz: "Hayrli tun" },
];
