const app = require("./app");
const mongoose = require("mongoose");
require("dotenv").config();

const { PORT, DB_INFO } = process.env;

console.log("App started");

app.listen(Number(PORT), () => {
  console.log("Server started on port " + PORT);
});

mongoose.set("strictQuery", false);
mongoose
  .connect(DB_INFO)
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log(err);
  });
