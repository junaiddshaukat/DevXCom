const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Product name is required"],
  },
  description: {
    type: String,
    required: [true, "Product description is required"],
  },
  category: {
    type: String,
    required: [true, "Product category is required"],
  },
  tags: {
    type: String,
    required: [true, "Product tags are required"],
  },
  originalPrice: {
    type: Number,
    required: [true, "Original price is required"],
  },
  discountPrice: {
    type: Number,
    required: [true, "Discount price is required"],
  },
  stock: {
    type: Number,
    required: [true, "Product stock is required"],
  },
  images: [
    {
      type: String,
    },
  ],
  
  shopId: {
    type: String,
    required: true,
  },
  shop: {
    type: Object,
    required: true,
  },
  sold_out: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});


module.exports = mongoose.model("Product", productSchema);