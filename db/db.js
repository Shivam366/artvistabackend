// db/db.js
const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://singhjagtar285:Sharma@cluster0.wlawvrv.mongodb.net/e-commerce", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("Database connected successfully");
})
.catch((error) => {
  console.error("Database connection error:", error);
});

module.exports = mongoose;
