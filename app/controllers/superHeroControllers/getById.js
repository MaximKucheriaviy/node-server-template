const { Hero } = require("../../models");
const createError = require("../../service/createError");

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await Hero.findById(id);
    if (!data) {
      next(createError(400, "Wrong ID"));
      return;
    }
    res.status(200).json({
      data,
    });
  } catch (err) {
    err.status = 400;
    err.message = "Request fail";
    next(err);
  }
};

module.exports = getById;
