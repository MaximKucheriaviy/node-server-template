const { Hero } = require("../../models");
const createError = require("../../service/createError");

const patchHero = async (req, res, next) => {
  try {
    const { id, value } = req.body;
    const { patchField } = req.params;
    const hero = await Hero.findById(id);
    if (!hero) {
      next(createError(400, `Hero not found`));
      return;
    }
    if (patchField === "nickname") {
      const valueNameResult = await Hero.findOne({ nickname: value });
      if (valueNameResult) {
        next(createError(400, `Hero with nickname ${value} already exist`));
        return;
      }
      const updateResult = await Hero.findByIdAndUpdate(id, {
        nickname: value,
      });
      if (!updateResult) {
        throw new Error();
      }
    } else if (
      patchField === "origin_description" ||
      patchField === "real_name" ||
      patchField === "superpowers" ||
      patchField === "catch_phrase"
    ) {
      const updateResult = await Hero.findByIdAndUpdate(id, {
        [patchField]: value,
      });
      if (!updateResult) {
        throw new Error();
      }
    } else {
      next(createError(400, `Wrong update path`));
      return;
    }
    res.status(201).json({
      message: "Hero updated",
    });
  } catch (err) {
    err.status = 400;
    err.message = "Update faild";
    next(err);
  }
};

module.exports = patchHero;

//Look, up in the sky, it's a bird, it's a plane, it's Superman!
