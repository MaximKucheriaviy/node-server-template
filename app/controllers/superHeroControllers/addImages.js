const { Hero } = require("../../models");
const createError = require("../../service/createError");
const { upload } = require("../../service/cloudinaryLoader");

const addIamges = async (req, res, next) => {
  try {
    const data = await Hero.findById(req.body.id);
    if (!data) {
      next(createError(400, `Hero not found`));
      return;
    }
    for (let i = 0; i < req.files.length; i++) {
      const result = await upload(req.files[i].path);
      if ((result.url, result.public_id)) {
        const heroResult = await Hero.findByIdAndUpdate(req.body.id, {
          $push: { Images: { url: result.url, id: result.public_id } },
        });
        if (!heroResult) {
          throw new Error();
        }
      }
    }
    res.status(201).json({
      message: "Images updated",
    });
  } catch (err) {
    console.log(err);
    err.status = 400;
    err.message = "Hero creation error";
    console.log(err);
    next(err);
  }
};

module.exports = addIamges;
