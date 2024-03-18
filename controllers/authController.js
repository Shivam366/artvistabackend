const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Login route
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(400).json({ success: false, message: "Invalid email or password" });
    }

    const token = jwt.sign({ userId: user._id }, "secret_ecom");
    res.json({ success: true, token });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Signup route
exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    const newUser = new User({ name, email, password });
    await newUser.save();

    const token = jwt.sign({ userId: newUser._id }, "secret_ecom");
    res.json({ success: true, token });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
