const Cart = require('../models/Cart');
const User = require("../models/User");
const Product = require("../models/Product");



exports.addToCart = async (req, res) => {
  try {
    const { userId, itemId, size } = req.body;

    const item = await Product.findById(itemId);
    
    if (!item) {
      return res.status(404).json({ success: false, message: 'Item not found' });
    }
    
    let user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }
    const existingItem = cart.items.find(cartItem => cartItem.itemId.equals(itemId) && cartItem.size === size);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      cart.items.push({ itemId, quantity: 1, size });
    }

    // Save the cart
    await cart.save();

    // Respond with success message and added item data
    res.json({ success: true, message: 'Item added to cart', item });
  } catch (error) {
    console.error('Error adding item to cart:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};


// exports.removeFromCart = async (req, res) => {
//   try {
//     const { userId, itemId, size } = req.body;
//     const cart = await Cart.findOne({ userId });
//     if (!cart) {
//       return res.status(404).json({ success: false, message: 'Cart not found' });
//     }

//     const itemIndex = cart.items.findIndex(item => item.itemId.equals(itemId) && item.size === size);
//     if (itemIndex !== -1) {
//       const item = cart.items[itemIndex];
//       if (item.quantity > 1) {
//           item.quantity--;
//       } else {
//         cart.items.splice(itemIndex, 1);
//       }
//       await cart.save();
//       return res.json({ success: true, message: 'Item removed from cart' });
//     }

//     return res.status(404).json({ success: false, message: 'Item not found in cart' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: 'Internal server error' });
//   }
// };
exports.removeFromCart = async (req, res) => {
  try {
    const { userId, itemId, size } = req.body;
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ success: false, message: 'Cart not found' });
    }

    const itemIndex = cart.items.findIndex(item => item.itemId.equals(itemId) && item.size === size);
    if (itemIndex !== -1) {
      cart.items.splice(itemIndex, 1); // Remove the item from the cart
      await cart.save();
      return res.json({ success: true, message: 'Item removed from cart' });
    }

    return res.status(404).json({ success: false, message: 'Item not found in cart' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

exports.updatedCartItems = async (req, res) => {
  try{
    const { userId, itemId, size, qtyValue } = req.body;
    const item = await Product.findById(itemId);
    
    if (!item) {
      return res.status(404).json({ success: false, message: 'Item not found' });
    }
    
    let user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }
    const existingItem = cart.items.find(cartItem => cartItem.itemId.equals(itemId) && cartItem.size === size);
    if (existingItem) {
      if (qtyValue == -1){
          existingItem.quantity--;
      }else{
        existingItem.quantity++;
      }
    } 
    await cart.save();
    res.json({ success: true, message: 'Item Updated to cart', item });

  }catch(error){
    console.error('Error fetching update cart:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

exports.getCart = async (req, res) => {
  try {
    const { userId } = req.params; 
    const cart = await Cart.findOne({ userId }).populate({
      path: 'items',
      populate: {
        path: 'itemId', 
        model: 'Product' 
      }
    });

    if (!cart) {
      console.log('Cart not found for userId:', userId);
      return res.json({ items: [] });
    }

    const response = {
      items: cart.items
    };

    res.json(response);
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
