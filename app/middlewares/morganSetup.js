const morganLogger = require('morgan');
const colors = require('colors');

morganLogger.token('statusColorised', (req, res) => {
    if(res.statusCode >= 500){
        return colors.bgRed(res.statusCode);
    }
    else if(res.statusCode >= 400){
        return colors.bgYellow.black(res.statusCode);
    }
    else if(res.statusCode >= 200){
        return colors.bgGreen.white(res.statusCode);
    }
})

const morganSetup = (token, req, res) => {
    return[
        token.statusColorised(req, res),
        token.method(req,res),
        token.url(req,res),
    ].join(" ");
}


module.exports = {
    morganSetup, 
    morganLogger
};
