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
    origin:"http://localhost:5173",
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

app.use('/api/v2/user', user);
app.use('/api/v2/shop', shop);
app.use('/api/v2/product', product);
app.use('/api/v2/event', event);
app.use('/api/v2/coupon', coupon);



// Error Handling
app.use(ErrorHandler);


module.exports = app;