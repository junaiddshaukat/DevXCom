const app = require('./app');




//handling uncaught exception
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`shutting down the server due to uncaught exception`);
    process.exit(1);
});

//config
if (process.env.NODE_ENV !== "PRODUCTION") {
    require('dotenv').config({ path: 'config/.env' });
}

//connecting to database
const connectDatabase = require('./db/mongo.js');
connectDatabase();

const server = app.listen(process.env.PORT, () => {
    console.log(`Server is working on Port:${process.env.PORT}`);
})

//unhandled promise rejection
process.on("unhandledRejection", err => {
    console.log(`Error: ${err.message}`);
    console.log(`shutting down the server due to unhandled promise rejection`);
    server.close(() => {
        process.exit(1);
    });
});