const { Schema, model } = require("mongoose");

const ImageSchema = new Schema({
  id: {
    type: String,
    require: true,
  },
  url: {
    type: String,
    require: true,
  },
});

const herroSchema = new Schema({
  nickname: {
    type: String,
    require: true,
  },
  real_name: {
    type: String,
    require: true,
  },
  origin_description: {
    type: String,
    require: true,
  },
  superpowers: {
    type: String,
    require: true,
  },
  catch_phrase: {
    type: String,
    require: true,
  },
  Images: {
    type: [ImageSchema],
  },
});

const Hero = model("heroes", herroSchema);

module.exports = Hero;
