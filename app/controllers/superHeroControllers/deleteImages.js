const { Hero } = require("../../models");
const createError = require("../../service/createError");
const { deleteResource } = require("../../service/cloudinaryLoader");

const deleteImage = async (req, res, next) => {
  try {
    const { id } = req.body;
    const result = await Hero.findById(id);
    if (!result) {
      next(createError(400, `Hero not found`));
    }
    const data = await Hero.findByIdAndUpdate(id, {
      $pull: { Images: { id: req.params.id } },
    });
    if (!data) {
      next(createError(400, `Image delete error`));
    }
    await deleteResource(req.params.id);
    res.status(201).json({
      message: "Images removed",
      data,
    });
  } catch (err) {
    err.status = 400;
    err.message = "Image delete error";
    console.log(err);
    next(err);
  }
};

module.exports = deleteImage;
