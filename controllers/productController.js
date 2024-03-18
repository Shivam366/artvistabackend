// controllers/productController.js
const Product = require("../models/Product");

// Get all products route
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    console.log(products," porducts")
    res.json(products);
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Get new collections route
exports.getNewCollections = async (req, res) => {
  try {
    const products = await Product.find().sort({ date: -1 }).limit(8);
    res.json(products);
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Get popular products in women category route
exports.getPopularInWomen = async (req, res) => {
  try {
    const products = await Product.find({ category: "women" }).limit(4);
    res.json(products);
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Get product by ID route
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Add product route
exports.addProduct = async (req, res) => {
  try {
    const { name, category, new_price, old_price } = req.body;
    const image = req.file; 
    if (!image) {
      return res.status(400).json({ success: false, message: "Image is required" });
    }
    const imagePath = 'uploads/' + image.filename;
    const product = new Product({
      name,
      image: imagePath,
      category,
      new_price,
      old_price,
    });
    
    await product.save();
    
    res.json({ success: true, product });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Update product route
exports.updateProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const { name, image, category, new_price, old_price } = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { name, image, category, new_price, old_price },
      { new: true }
    );
    if (!updatedProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    res.json({ success: true, product: updatedProduct });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Delete product route
exports.deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (!deletedProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    res.json({ success: true, message: "Product removed successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
