const express = require('express');

const cors = require('cors');
const cookieParser = require('cookie-parser');
const ErrorHandler = require('./middleware/error.js');
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/",express.static("uploads"));
app.use(express.urlencoded({extended: true}));
app.use(cors());


//config
if(process.env.NODE_ENV !== "PRODUCTION"){
    require('dotenv').config({path: 'config/.env'});
}


// Importing Routes
const user = require('./controller/user');

app.use('/api/v2/user', user);


// Error Handling
app.use(ErrorHandler);


module.exports = app;