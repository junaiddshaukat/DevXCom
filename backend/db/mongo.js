const mongoose = require('mongoose');

let retryCount = 0;
const maxRetries = 5;

const connectDatabase = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 30000, // 30 seconds
            socketTimeoutMS: 45000, // 45 seconds
            retryWrites: true,
            maxPoolSize: 10, // Connection pool
        });
        
        console.log('MongoDB connected successfully');
        retryCount = 0; // Reset retry count on successful connection
        
    } catch (error) {
        console.error(`MongoDB connection failed (attempt ${retryCount + 1}/${maxRetries}):`, error.message);
        
        if (retryCount < maxRetries) {
            retryCount++;
            console.log(`Retrying in 5 seconds...`);
            setTimeout(connectDatabase, 5000);
        } else {
            console.error('Max retries reached. Exiting...');
            process.exit(1);
        }
    }
};

// Handle connection events
mongoose.connection.on('disconnected', () => {
    console.log('MongoDB disconnected! Attempting to reconnect...');
    connectDatabase();
});

mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

mongoose.connection.on('reconnected', () => {
    console.log('MongoDB reconnected successfully');
});

module.exports = connectDatabase;