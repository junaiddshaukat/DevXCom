const mongoose = require("mongoose");

const couponCodeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your coupon code name!"],
    unique: true,
  },
  value: {
    type: Number,
    required: true,
  },
  minAmount: {
    type: Number,
  },
  maxAmount: {
    type: Number,
  },
  shopId: {
    type: String,
    required: true,
  },
  selectedProducts: {
    type: String,
  },
  shop:{
    type:Object,
    require:true
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("CouponCode", couponCodeSchema);