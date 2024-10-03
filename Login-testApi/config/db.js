const mongoose = require('mongoose');


const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://vineet:BHyUU5cBgrFVJdHi@db.xkcz9.mongodb.net/DB', {
            useNewUrlParser : true ,
            useUnifiedTopology : true,
        });
        console.log("MongoDB connected")
    } catch (error) {
        console.error('MongoDB connection failed', error);
        process.exit(1);
    }
}


module.exports = connectDB;