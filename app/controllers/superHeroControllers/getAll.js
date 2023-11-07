const { Hero } = require("../../models");

const getAll = async (req, res, next) => {
  try {
    const totalPages = await Hero.count();
    const { page = 1 } = req.query;
    const result = await Hero.find()
      .limit(5)
      .skip((page - 1) * 5);
    res.status(200).json({
      totalPages: Math.ceil(totalPages / 5),
      page,
      data: result,
    });
  } catch (err) {
    err.status = 400;
    err.message = "Request fail";
    next(err);
  }
};

module.exports = getAll;
