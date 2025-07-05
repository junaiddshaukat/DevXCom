const express = require("express");
const path = require("path");
const fs = require("fs");
const router = express.Router();
const Shop = require("../model/shop.js");
const { upload } = require("../multer");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendMail.js");
const sendToken = require("../utils/jwtToken.js");
const catchAsyncError = require("../middleware/catchAsyncErrors.js");
const ErrorHandler = require("../utils/ErrorHandler.js");
const sendShopToken = require("../utils/shopToken.js");
const catchAsyncErrors = require("../middleware/catchAsyncErrors.js");
const { isSeller } = require("../middleware/auth.js");
const { uploadToCloudinary } = require("../utils/cloudinary.js");

// Create Shop Route
router.post("/create-shop", upload.single("file"), async (req, res, next) => {
  try {
    const { email } = req.body;

    const sellerEmail = await Shop.findOne({ email });

    if (sellerEmail) {
      return next(new ErrorHandler("User already exist", 400));
    }

    if (!req.file) {
      return next(new ErrorHandler("Avatar image is required", 400));
    }

    // Generate unique filename
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const filename = `shop-${uniqueSuffix}`;

    // Upload to Cloudinary
    let uploadResult;
    try {
      uploadResult = await uploadToCloudinary(req.file.buffer, filename, 'shops');
    } catch (uploadError) {
      console.error('Cloudinary upload error:', uploadError);
      return next(new ErrorHandler("Failed to upload image to cloud storage", 500));
    }

    const seller = {
      name: req.body.name,
      email: email,
      password: req.body.password,
      avatar: uploadResult.secure_url, // Use Cloudinary URL
      address: req.body.address,
      phoneNumber: req.body.phoneNumber,
      zipCode: req.body.zipCode
    };

    const activationToken = createActivationToken(seller);
    const activationUrl = `https://devxcom.vercel.app/seller/activation/${activationToken}`;

    try {
      await sendEmail({
        email: seller.email,
        subject: "Activate Your Shop",
        message: `Hello ${seller.name},\n\t Please click on the link below to activate your account:\n\n${activationUrl}`,
      });
      res.status(201).json({
        success: true,
        message: `Please check your email:-\n\t${seller.email} to activate your account`,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

// Create activation Token
const createActivationToken = (seller) => {
  return jwt.sign(seller, process.env.ACTIVATION_SECRET, {
    expiresIn: "5m",
  });
};

// Activate Seller
router.post(
  "/activation",
  catchAsyncError(async (req, res, next) => {
    try {
      const { activationToken } = req.body;
      const newSeller = jwt.verify(
        activationToken,
        process.env.ACTIVATION_SECRET
      );

      if (!newSeller) {
        return next(new ErrorHandler("Invalid token", 400));
      }

      const { name, email, password, avatar, zipCode, address, phoneNumber } = newSeller;

      let seller = await Shop.findOne({ email });

      if (seller) {
        return next(new ErrorHandler("Seller already exists", 400));
      }

      seller = await Shop.create({
        name,
        email,
        password,
        avatar,
        zipCode,
        address,
        phoneNumber
      });

      sendShopToken(seller, 200, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

//login 

router.post(
  "/login-shop",
  catchAsyncError(async (req, res, next) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return next(new ErrorHandler("Please enter email and password", 400));
      }

      const seller = await Shop.findOne({ email }).select("+password");

      if (!seller) {
        return next(new ErrorHandler("Seller not found", 401));
      }

      const isPasswordValid = await seller.comparePassword(password);

      if (!isPasswordValid) {
        return next(new ErrorHandler("Invalid email or password", 401));
      }

      sendShopToken(seller, 200, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

//load shop
router.get("/getSeller", isSeller, catchAsyncErrors(async (req, res, next) => {
  try {
    const seller = await Shop.findById(req.seller.id);
    if (!seller) {
      return next(new ErrorHandler("Seller not found", 404));
    }
    res.status(200).json({
      success: true,
      seller,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
}));

// logout form the shop 
router.post(
  "/logout",
  catchAsyncError(async (req, res, next) => {
    try {
      res.cookie("seller_token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
        // secure: process.env.NODE_ENV === "production",
        // sameSite: "strict",
      });

      res.status(200).json({
        success: true,
        message: "Logged out successfully",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

//get shop info
router.get(
  "/get-shop-info/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const shop = await Shop.findById(req.params.id);
      res.status(201).json({
        success: true,
        shop,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);


// update seller info
router.put(
  "/update-seller-info",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { name, description, address, phoneNumber, zipCode } = req.body;

      const shop = await Shop.findOne(req.seller._id);

      if (!shop) {
        return next(new ErrorHandler("User not found", 400));
      }

      shop.name = name;
      shop.description = description;
      shop.address = address;
      shop.phoneNumber = phoneNumber;
      shop.zipCode = zipCode;

      await shop.save();

      res.status(201).json({
        success: true,
        shop,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;