const TelegramApi = require('node-telegram-bot-api');
require('dotenv').config()
const token = process.env.BOT_TOKEN;
const bot = new TelegramApi(token, { polling: true });
// const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
// const tranzzoApiKey = process.env.PAYMENT_TOKEN;
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('users.db');
const ordersdb = new sqlite3.Database('orders.db');
const ClipboardJS = require('clipboard');
const constructorBtn = require('./constructorBtn');

var coursesMessageStatus = {};

//  Object for calculate data   
var calculateData = {};              
var calculateStatus = {}

// Object for orderStatus
var orderStatus = {};
// Object for order
var order = {};

// Object for order NP
var orderNP = {};

// Object for payment
var payment = {}

// function random
function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

// Async fanction for ordering
const handleOrderThem = async (msg) => {
    const chatId = msg.chat.id;
    if (!order[chatId]) {
        order[chatId] = {}; // Створюємо об'єкт, якщо він не існує
    }
    if (!orderNP[chatId]) {
        orderNP[chatId] = {}; // Створюємо об'єкт, якщо він не існує
    }
    if (!payment[chatId]) {
        payment[chatId] = {}; // Створюємо об'єкт, якщо він не існує
    }
    await bot.sendMessage(chatId, `Оформлення замовлення ✏️📦 
    \nВведіть посилання з пойзон на товар (інструкція є у телеграм каналі https://t.me/poizonInUkraine) 📦🔗`)
    orderStatus[chatId] = 'active_sourse'
}
// Асинхронна функція для обробки обміну валют
const handleCourseThem = async (msg) => {
    const chatId = msg.chat.id;
    coursesMessageStatus[chatId] = 'deactive'
    await bot.sendMessage(chatId, `Наявний обмін валют 🏛️📉`, constructorBtn.course)
}
// Асинхронна функція для contact
const handleContactThem = async (msg) => {
    const chatId = msg.chat.id;
    await handleContactCommand(chatId)
}
// Асинхронна функція для обробки розрахунку ціни товару
const handleCalculateThem = async (msg) => {
    const chatId = msg.chat.id
    if (!calculateData[chatId]) {
        calculateData[chatId] = {}; // Створюємо об'єкт, якщо він не існує
    }
    calculateStatus[chatId] = 'deactive'
    await bot.sendMessage(chatId, `Введіть назву товару із Poizon 📦🚀`);calculateStatus[chatId] = 'active_name';
}

// Оголошуємо асинхронну функцію для обробки команд
const handleCommands = async (msg) => {
    const chatId = msg.chat.id;
    const username = msg.from.username;
    if (!order[chatId]) {
        order[chatId] = {}; // Створюємо об'єкт, якщо він не існує
    }
    if (!orderNP[chatId]) {
        orderNP[chatId] = {}; // Створюємо об'єкт, якщо він не існує
    }
    if (!payment[chatId]) {
        payment[chatId] = {}; // Створюємо об'єкт, якщо він не існує
    }
    if (!calculateData[chatId]) {
        calculateData[chatId] = {}; // Створюємо об'єкт, якщо він не існує
    }
    coursesMessageStatus[chatId] = 'deactive'
    orderStatus[chatId] = 'deactive'
    calculateStatus[chatId] = 'deactive'
    var chatTable = `
    CREATE TABLE IF NOT EXISTS chat (
        chat_id INTEGER PRIMARY KEY,
        username TEXT
    )
    `
    var insertChat = db.prepare('INSERT OR REPLACE INTO chat (chat_id, username) VALUES (?, ?)');
    db.run(chatTable);
    insertChat.run(chatId, username);
    insertChat.finalize(); 


    await bot.sendMessage(chatId, `Привіт, ${msg.chat.first_name}
              \nPoizon In Ukraine Team 🚛📦
              \nМи - ваші надійні компаньйони у світі міжнародних логістичних відправлень! З Poizon у Китаї до України з командою Poizon In Ukraine - ваші товари в безпеці та в надійних руках. 🌍🔒
              \nНаша місія - забезпечити гладку, швидку та ефективну доставку вашого вантажу до дверей вашого бізнесу в Україні. 🚚🏢
              \nМи поєднуємо надсучасну технологію з професіоналізмом та приділяємо увагу кожній деталі, щоб зробити ваш досвід перевезення найкращим. 📲🤝
              \nЗ Poizon In Ukraine, відправте ваші товари з впевненістю та спокоєм! Ваша задача - рости та розширюватися, наша - позбавити вас вагомих логістичних клопотів. 📈🌟
              \nДовірте нам свої доставки, і ми зробимо все можливе, щоб забезпечити ваш успіх. 💼🚀
              \nPoizon In Ukraine - ваш шлях до успіху у світі міжнародних перевезень! 🌐🌈  `, constructorBtn.startMenu);
};

