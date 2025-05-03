const express = require('express');
const ErrorHandler = require('./utils/ErrorHandler');

const cookieParser = require('cookie-parser');

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));




//config
if(process.env.NODE_ENV !== "PRODUCTION"){
    require('dotenv').config({path: 'config/.env'});
}

// Error Handling
app.use(ErrorHandler);


module.exports = app;