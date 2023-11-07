const { Hero } = require("../../models");
const createError = require("../../service/createError");
const { deleteResource } = require("../../service/cloudinaryLoader");

const deleteHero = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await Hero.findById(id);
    if (!data) {
      next(createError(400, "Wrong ID"));
      return;
    }
    for (let i = 0; i < data.Images.length; i++) {
      await deleteResource(data.Images[i].id);
    }
    await Hero.findByIdAndDelete(id);
    res.status(200).json({
      message: "Hero deleted",
      data,
    });
  } catch (err) {
    err.status = 400;
    err.message = "Request fail";
    next(err);
  }
};

module.exports = deleteHero;
