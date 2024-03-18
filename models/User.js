const mongoose = require("../db/db");

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  cartData: Object,
  date: { type: Date, default: Date.now }
});

const User = mongoose.model("User", UserSchema); 

module.exports = User;
