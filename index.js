const server = require('./modules/server.js'); 
const port = 3000;
server.listen(port, err => {
    if(err){
        console.log(err);
        return;
    }
    console.log("Serer is runing.....");
})