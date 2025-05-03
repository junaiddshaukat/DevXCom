const mongoose = require('mongoose');

const connectDatabase = () => {
    mongoose.connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000,
        retryWrites: true
      }).catch(err => {
        console.error('MongoDB connection error:', err);
      });
}

module.exports = connectDatabase;