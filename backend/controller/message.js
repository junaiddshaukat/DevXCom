const Messages = require("../model/messages");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const express = require("express");
const { upload } = require("../multer");
const { uploadToCloudinary } = require("../utils/cloudinary.js");
const router = express.Router();

// create new message
router.post(
  "/create-new-message",
  upload.array("images"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const messageData = req.body;

      if (req.files && req.files.length > 0) {
        // Upload all images to Cloudinary
        const imageUrls = [];
        for (let i = 0; i < req.files.length; i++) {
          const file = req.files[i];
          const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
          const filename = `message-${uniqueSuffix}-${i}`;
          
          try {
            const uploadResult = await uploadToCloudinary(file.buffer, filename, 'messages');
            imageUrls.push(uploadResult.secure_url);
          } catch (uploadError) {
            console.error('Cloudinary upload error:', uploadError);
            return next(new ErrorHandler("Failed to upload image to cloud storage", 500));
          }
        }
        messageData.images = imageUrls;
      }

      messageData.conversationId = req.body.conversationId;
      messageData.sender = req.body.sender;
      messageData.text = req.body.text;

      const message = new Messages({
        conversationId: messageData.conversationId,
        text: messageData.text,
        sender: messageData.sender,
        images: messageData.images ? messageData.images : undefined,
      });

      await message.save();

      res.status(201).json({
        success: true,
        message,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message), 500);
    }
  })
);

// get all messages with conversation id
router.get(
  "/get-all-messages/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const messages = await Messages.find({
        conversationId: req.params.id,
      });

      res.status(201).json({
        success: true,
        messages,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message), 500);
    }
  })
);

module.exports = router;