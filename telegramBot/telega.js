module.exports = (token) => {
    const messageEvent = require('../modules/events.js');
    const runingProcess = [];
    const file = require('fs');
    
    function startProcess(chat, callback){
        if(runingProcess.some(item => item.chat === chat)){
            bot.sendMessage(chat, "Зупеніть спочатку попередній процес");
            return;
        }
        bot.sendMessage(chat, "Добре");
        callback();
    }
    
    function stopProcess(chat){
        const process = runingProcess.find(item => item.chat === chat)
        if(!process){
            bot.sendMessage(chat, "Немає запущених процесів");
            return;
        }
        runingProcess.splice(runingProcess.findIndex(item => item.chat), 1);
        clearInterval(process.procesId);
        bot.sendMessage(chat, `Зупиняю процес ${process.procesName}`);
        console.log(`Зупинка процеса "${process.procesName}" в чаті "${process.chat}"`);
    }
    
    const TelegramBot = require('node-telegram-bot-api');
    const { colours } = require('nodemon/lib/config/defaults');
    const bot = new TelegramBot(token, { polling: true });
    console.log("Telega test...");
    bot.on('message', msg => {
        console.log(msg.text);
        const chatId = msg.chat.id;
        if(msg.text === "Слава Україні" || msg.text === "/Слава Україні"){
            bot.sendMessage(chatId, `Героям слава! 🇺🇦`);
        }
        else if(msg.text === "Кажи час" || msg.text === '/Кажи час'){
            startProcess(chatId, ()=>{
                const process = {};
                process.procesName = "Кажи час";
                process.chat = chatId;
                process.procesId = setInterval(() => {
                    const date = new Date();
                    bot.sendMessage(chatId, `У Києві ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`);
                }, 10000, { reply_markup: {}})
                console.log(`Старт процеса "${process.procesName}" в чаті "${process.chat}"`);
                runingProcess.push(process);
            })
        }
        else if(msg.text === "Стоп" || msg.text === '/Стоп'){
            stopProcess(chatId);
        }
        else if (msg.text === "start" || msg.text === "/start") {
            bot.sendMessage(chatId, "Привіт мене звуть Nodik", {
                reply_markup: {
                    keyboard: [
                        ['Підписатись на повідомлення',  'Припинити підписку'],
                        ['Кажи час',  'Стоп'],
                    ]
                }
            })
        }
        else if (msg.text === 'Підписатись на повідомлення') {
            file.readFile('./telegramBot/data/subscribers.json', 'utf8', (err, data) => {
                if (err) {
                    console.log(err);
                }
                let subscribers = JSON.parse(data);     
                if (Array.isArray(subscribers) && !subscribers.includes(chatId)) {
                    subscribers.push(chatId);
                    subscribers = JSON.stringify(subscribers);
                    file.writeFile('./telegramBot/data/subscribers.json', subscribers, (err) => {
                        if (err) {
                            console.log(err);
                            return;
                        }
                        console.log(`Subscribers updated (added ${chatId})`);
                    })
                }
            });
        }
        else if (msg.text === 'Припинити підписку') {
            file.readFile('./telegramBot/data/subscribers.json', 'utf8', (err, data) => {
                if (err) {
                    console.log(err);
                }
                let subscribers = JSON.parse(data);     
                if (Array.isArray(subscribers) && subscribers.includes(chatId)) {
                    subscribers.splice(subscribers.indexOf(chatId), 1);
                    subscribers = JSON.stringify(subscribers);
                    file.writeFile('./telegramBot/data/subscribers.json', subscribers, (err) => {
                        if (err) {
                            console.log(err);
                            return;
                        }
                        console.log(`Subscribers updated (deleted ${chatId})`);
                    })
                }
            });
        }
    })
    bot.on('callback_query', req => {
        console.log(req.data);
        const chatId = req.message.chat.id;
        bot.sendMessage(chatId, "OK");
        if (req.data === "1") {
            startProcess(chatId, ()=>{
                const process = {};
                process.procesName = "Кажи час";
                process.chat = chatId;
                process.procesId = setInterval(() => {
                    const date = new Date();
                    bot.sendMessage(chatId, `У Києві ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`);
                }, 10000)
                console.log(`Старт процеса "${process.procesName}" в чаті "${process.chat}"`);
                runingProcess.push(process);
            })
        }
    })
    messageEvent.on('post-coming', data => {
        file.readFile('./telegramBot/data/subscribers.json', 'utf8', (err, fileData) => {
            const subscribers = JSON.parse(fileData);
            subscribers.forEach(item => {
                bot.sendMessage(item, data.message);
            });
        })
    })
    return {
        bot,
    }
}


//5547277633:AAGNHHebEhhs7AXX7gGAcPRX4lWXEXuoxIc