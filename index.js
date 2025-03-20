const express = require('express');
const mongoose = require('mongoose');
var bodyParser = require('body-parser');
var fs = require('fs');
var path = require('path');
var multer = require('multer');
const cors = require('cors');
require("dotenv").config();
const { getMethod, postMethod, putMethod, deleteMethod } = require('./srv/controller/MasterRegular');
const { getMethodCertificate, postMethodCertificate, putMethodCertificate, deleteMethodCertificate } = require('./srv/controller/Cetificate');
const { EmailPost, ReplyEmail } = require('./srv/controller/Email');
const app = express();
mongoose.connect('mongodb+srv://pdev5771:rxHFzG2xPEkkocvM@cluster0.bso1d.mongodb.net/test')
    .then((db) =>{
        console.log('MongoDB Connected...');
    })
    .catch((err) => console.log('MongoDB connection error: ' + err));
   
    app.use(cors({
        origin: '*', 
        methods: ['GET', 'POST', 'PUT', 'DELETE' ,'OPTIONS'], 
        allowedHeaders: ['Content-Type'], 
    }));
    
    app.options('*', cors()); 
    

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// app.use(cors({orgin:'*'}));

const PORT = process.env.PORT || 5002;

app.get("/api/regularization/:employeecode",getMethod);
app.get("/api/regularization",getMethod);
app.post("/api/regularization",postMethod);
app.put("/api/regularization/:employeecode",putMethod);
app.delete("/api/regularization/:employeecode",deleteMethod);

app.get("/api/cetificate/:employeecode",getMethodCertificate);
app.get("/api/cetificate",getMethodCertificate);
app.post("/api/cetificate",postMethodCertificate);
app.put("/api/cetificate/:employeecode",putMethodCertificate);
app.delete("/api/cetificate/:employeecode",deleteMethodCertificate);

app.post("/api/Email",EmailPost);
app.post("/api/ReplyEmail",ReplyEmail);



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);

});

 