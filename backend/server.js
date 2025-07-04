const app = require('./app');
const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

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

// Initialize database connection
const initializeDatabase = async () => {
    try {
        await connectDatabase();
        console.log('Database initialized successfully');
    } catch (error) {
        console.error('Database initialization failed:', error);
    }
};

// Initialize database for serverless
initializeDatabase();

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