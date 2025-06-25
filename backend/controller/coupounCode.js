const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");
const Shop = require("../model/shop.js");
const { isSeller } = require("../middleware/auth");
const CoupounCode = require("../model/coupounCode.js");
const express = require("express");


const router = express.Router();

// create a coupon

router.post(
  "/create-coupon-code",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const iscoupounCodeExsists = await CoupounCode.find({
        name: req.body.name,
      });

      if (iscoupounCodeExsists.length !== 0) {
        return next(new ErrorHandler("Coupon code already exists", 400));
      }

      const coupounCode = await CoupounCode.create(req.body);

      res.status(201).json({
        success: true,
        message: "Coupon code created successfully",
        coupounCode,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

router.get("/get-coupon/:id", isSeller, catchAsyncErrors(async (req, res, next) => {
  try { 

    const couponCodes = await CoupounCode.find({ shopId: req.params.id });

    res.status(200).json({
      success: true,
      couponCodes
  })

  }
  catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
}));

// delete coupoun code of a shop
router.delete(
  "/delete-coupon/:id",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const couponCode = await CoupounCode.findByIdAndDelete(req.params.id);

      if (!couponCode) {
        return next(new ErrorHandler("Coupon code dosen't exists!", 400));
      }
      res.status(201).json({
        success: true,
        message: "Coupon code deleted successfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// get coupon code value by its name
router.get(
  "/get-coupon-value/:name",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const couponCode = await CoupounCode.findOne({ name: req.params.name });

      res.status(200).json({
        success: true,
        couponCode,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);


module.exports = router;