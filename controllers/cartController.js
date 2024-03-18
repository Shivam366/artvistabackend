const User = require("../models/User");

// Add to cart route
exports.addToCart = async (req, res) => {
  try {
    const { userId } = req.user;
    const { itemId } = req.body;

    let user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    user.cartData[itemId] = (user.cartData[itemId] || 0) + 1;
    await user.save();
    res.json({ success: true, message: "Item added to cart" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Remove from cart route
exports.removeFromCart = async (req, res) => {
  try {
    const { userId } = req.user;
    const { itemId } = req.body;

    let user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if (user.cartData[itemId] > 0) {
      user.cartData[itemId] -= 1;
    }
    await user.save();
    res.json({ success: true, message: "Item removed from cart" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Get cart route
exports.getCart = async (req, res) => {
  try {
    const { userId } = req.user;
    const user = await User.findById(userId);
    res.json(user.cartData);
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
