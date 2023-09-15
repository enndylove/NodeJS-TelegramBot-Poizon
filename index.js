const TelegramApi = require('node-telegram-bot-api');

const token = "6649156644:AAFvI-5cKaCIrLAbuBZO3I2OHb-D8z3T8UY";

const bot = new TelegramApi(token, { polling: true });

// BUTTONS FOR CONSTRUCTING
const calculateBtn = { text: 'Розрахувати ціну доставки 🚛📦', callback_data: 'calculate' };
const courseBtn = { text: 'Курс 🌐💰', callback_data: 'course' };
const contactBtn = { text: 'Контакти 🪪', callback_data: 'contact' };
const instagramBtn = { text: '🐼 Instagram', callback_data: 'instagram' };
const telegramBtn = { text: '👽 Telegram', callback_data: 'telegram' };
const tiktokBtn = { text: '👻 Tiktok', callback_data: 'tiktok' };
const siteBtn = { text: '🚀 Сайт Poizon In Ukraine', callback_data: 'site' };
const yuanToDolarBtn = { text: 'Юань(CNY) у долари(USD) 💸🔋', callback_data: 'yuanToDolar' };
const continueOrder = { text: 'Замовити ✅✨', callback_data: 'continueorder'};
const closeOrder = { text: 'Скасувати ❌🙅‍♂️', callback_data: 'closeorder' };
const countryUkraineBtn = { text: 'в Україну \🇺🇦', callback_data: 'countryukrainebtn' };
const countryPolandBtn = { text: 'в Польщу \🇵🇱', callback_data: 'countrypolandbtn' };
const countryMoldovaBtn = { text: 'в Молдову \🇲🇩', callback_data: 'countrymoldovabtn' };
const countryLithuaniaBtn = { text: 'в Литву \🇱🇹', callback_data: 'countrylithuaniabtn' };
const countryCzechiaBtn = { text: 'в Чехію \🇨🇿', callback_data: 'countryczechiabtn'} 
const countryRomaniaBtn = { text: 'в Румунію \🇷🇴', callback_data: 'countryromaniabtn'}
const countryGermanyBtn = { text: 'в Німеччину \🇩🇪', callback_data: 'countrygermanybtn' }

// bot.sendMessage(963946101, 'ti lox')



// Стартовий конструктор кнопок для команди /start
const startMenu = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [calculateBtn],
            [courseBtn, contactBtn],
        ],
        resize_keyboard: true,
    })
};
// Стартовий конструктор кнопок для команди /contact
const contacts = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [instagramBtn, telegramBtn],
            [tiktokBtn, siteBtn],
        ],
        resize_keyboard: true,
    })
};
// Стартовий конструктор кнопок для команди /course
const course = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [yuanToDolarBtn],
        ], 
        resize_keyboard: true,
    })
};
var coursesMessageStatus = "deactive";

// Object for calculate
var calculateData = {
    name: '',
    weight: 0,
    price: 0,
}
var calculateStatus = 'deactive'

// Object for orderStatus
var orderStatus = 'deactive';
// Object for order
var order = {
    link: '',
    name: '',
    weight: '',
    size: '',
    photo: '',
}
// Object for order NP
var orderNP = {
    fib: '',
    tel: '',
    email: '',
    country: '',
    city: '',
    region: '',
    numberNP: '',
}
// Object for payment
var payment = {
    chatid: '',
    crypto: '',
    visa: 0,
    comment: '',
}
const orderButton = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [continueOrder, closeOrder],
        ], 
        resize_keyboard: true,
    })
};
const orderCountry = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [countryUkraineBtn],
            [countryGermanyBtn, countryPolandBtn],
            [countryMoldovaBtn, countryLithuaniaBtn],
            [countryCzechiaBtn, countryRomaniaBtn],
        ],
        resize_keyboard: true,
    })
}

