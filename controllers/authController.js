const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const User = require("../models/User");

// Login route
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid email or password" });
    }

    // Compare hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
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

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    const token = jwt.sign({ userId: newUser._id }, "secret_ecom");
    res.json({ success: true, token });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

async function getUserDetailsById(userId) {
  try {
    const user = await User.findById(userId).select('-password');
    return user;
  } catch (error) {
    console.error("Error fetching user details:", error);
    throw error; 
  }
}

exports.getCurrentUser = async (req, res) => {
  try {
      const userId = req.user.userId;
      const currentUser = await getUserDetailsById(userId); 
      if (!currentUser) {
        return res.status(404).json({ error: "User not found" });
      }
      res.status(200).json({ user: currentUser }); // Send the full user details
  } catch (error) {
      console.error("Error fetching current user:", error);
      res.status(500).json({ error: "Internal server error" });
  }
};