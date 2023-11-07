const { Hero } = require("../../models");
const { upload } = require("../../service/cloudinaryLoader");

const createHero = async (req, res, next) => {
  try {
    const {
      nickname,
      real_name,
      origin_description,
      superpowers,
      catch_phrase,
    } = req.body;
    const findResult = await Hero.findOne({ nickname });
    if (findResult) {
      const error = new Error();
      error.status = 400;
      error.message = "Hero already exist";
      next(error);
      return;
    }
    const Images = [];
    for (let i = 0; i < req.files.length; i++) {
      const result = await upload(req.files[i].path);
      if ((result.url, result.public_id)) {
        Images.push({ url: result.url, id: result.public_id });
      }
    }
    const result = await Hero.create({
      nickname,
      real_name,
      origin_description,
      superpowers,
      catch_phrase,
      Images,
    });
    if (!result) {
      throw new Error();
    }
    res.status(201).json({
      message: "New superhero created",
      data: result,
    });
  } catch (err) {
    err.status = 400;
    err.message = "Hero creation error";
    console.log(err);
    next(err);
  }
};

module.exports = createHero;