// Оголошуємо асинхронну функцію для обробки команди /contact
const handleContactCommand = async (chatId) => {
    await bot.sendMessage(chatId, `Контакти для зв'язку з нами 📦🔋 
            \n🐼 Instagram - Цікаві пости про Poizon, виставлення товару з Poizon, інформаційні сторіс та пости, новинки 📋🔗
            \n👽 Telegram - Інформаційні пости про товари, доставку, відповіді на питання, допомога, інфо-пости 🦄✨
            \n👻 TikTok - Короткометражні відеоролики про Poizon, меми, навчальні відео, обзори 🐨🍃
            \n🚀 Сайт Poizon In Ukraine - Автоматичні розрахунки та замовлення без контакту з менеджером. Повний автоматизм у якому все: легко, швидко і зручно 🛸🖖`
        , constructorBtn.contacts);
};

function sendPaymentMessage(chatId, username) {
    if (!payment[chatId]) {
        payment[chatId] = {}; // Створюємо об'єкт, якщо він не існує
    }
    var ordercoment = {};
    ordercoment[chatId] = makeid(5)
    var statusDefault = 'Очікування підтвердження оплати 💬✨'
    // const username = msg.chat.id;
    const message = `
      <b>Оплата по номеру карти ⌛💳</b>
      <code>5375411418811043</code>    <b>👈 Копіювати</b>\n<b>ОБОВ'ЯЗКОВИЙ коментарій до оплати 💬✏️</b>
      <code>${ordercoment[chatId]}</code>    <b>👈 Копіювати</b>
    `;

    var insertPayment = ordersdb.prepare('INSERT INTO payment_info (chat_id, username, comment, status) VALUES (?, ?, ?, ?)');
    insertPayment.run(chatId, username, ordercoment[chatId], statusDefault);
    insertPayment.finalize();

    bot.sendMessage(chatId, message, { parse_mode: 'HTML' }, (message) => {
      // Add an event handler for copying text when clicked
      const clipboard = new ClipboardJS('code', {
        container: message.chat.id,
      });
  
      clipboard.on('success', () => {
        bot.sendMessage(chatId, 'Текст скопійовано до буфера обміну.');
      });
  
      clipboard.on('error', () => {
        bot.sendMessage(chatId, 'Не вдалося скопіювати текст.');
      });
    });

    payment.comment = ordercoment;
  }
// Оголошуємо асинхронну функцію для обробки callback-запитів
const handleCallbackQuery = async (query) => {
    const chatId = query.message.chat.id;
    const data = query.data;
    if (data === 'contact') {await handleContactCommand(chatId);} 
    if (data === 'instagram') {await bot.sendMessage(chatId, `Силка на інстаграм сторінку 🔗✨\nhttps://www.instagram.com/poizon.in.ukraine/ 🐼🍃 `);} 
    if (data === 'telegram') {await bot.sendMessage(chatId, `Силка на телеграм спільноту 🔗✨ \nhttps://t.me/poizonInUkraine \🇺🇦🔥`);} 
    if (data === 'tiktok') {await bot.sendMessage(chatId, `Силка на TikTok сторінку 🔗✨ https://www.tiktok.com/@poizon.in.ukraine?_t=8foZ9jcF5SX&_r=1 \🇺🇦🔥`);}
    if (data === 'site') {await bot.sendMessage(chatId, `Сайт Poizon In Ukraine знаходиться у розробці, очікуйте пост в Інстаграм, там ми повідомимо про відкриття сайту Poizon In Ukraine \🇺🇦🔥`);}
    if (data === 'course') {await bot.sendMessage(chatId, `Наявний обмін валют 🏛️📉`, constructorBtn.course)};
    if (data === 'yuanToDolar') {await bot.sendMessage(chatId, `Введіть суму у юанях, для переведення їх у долари 📦💸`); coursesMessageStatus[chatId] = 'active';}
    if (data === 'calculate') {
        if (!calculateData[chatId]) {
            calculateData[chatId] = {}; // Створюємо об'єкт, якщо він не існує
        }
        calculateStatus[chatId] = 'deactive'; 
        await bot.sendMessage(chatId, `Введіть назву товару із Poizon 📦🚀`);
        calculateStatus[chatId] = 'active_name';
    }
    if (data === 'continueorder') {
        await bot.sendMessage(chatId, `Відправка новою поштою. У яку країну бажаєте зробити замовлення? 👻📦`, constructorBtn.orderCountry);
    }

    const firstFourCharacters = data.substring(0, 7);
    if(firstFourCharacters === 'country') {
        orderNP[chatId].country = `${data}`
        bot.sendMessage(chatId, 'Введіть ФІБ (фамілію, ім\'я, по-батькові)')
        orderStatus[chatId] = 'active_fib'
    }

    if (data === 'paymentCrypto'){
        await bot.sendMessage(chatId, 'Оплата криптовалютою поки що не доступна 🌐❌')   
    }
    if (data === 'paymentVisa') {
        const username = query.from.username
        sendPaymentMessage(chatId, username)
    }
}

