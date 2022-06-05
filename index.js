const file = require('fs');
const parameter = JSON.parse(file.readFileSync('./options.json', 'utf8'));

const server = require('./modules/server.js'); 
const telegramBot = require('./telegramBot/telega.js')



server(parameter.sourceDirectory).listen(process.env.PORT || parameter.serverPort, err => {
    if(err){
        console.log(err);
        return;
    }
    console.log(`Sever is runing on port:${parameter.serverPort}.....`);
})

telegramBot(parameter.telegramBotToken);