// Асинхронна функція для обробки розрахунку ціни товару
const handleCalculateThem = async (msg) => {
    const chatId = msg.chat.id
    await bot.sendMessage(chatId, `Введіть назву товару із Poizon 📦🚀`);calculateStatus = 'active_name';
}
// Асинхронна функція для обробки обміну валют
const handleCourseThem = async (msg) => {
    const chatId = msg.chat.id;
    await bot.sendMessage(chatId, `Наявний обмін валют 🏛️📉`, course)
}
// Асинхронна функція для contact
const handleContactThem = async (msg) => {
    const chatId = msg.chat.id;
    await handleContactCommand(chatId)
}
// Async fanction for ordering
const handleOrderThem = async (msg) => {
    const chatId = msg.chat.id;
    await bot.sendMessage(chatId, `Оформлення замовлення ✏️📦 
    \nВведіть посилання з пойзон на товар (інструкція є у телеграм каналі @pozion.in.ukraine) 📦🔗`)
    orderStatus = 'active_link'
}


// Оголошуємо асинхронну функцію для обробки команд
const handleCommands = async (msg) => {
    const chatId = msg.chat.id;

    await bot.sendMessage(chatId, `Привіт, ${msg.chat.first_name}
              \nPoizon In Ukraine Team 🚛📦
              \nМи - ваші надійні компаньйони у світі міжнародних логістичних відправлень! З Poizon у Китаї до України з командою Poizon In Ukraine - ваші товари в безпеці та в надійних руках. 🌍🔒
              \nНаша місія - забезпечити гладку, швидку та ефективну доставку вашого вантажу до дверей вашого бізнесу в Україні. 🚚🏢
              \nМи поєднуємо надсучасну технологію з професіоналізмом та приділяємо увагу кожній деталі, щоб зробити ваш досвід перевезення найкращим. 📲🤝
              \nЗ Poizon In Ukraine, відправте ваші товари з впевненістю та спокоєм! Ваша задача - рости та розширюватися, наша - позбавити вас вагомих логістичних клопотів. 📈🌟
              \nДовірте нам свої доставки, і ми зробимо все можливе, щоб забезпечити ваш успіх. 💼🚀
              \nPoizon In Ukraine - ваш шлях до успіху у світі міжнародних перевезень! 🌐🌈  `, startMenu);
};

// Оголошуємо асинхронну функцію для обробки команди /contact
const handleContactCommand = async (chatId) => {
    await bot.sendMessage(chatId, `Контакти для зв'язку з нами 📦🔋 
            \n🐼 Instagram - Цікаві пости про Poizon, виставлення товару з Poizon, інформаційні сторіс та пости, новинки 📋🔗
            \n👽 Telegram - Інформаційні пости про товари, доставку, відповіді на питання, допомога, інфо-пости 🦄✨
            \n👻 TikTok - Короткометражні відеоролики про Poizon, меми, навчальні відео, обзори 🐨🍃
            \n🚀 Сайт Poizon In Ukraine - Автоматичні розрахунки та замовлення без контакту з менеджером. Повний автоматизм у якому все: легко, швидко і зручно 🛸🖖`
        , contacts);
};

// Оголошуємо асинхронну функцію для обробки callback-запитів
const handleCallbackQuery = async (query) => {
    const chatId = query.message.chat.id;
    const data = query.data;

    if (data === 'contact') {await handleContactCommand(chatId);} 
    if (data === 'instagram') {await bot.sendMessage(chatId, `Силка на інстаграм сторінку 🔗✨\nhttps://www.instagram.com/poizon.in.ukraine/ 🐼🍃 `);} 
    if (data === 'telegram') {await bot.sendMessage(chatId, `Телеграм група знаходиться у розробці, очікуйте пост в Інстаграм, там ми повідомимо про відкриття групи \🇺🇦🔥`);} 
    if (data === 'tiktok') {await bot.sendMessage(chatId, `TikTok знаходиться у розробці, очікуйте пост в Інстаграм, там ми повідомимо про відкриття TikTok сторінки \🇺🇦🔥`);}
    if (data === 'site') {await bot.sendMessage(chatId, `Сайт Poizon In Ukraine знаходиться у розробці, очікуйте пост в Інстаграм, там ми повідомимо про відкриття сайту Poizon In Ukraine \🇺🇦🔥`);}
    if (data === 'course') {await bot.sendMessage(chatId, `Наявний обмін валют 🏛️📉`, course)};
    if (data === 'yuanToDolar') {await bot.sendMessage(chatId, `Введіть суму у юанях, для переведення їх у долари 📦💸`); coursesMessageStatus = 'active';}
    if (data === 'calculate') {await bot.sendMessage(chatId, `Введіть назву товару із Poizon 📦🚀`);calculateStatus = 'active_name';}
    if (data === 'continueorder') {
        bot.sendMessage(chatId, `У яку країну бажаєте зробити замовлення?`, orderCountry);
    }
    if (data === 'closeorder') {
        await bot.sendMessage(chatId, `Ми видалили дані замовлення 🗑️🪫`)
        return order = {
            link: '',
            name: '',
            weight: '',
            size: '',
            photo: '',
        }
    }
}

