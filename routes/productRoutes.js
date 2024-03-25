const express = require("express");
const router = express.Router();
const Product = require("../models/Product"); // Import the Product model
const productController = require("../controllers/productController");
const upload = require("../config/multerConfig");

// Route to fetch all products
router.get('/allproducts', async (req, res) => {
  try {
    // Fetch all products
    const products = await Product.find({});
    
    // Map each product to include the absolute URL of the image
    const productsWithAbsoluteURL = products.map(product => ({
      _id: product._id,
      name: product.name,
      image: `http://localhost:4000/${product.image}`, 
      category: product.category,
      new_price: product.new_price,
      old_price: product.old_price,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    }));

    res.json({ success: true, products: productsWithAbsoluteURL });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error", error: error.message });
  }
});

router.get("/newcollections", productController.getNewCollections);
router.get("/popularinwomen", productController.getPopularInWomen);
// router.get("/:productId", productController.getProductById);

router.get('/:productId', async (req, res) => {
  try {
    const productId = req.params.productId;
        const product = await Product.findById(productId);
        if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    // Include the absolute URL of the image
    const productWithAbsoluteURL = {
      _id: product._id,
      name: product.name,
      image: `http://localhost:4000/${product.image}`, 
      category: product.category,
      new_price: product.new_price,
      old_price: product.old_price,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    };

    res.json({ success: true, product: productWithAbsoluteURL });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error", error: error.message });
  }
});


router.post(
  "/addproduct",
  upload.single("image"),
  productController.addProduct
);

router.put("/:productId", productController.updateProduct); // Update product route
router.delete("/:productId", productController.deleteProduct); // Delete product route

module.exports = router;