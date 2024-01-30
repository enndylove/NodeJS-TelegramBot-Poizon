# NodeJS | TelegramBot - Poizon <img src="https://img.shields.io/static/v1?label=🤖 Telegram Bot&message=Trider Graph 📈&color=ffffff" />

![](https://i.ibb.co/WyBPTqz/300x300-logo.png)

## Papar Information

- Title: `NodeJS | TelegramBot - Poizon`
- Authors: [`enndylove`](https://github.com/enndylove)

## Install & Dependence

    "clipboard": "^2.0.11",
    "dotenv": "^16.3.1",
    "fetch": "^1.1.0",
    "node-fetch": "^2.7.0",
    "node-telegram-bot-api": "^0.61.0",
    "nodemon": "^3.0.1",
    "sqlite3": "^5.1.6"

# How is this project used?

- Install node_modules
  ```
  npm install
  ```
- Create .env file, and write:
  ```
  BOT_TOKEN='YOUR_BOT_TOKEN'
  ADMIN_CHAT_ID='YOUR_CHAT_ID'
  CARD_NUMBER='YOUR_CARD_NUMBER'
  ```
- For development / run server
  ```
  npm run dev
  ```
- For use / run server
  ```
  npm run start
  ```
- For build project
  ```
  npm run build
  ```

# About the project

### The idea is to order goods from the Chinese platform Poizon to Ukraine online.

This Chinese platform works only within China. But delivery directly from China was carried out by logistics in Ukraine with a certain price. `This telegram bot takes into account the shipping price according to the formula, and the shipping price depends on the weight of the product. This Telegram bot has currency exchange from Ukrainian hryvnia to Chinese yuan.` There are also contacts.

## How to use

In order to use this Telegram bot, it is necessary to specify the `TOKEN` of the Telegram bot in the .env file (it can be taken from the Telegram bot [BotFather](https://t.me/BotFather) ), specify in `ADMIN_CHAT_ID` the chat ID of the person who will receive orders, specify in `CARD_NUMBER` is the number of your card to which customers should withdraw money with a certain comment **(which is issued to them and which is sent to you to make sure that it is a payment from a specific person)**

## Code Details

`Using statuses relative to the user's chat id.` Each user has his own object with an order, from currency exchange, so that no error occurs. `Using comments for payment`, which are generated automatically and sent to both the administrator and the user to pay for the parcel. The formula for calculating logistics depending on the value and weight of the parcel. `Currency calculator.` `Contacts.` Use of asynchronous functions, `function callbacks.` Possibility of ordering to another country. Filling in information via switch case. `If the user sends text instead of a number, or a picture instead of text, then an error occurs that prevents the order from continuing until the user enters the correct data.`
Of course, instead of sending the order data to the admin, `you can use the database,` or record each user in the database, `his chat ID, first name, last name,` and later make advertising mailings using the database. Eating a database with a telegram bot `is very useful for future mailings`, but it is not so important in this particular project

## Directory Hierarchy

```
|—— .github
|    |—— workflows
|        |—— node.js.yml
|        |—— npm-publish.yml
|—— .gitignore
|—— .env.example
|—— buttons.js
|—— constructorBtn.js
|—— index.js
|—— package-lock.json
|—— package.json
```

### Tested Platform

- software
  ```
  OS: Debian unstable (May 2021), Ubuntu LTS
  Python: 3.8.5 (anaconda)
  PyTorch: 1.7.1, 1.8.1
  ```
- hardware
  ```
  CPU: Intel Xeon 6226R
  GPU: Nvidia RTX3090 (24GB)
  ```

## License

#### This project is licensed under the [MIT License](https://github.com/enndylove/NodeJS-TelegramBot-Poizon/blob/main/LICENCE.md).

# Delicious coffee to you friends ☕
