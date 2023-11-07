const defaultError = async (req, res, next) => {
    res.status(404).end();
}



module.exports = defaultError;