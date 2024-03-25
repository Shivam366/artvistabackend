const express = require("express");
const app = express();
const cors = require('cors');
const port = 4000;

// Import route handlers
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");

// Middlewares
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));
// Use routes
app.use("/auth", authRoutes);
app.use("/products", productRoutes);
app.use("/cart", cartRoutes);

app.listen(port, (error) => {
  if (!error) console.log("Server Running on port " + port);
  else console.log("Error : ", error);
});
