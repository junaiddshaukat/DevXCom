const express = require('express');

const cors = require('cors');
const cookieParser = require('cookie-parser');
const ErrorHandler = require('./middleware/error.js');
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/",express.static("uploads"));
app.use(express.urlencoded({extended: true}));
app.use(cors({
    origin: process.env.NODE_ENV === "PRODUCTION" 
        ? ["https://your-app-name.vercel.app", "https://your-custom-domain.com"] 
        : "http://localhost:5173",
    credentials: true, // Allow cookies to be sent with requests
}));


//config
if(process.env.NODE_ENV !== "PRODUCTION"){
    require('dotenv').config({path: 'config/.env'});
}
 

// Importing Routes
const user = require('./controller/user');
const shop = require('./controller/shop');
const product = require('./controller/product');
const event = require('./controller/event');
const coupon = require('./controller/coupounCode.js');
const payment = require('./controller/payment.js');
const order = require('./controller/order.js');
const conversation = require('./controller/conversation.js');
const message = require('./controller/message.js');

app.use('/api/v2/user', user);
app.use('/api/v2/shop', shop);
app.use('/api/v2/product', product);
app.use('/api/v2/event', event);
app.use('/api/v2/coupon', coupon);
app.use('/api/v2/payment', payment);
app.use('/api/v2/order', order);
app.use('/api/v2/conversation', conversation);
app.use('/api/v2/message', message);


// Error Handling
app.use(ErrorHandler);

app.get("/test",(req, res) => {
    res.status(200).json({
        success: true,
        message: "Server is working fine"
    });
});


module.exports = app;