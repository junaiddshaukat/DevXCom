const express = require("express");
const path = require("path");
const router = express.Router();
const User = require("../model/user.js");
const ErrorHandler = require("../utils/ErrorHandler.js"); // Fixed capitalization
const fs = require("fs");
const { upload } = require("../multer");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendMail.js");
const sendToken = require("../utils/jwtToken.js");
const catchAsyncError = require("../middleware/catchAsyncErrors.js");
const { isAuthenticated } = require("../middleware/auth.js");
const catchAsyncErrors = require("../middleware/catchAsyncErrors.js");
const { uploadToCloudinary } = require("../utils/cloudinary.js");

router.post("/create-user", upload.single("file"), async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!req.file) {
      return next(new ErrorHandler("Avatar image is required.", 400));
    }
    
    const userEmail = await User.findOne({ email });
    if (userEmail) {
      return next(new ErrorHandler("User already exist", 400));
    }

    // Generate unique filename
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const filename = `user-${uniqueSuffix}`;

    // Upload to Cloudinary
    const uploadResult = await uploadToCloudinary(req.file.buffer, filename, 'users');

    const user = {
      name: name,
      email: email,
      password: password,
      avatar: uploadResult.secure_url, // Use Cloudinary URL
    };

    const activationToken = createActivationToken(user);
    const activationUrl = `https://devxcom.vercel.app/activation/${activationToken}`;

    try {
      await sendEmail({
        email: user.email,
        subject: "Activate Your account",
        message: `Hello ${user.name},\n\t Please click on the link below to activate your account:\n\n${activationUrl}`,
      });
      res.status(201).json({
        success: true,
        message: `Please check your email:-\n\t${user.email} to activate your account`,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

// Create activation Token
const createActivationToken = (user) => {
  return jwt.sign(user, process.env.ACTIVATION_SECRET, {
    expiresIn: "5m",
  });
};

// Activate User
router.post(
  "/activation",
  catchAsyncError(async (req, res, next) => {
    try {
      const { activationToken } = req.body;
      const newUser = jwt.verify(
        activationToken,
        process.env.ACTIVATION_SECRET
      );

      if (!newUser) {
        return next(new ErrorHandler("Invalid token", 400));
      }

      const { name, email, password, avatar } = newUser;

      let user = await User.findOne({ email });

      if (user) {
        return next(new ErrorHandler("User already exists", 400));
      }

      user = await User.create({
        name,
        email,
        password,
        avatar,
      });

      sendToken(user, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// login function

router.post(
  "/login-user",
  catchAsyncError(async (req, res, next) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return next(new ErrorHandler("Please enter email and password", 400));
      }

      const user = await User.findOne({ email }).select("+password");

      if (!user) {
        return next(new ErrorHandler("User not found", 401));
      }

      const isPasswordValid = await user.comparePassword(password);

      if (!isPasswordValid) {
        return next(new ErrorHandler("Invalid email or password", 401));
      }

      sendToken(user, 200, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

//load user details
router.get(
  "/get-user",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id);
      if (!user) {
        return next(new ErrorHandler("User not found", 404));
      }
      res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

//logout user

router.post(
  "/logout",
  catchAsyncError(async (req, res, next) => {
    try {
      res.cookie("token", null, {
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

//update user info

router.put("/update-user-info",isAuthenticated, catchAsyncError(async(req,res,next)=>{
  try {
    
    const {email,password,phoneNumber,name} = req.body;
    const user = await User.findOne({email}).select("+password");

    if(!user) {
      return next(new ErrorHandler("User not found", 404));
    }

    const isPasswordValid = await user.comparePassword(password);

    if(!isPasswordValid) {
      return next(new ErrorHandler("Invalid password", 401));
    }
    
    user.name = name;
    user.email = email;
    user.phoneNumber = phoneNumber;

    await user.save();

    res.status(200).json({
      success: true,
      message: "User information updated successfully",
      user,
    });

    
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
}));

//update user avatar

router.put("/update-avatar",isAuthenticated,upload.single("image"), catchAsyncError(async(req,res,next)=>{

  try {
    
    const existsUser = await User.findById(req.user.id);
    if (!existsUser) {
      return next(new ErrorHandler("User not found", 404));
    }

    const exsistAvatarpath = `uploads/${existsUser.avatar}`;

    fs.unlinkSync(exsistAvatarpath)

    const fileUrl = path.join(req.file.filename);

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { avatar: fileUrl },
      // { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: "Avatar updated successfully",
      user,
    });

  } catch (error) {
    return next(new ErrorHandler(error.message, 500));

  }

}))

// update user addresses

router.put("/update-user-addresses", isAuthenticated, catchAsyncError(async(req,res,next)=>{
    try {
      const user = await User.findById(req.user.id);
      if (!user) {
        return next(new ErrorHandler("User not found", 404));
      }

      const sameTypeAddress = user.addresses.find((address)=>address.addressType === req.body.addressType);
      if (sameTypeAddress) {
        return next(new ErrorHandler("Address type already exists", 400));
      }

      const exsistAddress = user.addresses.find((address) => address._id === req.body.id);

      if(exsistAddress){
        Object.assign(exsistAddress, req.body);

      }else{
        //add the new address to the array'
        user.addresses.push(req.body);
      }

      await user.save();

      res.status(200).json({
        success: true,
        message: "User addresses updated successfully",
        user,
      }); 



      
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
      }
}))


// delete user address

router.delete("/delete-user-address/:id", isAuthenticated, catchAsyncError(async(req,res,next)=>{

  try {
    const userId = req.user._id;
    const addressId = req.params.id;

    await User.updateOne({
      _id: userId,
    }, {
      $pull: {
        addresses: {
          _id: addressId,
        },
      },
    })

    const user = await User.findById(userId);

    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "User address deleted successfully",
      user,
    });


  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }

}))


// update user password

router.put("/update-user-password", isAuthenticated, catchAsyncError(async(req,res,next)=>{

  try {
    const { oldPassword, newPassword, confirmPassword } = req.body;

    const user = await User.findById(req.user.id).select("+password");

    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }

    const isPasswordValid = await user.comparePassword(oldPassword);

    if (!isPasswordValid) {
      return next(new ErrorHandler("Invalid password", 401));
    }

    if( newPassword !== confirmPassword) {
      return next(new ErrorHandler("New password and confirm password do not match", 400));
    }

    user.password = newPassword;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });

  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }

}));


router.get(
  "/user-info/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const user = await User.findById(req.params.id);

      res.status(201).json({
        success: true,
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);


module.exports = router;

 