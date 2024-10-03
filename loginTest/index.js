const express = require('express');
const mongoose = require('mongoose');
const app = express();
const userRoutes = require('./routes/users')
mongoose.connect('mongodb+srv://vineet:BHyUU5cBgrFVJdHi@db.xkcz9.mongodb.net/DB',{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.log(err));

app.use(express.json()); //this allows to parse json bodies in request
app.use('/users', userRoutes)


const port = 5000;

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
})



//connected to mongodb and added the connection logic


// define a mongoose model and create a schema