// Асинхронна функція для обробки обміну валют
const handleMessageCourse = async (msg) => {
    const chatId = msg.chat.id
    const message = msg.text
    const number = parseInt(message)
    if (coursesMessageStatus[chatId] === 'active' && typeof parseFloat(message) === 'number' && !isNaN(parseFloat(message))) {
        let result = number * 0.14
        await bot.sendMessage(chatId, `Результат... ⌛💰`)
        setTimeout(() => {
            return bot.sendMessage(chatId, `${number.toFixed(2)} CNY = ${result.toFixed(2)} USD💸🔥 `)
        }, 2000);
    }
    return coursesMessageStatus[chatId] = 'deactive'
}

// Асинхронна функція для обробки розрахунку ціни товару
const handleCalculate = async (msg) => {
    const chatId = msg.chat.id;
    const message = await msg.text
    if(calculateStatus[chatId] !== 'deactive') {
        switch (calculateStatus[chatId]) {
            case "active_name":
                if (message) {
                    calculateData[chatId].name = message;
                    await bot.sendMessage(chatId, `Введіть вагу товару враховуючи крапку, наприклад: 0.5 📦📊`)
                    return calculateStatus[chatId] = 'active_weight';
                } else {
                    await bot.sendMessage(chatId, 'Я вас не розумію, параметри задані не правильно ✏️❌')
                }
            case "active_weight":
                if (message) {
                    if(typeof parseFloat(message) === 'number' && !isNaN(parseFloat(message))) {
                        calculateData[chatId].weight = parseFloat(message)
                        await bot.sendMessage(chatId, `Введіть ціну у доларах 💸🔥\nПеревести юань у долари можна за командою: /course 💰📤`)
                        return calculateStatus[chatId] = 'active_price'
                    } else {
                        return bot.sendMessage(chatId, `Я вас не розумію, вам потрібно вказати числове значення ✏️❌`)
                    }                    
                } else {
                    await bot.sendMessage(chatId, 'Я вас не розумію, параметри задані не правильно ✏️❌')
                }

            case 'active_price':
                if (message) {
                    if (typeof parseFloat(message) === 'number' && !isNaN(parseFloat(message))) {
                        let number = parseInt(message) 
                        let weightCalculate = calculateData[chatId].weight >= 1 ? (calculateData[chatId].weight / 0.5) * 7.5 : 10
                        if(number < 161) {
                            calculateData[chatId].price = number + weightCalculate
                            await bot.sendMessage(chatId, `Результат... ⌛💰`) 
                            setTimeout(() => {
                                return bot.sendMessage(chatId, 'Дані записалися, переглянути результат можна за командою /clcdata 💬✅')
                            }, 2000);
                        } else if(number >= 161) {
                            calculateData[chatId].price = number + ((number - 161) * 0.35) + weightCalculate
                            await bot.sendMessage(chatId, `Результат... ⌛💰`)
                            setTimeout(() => {
                                return bot.sendMessage(chatId, 'Дані записалися, переглянути результат можна за командою /clcdata 💬✅')
                            }, 2000);
                        }
                    } else {
                        return bot.sendMessage(chatId, `Я вас не розумію, вам потрібно вказати числове значення ✏️❌`)
                    }                    
                } else {
                    await bot.sendMessage(chatId, 'Я вас не розумію, параметри задані не правильно ✏️❌')
                }

        }        
    }
    return calculateStatus[chatId] = 'deactive';
      
}
// Асинхронна функція for command /clcdata 
const handleCalculateData = async (msg) => {
    const chatId = msg.chat.id
    if(calculateData[chatId].name !== '') {
        let weight = calculateData[chatId].weight
        await bot.sendMessage(chatId, `🚀 Дані товара ${calculateData[chatId].name} 
        \n⚖️ Вага: ${weight} кг
        \n📦 Ціна враховуючи логістику, митні податки, перевірку на оригінал, перевірку на дефекти: ${calculateData[chatId].price.toFixed(2)} USD (${calculateData[chatId].price.toFixed(2) * 38} UAH) 💸`)
    } else {
        await bot.sendMessage(chatId, 'У базі немає жодних даних ✏️❌')
    }
}

