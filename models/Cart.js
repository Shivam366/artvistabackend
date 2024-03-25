// cart.model.js
const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  items: [{
    itemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Item'
    },
    quantity: Number,
    size: String
  }]
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