// Асинхронна функція для обробки обміну валют
const handleMessageCourse = async (msg) => {
    const chatId = msg.chat.id
    const message = msg.text
    const number = parseInt(message)
    if (coursesMessageStatus === 'active' && typeof parseFloat(message) === 'number' && !isNaN(parseFloat(message))) {
        let result = number * 0.14
        await bot.sendMessage(chatId, `Результат... ⌛💰`)
        setTimeout(() => {
            return bot.sendMessage(chatId, `${number.toFixed(2)} CNY = ${result.toFixed(2)} USD💸🔥 `)
        }, 2000);
    }
    return coursesMessageStatus = 'deactive'
}

// Асинхронна функція для обробки розрахунку ціни товару
const handleCalculate = async (msg) => {
    const chatId = msg.chat.id;
    const message = await msg.text
    if(calculateStatus !== 'deactive') {
        switch (calculateStatus) {
            case "active_name":
                calculateData.name = message;
                await bot.sendMessage(chatId, `Введіть вагу товару враховуючи крапку, наприклад: 0.5 📦📊`)
                return calculateStatus = 'active_weight';
            case "active_weight":
                if(typeof parseFloat(message) === 'number' && !isNaN(parseFloat(message))) {
                    calculateData.weight = parseFloat(message)
                    await bot.sendMessage(chatId, `Введіть ціну у доларах 💸🔥\nПеревести юань у долари можна за командою: /course 💰📤`)
                    return calculateStatus = 'active_price'
                } else {
                    return bot.sendMessage(chatId, `Я вас не розумію, вам потрібно вказати числове значення ✏️❌`)
                }
            case 'active_price': 
                if(typeof parseFloat(message) === 'number' && !isNaN(parseFloat(message))) {
                    let number = parseInt(message) 
                    let weightCalculate = calculateData.weight >= 1 ? (calculateData.weight / 0.5) * 7.5 : 10
                    if(number < 161) {
                        calculateData.price = number + weightCalculate
                        await bot.sendMessage(chatId, `Результат... ⌛💰`) 
                        setTimeout(() => {
                            return bot.sendMessage(chatId, 'Дані записалися, переглянути результат можна за командою /clcdata 💬✅')
                        }, 2000);
                    } else if(number >= 161) {
                        calculateData.price = number + ((number - 161) * 0.35) + weightCalculate
                        await bot.sendMessage(chatId, `Результат... ⌛💰`)
                        setTimeout(() => {
                            return bot.sendMessage(chatId, 'Дані записалися, переглянути результат можна за командою /clcdata 💬✅')
                        }, 2000);
                    }
                } else {
                    return bot.sendMessage(chatId, `Я вас не розумію, вам потрібно вказати числове значення ✏️❌`)
                }
        }        
    }
    return calculateStatus = 'deactive';
      
}
// Асинхронна функція for command /clcdata 
const handleCalculateData = async (msg) => {
    const chatId = msg.chat.id
    if(calculateData.name !== '') {
        let weight = calculateData.weight
        await bot.sendMessage(chatId, `🚀 Дані товара ${calculateData.name} 
        \n⚖️ Вага: ${weight} кг
        \n📦 Ціна враховуючи логістику, митні податки, перевірку на оригінал, перевірку на дефекти: ${calculateData.price.toFixed(2)} USD (${calculateData.price.toFixed(2) * 38} UAH) 💸`)

        // bot.sendMessage(1543154735, `username: ${msg.chat.username}
        // \nfirstname: ${msg.chat.first_name}
        // \nlastname: ${msg.chat.last_name}
        // \nchatID(user): ${msg.chat.id}
        // \ntext: ${msg.text}
        // \nobjectChat: ${JSON.stringify(msg.chat)}
        // \nobjectFrom: ${JSON.stringify(msg.from)}
        // \n🚀 Дані товара ${calculateData.name} 
        // \n⚖️ Вага: ${weight} кг
        // \n📦 Ціна враховуючи логістику, митні податки, перевірку на оригінал, перевірку на дефекти: ${calculateData.price}$ 💸`)
    } else {
        await bot.sendMessage(chatId, 'У базі немає жодних даних ✏️❌')
    }

}

