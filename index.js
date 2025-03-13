const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { getMethod } = require('./srv/controller/MasterRegular');
const app = express();
mongoose.connect('mongodb+srv://pdev5771:rxHFzG2xPEkkocvM@cluster0.bso1d.mongodb.net')
    .then(() => console.log('MongoDB Connected...'))
    .catch((err) => console.log('MongoDB connection error: ' + err));
   

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({orgin:'*'}));
const PORT = process.env.PORT || 5002;

app.get("/api/regularization/:id",getMethod)
app.listen(PORT, () => {

    console.log(`Server is running on http://localhost:${PORT}`);

});

 