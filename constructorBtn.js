const buttons = require('./buttons');

// Стартовий конструктор кнопок для команди /start
const startMenu = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [buttons.calculateBtn],
            [buttons.courseBtn, buttons.contactBtn],
        ],
        resize_keyboard: true,
    })
};
exports.startMenu = startMenu;
// Стартовий конструктор кнопок для команди /contact
const contacts = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [buttons.instagramBtn, buttons.telegramBtn],
            [buttons.tiktokBtn, buttons.siteBtn],
        ],
        resize_keyboard: true,
    })
};
exports.contacts = contacts;
// Стартовий конструктор кнопок для команди /course
const course = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [buttons.yuanToDolarBtn],
        ],
        resize_keyboard: true,
    })
};
exports.course = course;
const orderButton = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [buttons.continueOrder]
        ],
        resize_keyboard: true,
    })
};
exports.orderButton = orderButton;
const orderCountry = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [buttons.countryUkraineBtn],
            [buttons.countryGermanyBtn, buttons.countryPolandBtn],
            [buttons.countryMoldovaBtn, buttons.countryLithuaniaBtn],
            [buttons.countryCzechiaBtn, buttons.countryRomaniaBtn],
        ],
        resize_keyboard: true,
    })
};
exports.orderCountry = orderCountry;
const paymentButton = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [buttons.paymentCrypto],
            [buttons.paymentVisa]
        ],
        reply_keyboard: true,
    })
};
exports.paymentButton = paymentButton;
