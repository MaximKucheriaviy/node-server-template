const server = require('./modules/server.js'); 
const file = require('fs');

const parameter = JSON.parse(file.readFileSync('./options.json', 'utf8'));



server(parameter.sourceDirectory).listen(process.env.PORT || parameter.serverPort, err => {
    if(err){
        console.log(err);
        return;
    }
    console.log(`Sever is runing on port:${parameter.serverPort}.....`);
})


console.log("Telega test...");
const runingProcess = [];
const time = {
    hours: 11,
    minutes: 40,
    seconds: 00
}

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
const bot = new TelegramBot('5547277633:AAGNHHebEhhs7AXX7gGAcPRX4lWXEXuoxIc', { polling: true });
bot.on('message', msg => {
    console.log(msg.text);
    const chatId = msg.chat.id;
    if(msg.text === "Слава Україні" || msg.text === "/Слава Україні"){
        bot.sendMessage(chatId, `Героям слава! 🇺🇦`);
        
        // console.log("I am if is done.......");
        // let triger = true;
        // setInterval(() => {
        //     const data = new Date();
        //         if(time.hours === data.getHours() && time.minutes === data.getMinutes() && time.seconds === data.getSeconds() && triger){
        //             console.log("I am sending.......");
        //             triger = false;
        //             bot.sendMessage(chatId, `I am sendin message at ${data.getHours}: ${data.getMinutes}` );
        //         }
        //         if(time.seconds + 3 === data.getSeconds()){
        //             triger = true;
        //         }
        // }, 1000)
    }
    else if(msg.text === "Кажи час" || msg.text === '/Кажи час'){
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
    else if(msg.text === "Стоп" || msg.text === '/Стоп'){
        stopProcess(chatId);
    }
})
