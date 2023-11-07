const cloudinary = require("cloudinary").v2;
const path = require("path");
const fs = require("fs/promises");
require("dotenv").config();

const { CLOUD_NAME, API_KEY, API_SECRET } = process.env;

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET,
});

const upload = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(
      path.resolve(__dirname, filePath)
    );

    await fs.unlink(filePath);
    return result;
  } catch (err) {
    console.log(err);
  }
};

//url
//secure_url
//public_id

const deleteResource = async (id) => {
  try {
    const res = await cloudinary.api.delete_resources(id);
  } catch (err) {
    throw err;
  }
};

module.exports = { upload, deleteResource };