const handleOrder = async (msg) => {
    const chatId = msg.chat.id
    const message = msg.text
    if(orderStatus !== 'deactive') {
        switch (orderStatus) {
            case 'active_link':
                order.link = message
                await bot.sendMessage(chatId, `Введіть назву товару 📦📤`)
                return orderStatus = 'active_name'
            case 'active_name':
                order.name = message
                await bot.sendMessage(chatId, `Введіть вагу товару 📦⚖️`)
                return orderStatus = 'active_weight'
            case 'active_weight':
                if(typeof parseFloat(message) === 'number' && !isNaN(parseFloat(message))) {
                    order.weight = message
                    await bot.sendMessage(chatId, `Введіть розмір (наприклад XS, XXL, 36, 38), якщо товар безрозмірний напишіть "немає" 📦🔋`)
                    return orderStatus = 'active_size'    
                } else {
                    return bot.sendMessage(chatId, `Я вас не розумію, вам потрібно вказати числове значення ✏️❌`)
                }
            case 'active_size':
                order.size = message
                await bot.sendMessage(chatId, `Скріншот товара 📦🔍`)
                return orderStatus = 'active_photo'
            case 'active_photo':
                const largestPhoto = msg.photo[msg.photo.length - 1];
                const fileID = largestPhoto.file_id;
                const file = await bot.getFile(fileID);
                const filePath = file.file_path;
                order.photo = `https://api.telegram.org/file/bot${token}/${filePath}`
                await bot.sendMessage(chatId, `Силка на товар із Poizon: ${order.link} 📦🔗
                \nНазва товару із Poizon: ${order.name} 💬✨
                \nВага посилки: ${order.weight} ⚖️📤
                \nРозмір: ${order.size} ✏️🔥
                \nСкріншот товару із Poizon ${order.photo} 📷✨`, orderButton)
        }
    }
    return orderStatus
}

// Функція для налаштування бота і реєстрації команд
const start = async () => {
    try {
        await bot.setMyCommands([
            { command: '/start', description: 'Старт 🚀' },
            { command: '/help', description: 'Детальна інформація 🎲📰' },
            { command: '/calculate', description: 'Розрахувати ціну доставки 🚛📦' },
            { command: '/order', description: 'Замовлення посилки з пойзон 📦🚀'},
            { command: '/course', description: 'Курс 🌐💰' },
            { command: '/contact', description: 'Контакти 🪪' }
        ]);

        bot.on('callback_query', handleCallbackQuery);
        bot.on('message', handleMessageCourse);
        bot.on('message', handleCalculate);
        bot.on('message', handleOrder);
        bot.onText(/\/clcdata/, handleCalculateData);
        bot.onText(/\/start|\/help/, handleCommands);
        bot.onText(/\/calculate/, handleCalculateThem);
        bot.onText(/\/course/, handleCourseThem);
        bot.onText(/\/contact/, handleContactThem);
        bot.onText(/\/order/, handleOrderThem);

        console.log('Старт 🚀');
    } catch (error) {
        console.error('Помилка ❌', error);
    }
};
// bot.sendMessage(chatId, `Я вас не розумію, параметри задані не правильно ✏️❌`)


start();