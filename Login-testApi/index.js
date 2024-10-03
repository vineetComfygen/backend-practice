const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');

const app = express();


//Connect to MongoDB
connectDB();


//Middleware
app.use(express.json());


//Routes
app.use('/api/auth', authRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});