const express = require("express");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");
const Shop = require("../model/shop.js");
const Product = require("../model/product.js");
const router = express.Router();
const { upload } = require("../multer");
const { isSeller } = require("../middleware/auth");
const fs = require("fs");
//create product

router.post(
  "/create-product",
  upload.array("images"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const shopId = req.body.shopId;
      const shop = await Shop.findById(shopId);

      if (!shop) {
        return next(new ErrorHandler("Shop not found", 404));
      } else {
        const files = req.files;
        const imageUrls = files.map((file) => file.filename);
        const productData = req.body;
        productData.images = imageUrls;
        productData.shop = shop;

        const product = await Product.create(productData);

        res.status(201).json({
          success: true,
          message: "Product created successfully",
          product,
        });
      }
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

//get all product 

router.get("/get-all-products-shop/:shopId", catchAsyncErrors(async (req, res, next) => {
  try {
    const products = await Product.find({ shopId: req.params.shopId });   
    
    res.status(200).json({
      success: true,
      products: products.length > 0 ? products : [],
      message: products.length > 0 ? undefined : "No products found for this shop",
    }); 
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  } 
}));
    
//delete product of a shop

router.delete("/delete-shop-product/:id",isSeller, catchAsyncErrors(async (req, res, next) => {
  try {
    const productData = await Product.findById(req.params.id);
    
    if (!productData) {
      return next(new ErrorHandler("Product not found", 404));
    }

    productData.images.forEach((imageUrl)=>{
      const filename = imageUrl;
      const filePath = `uploads/${filename}`;
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error(`Error deleting file ${filePath}:`, err);
        } else {
          console.log(`File ${filePath} deleted successfully`);
        }
      });
    })

    const product = await Product.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    return next(new ErrorHandler("error in the delete route",error.message, 500));
  }
}));

// get all products
router.get(
  "/get-all-products",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const products = await Product.find().sort({ createdAt: -1 });

      res.status(201).json({
        success: true,
        products,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

module.exports = router;