const handleOrder = async (msg) => {
    const chatId = msg.chat.id
    const message = msg.text
    const username = msg.from.username
    if (orderStatus[chatId] !== 'deactive') {
        switch (orderStatus[chatId]) {
            case 'active_sourse':
                if(orderStatus[chatId] === 'active_sourse' && message) {
                    order[chatId].sourse = message;
                    await bot.sendMessage(chatId, `Введіть назву товару 📦📤`);
                    return orderStatus[chatId] = 'active_name';                    
                } else if (orderStatus[chatId] === 'active_sourse' && !message) {
                    await bot.sendMessage(chatId, 'Я вас не розумію, параметри задані не правильно ✏️❌')
                    return orderStatus[chatId] = 'active_sourse'; 
                }

            case 'active_name':
                if(orderStatus[chatId] === 'active_name' && message) {
                    order[chatId].name = message;
                    await bot.sendMessage(chatId, `Введіть вагу товару 📦⚖️`);
                    return orderStatus[chatId] = 'active_weight';
                } else if(orderStatus[chatId] === 'active_name' && !message) {
                    await bot.sendMessage(chatId, 'Я вас не розумію, параметри задані не правильно ✏️❌')
                    return orderStatus[chatId] = 'active_name'
                }
            case 'active_weight':
                if (typeof parseFloat(message) === 'number' && !isNaN(parseFloat(message)) && message) {
                    order[chatId].weight = message;
                    await bot.sendMessage(chatId, `Введіть розмір (наприклад XS, XXL, 36, 38), якщо товар безрозмірний напишіть "немає" 📦🔋`);
                    return orderStatus[chatId] = 'active_size';
                } else if(orderStatus[chatId] === 'active_weight' && !message) {
                    await bot.sendMessage(chatId, `Я вас не розумію, вам потрібно вказати числове значення ✏️❌`);
                    return orderStatus[chatId] = 'active_weight'
                }
            case 'active_size':
                if(orderStatus[chatId] === 'active_size' && message){
                    order[chatId].size = message;
                    await bot.sendMessage(chatId, `Введіть ціну посилки у USD($) враховуючи логістику і т.п 💬💸
                        \nРозрахувати посилку можна за командою /calculate 📦✏️`);
                    return orderStatus[chatId] = 'active_price';    
                } else if(orderStatus[chatId] === 'active_size' && !message) {
                    await bot.sendMessage(chatId, 'Я вас не розумію, параметри задані не правильно ✏️❌')
                    return orderStatus[chatId] = 'active_size'
                }
            case 'active_price':
                if (message !== '/calculate' && orderStatus[chatId] === 'active_price' && message) {
                    order[chatId].price = parseFloat(message);
                    await bot.sendMessage(chatId, `Скріншот товара 📦🔍`);
                    return orderStatus[chatId] = 'active_photo';
                } else if (orderStatus[chatId] === 'active_price' && !message) {
                    await bot.sendMessage(chatId, 'Я вас не розумію, параметри задані не правильно ✏️❌')
                    return orderStatus[chatId] = 'active_price'
                }
            case 'active_photo':
                if (orderStatus[chatId] === 'active_photo' && msg.photo) {
                    const largestPhoto = msg.photo[msg.photo.length - 1];
                    const fileID = largestPhoto.file_id;
                    const file = await bot.getFile(fileID);
                    const filePath = file.file_path;
                    var statusDefault = 'Очікування підтвердження оплати 💬✨'
                    order[chatId].photo = `https://api.telegram.org/file/bot${token}/${filePath}`;
                    const orderInfo = `Силка на товар із Poizon: ${order[chatId].sourse} 📦🔗
                        \nНазва товару із Poizon: ${order[chatId].name} 💬✨
                        \nВага посилки: ${order[chatId].weight} ⚖️📤
                        \nРозмір: ${order[chatId].size} ✏️🔥
                        \nЦіна: ${order[chatId].price} USD($) | ${(order[chatId].price * 38).toFixed(2)} UAH 💸✨
                        \nСтатус: ${statusDefault}`;
                    await bot.sendMessage(chatId, orderInfo, constructorBtn.orderButton);
                    
                    var insertOrderGoods = ordersdb.prepare('INSERT INTO goods (chat_id, username, link, name, weight, size, photo, dollar_price, uah_price) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)');
                    insertOrderGoods.run(chatId, username, order[chatId].sourse, order[chatId].name, order[chatId].weight, order[chatId].size, order[chatId].photo, order[chatId].price, `${order[chatId].price * 38}`);
                    insertOrderGoods.finalize();

                } else if(orderStatus[chatId] === 'active_photo') {
                    await bot.sendMessage(chatId, 'Це не фотографія, попробуйте ще раз 📷❌')
                    return orderStatus[chatId] = 'active_photo';
                }
            case 'active_fib':
                if (orderStatus[chatId] === 'active_fib' && message){
                    orderNP[chatId].fib = message;
                    await bot.sendMessage(chatId, 'Введіть електронну пошту 📧📤');
                    return orderStatus[chatId] = 'active_email';
                } else if(orderStatus[chatId] === 'active_fib' && !message) {
                    await bot.sendMessage(chatId, 'Я вас не розумію, параметри задані не правильно ✏️❌')
                    return orderStatus[chatId] = 'active_fib'
                }
            case 'active_email':
                if (orderStatus[chatId] === 'active_email' && message) {
                    orderNP[chatId].email = message;
                    await bot.sendMessage(chatId, 'Введіть номер телефону ☎️📶');
                    return orderStatus[chatId] = 'active_tel';
                } else if(orderStatus[chatId] === 'active_email' && !message) {
                    await bot.sendMessage(chatId, 'Я вас не розумію, параметри задані не правильно ✏️❌')
                    return orderStatus[chatId] = 'active_email';
                }
            case 'active_tel':
                if (orderStatus[chatId] === 'active_tel' && message){
                    orderNP[chatId].tel = message;
                    await bot.sendMessage(chatId, 'Місто та область доставки 🌐✨');
                    return orderStatus[chatId] = 'active_city';
                } else if(orderStatus[chatId] === 'active_tel' && !message) {
                    await bot.sendMessage(chatId, 'Я вас не розумію, параметри задані не правильно ✏️❌')
                    return orderStatus[chatId] = 'active_tel'
                }
            case 'active_city':
                if (orderStatus[chatId] === 'active_city' && message){
                    orderNP[chatId].city = message;
                    await bot.sendMessage(chatId, 'Номер нової пошти 🎯💬');
                    return orderStatus[chatId] = 'active_numberNP';
                } else if(orderStatus[chatId] === 'active_city' && !message) {
                    await bot.sendMessage(chatId, 'Я вас не розумію, параметри задані не правильно ✏️❌')
                    return orderStatus[chatId] = 'active_city';
                }
            case 'active_numberNP':
                if (orderStatus[chatId] === 'active_numberNP' && message){
                    if(typeof parseFloat(message) === 'number' && !isNaN(parseFloat(message))) {
                        orderNP[chatId].numberNP = message;
                        await bot.sendMessage(chatId, 'Оплата доставки 📦✏️', constructorBtn.paymentButton);
                        payment.chatid = chatId;

                        var insertOrderNP = ordersdb.prepare('INSERT INTO np_info (chat_id, username, fib, tel, email, country, city, numberNP) VALUES (?, ?, ?, ?, ?, ?, ?, ?)');
                        insertOrderNP.run(chatId, username, orderNP[chatId].fib, orderNP[chatId].tel, orderNP[chatId].email, orderNP[chatId].country, orderNP[chatId].city, orderNP[chatId].numberNP);
                        insertOrderNP.finalize();
                        
                    } else {
                        await bot.sendMessage(chatId, `Я вас не розумію, вам потрібно вказати числове значення ✏️❌`);
                    }
                } else if(orderStatus[chatId] === 'active_numberNP' && !message) {
                    await bot.sendMessage(chatId, 'Я вас не розумію, параметри задані не правильно ✏️❌')
                    return orderStatus[chatId] = 'active_numberNP';
                }
        }
    }
    orderStatus[chatId] = 'deactive';

}

// Функція для налаштування бота і реєстрації команд
const start = async (msg) => {
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