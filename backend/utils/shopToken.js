// create token and saving that in cookies
const sendShopToken = (user, statusCode, res) => {
    const token = user.getJwtToken();
  
    const options = {
      expires: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      httpOnly: true,
      sameSite: "none",
      secure: true,
    };
  
    return res.status(statusCode).cookie("seller_token", token, options).json({
      success: true,
      user,
      token,
    });
  };
  
  module.exports = sendShopToken;