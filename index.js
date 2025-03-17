const express = require('express');
const mongoose = require('mongoose');
var bodyParser = require('body-parser');
var imgSchema = require('./srv/model/Image');
var fs = require('fs');
var path = require('path');


var multer = require('multer');
const cors = require('cors');
require("dotenv").config();
const { getMethod, postMethod, putMethod, deleteMethod } = require('./srv/controller/MasterRegular');
const { getMethodCertificate, postMethodCertificate, putMethodCertificate, deleteMethodCertificate } = require('./srv/controller/Cetificate');
const app = express();
mongoose.connect('mongodb+srv://pdev5771:rxHFzG2xPEkkocvM@cluster0.bso1d.mongodb.net/test')
    .then((db) =>{
        console.log('MongoDB Connected...');
    })
    .catch((err) => console.log('MongoDB connection error: ' + err));
   

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: false }));
app.use(cors({orgin:'*'}));
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



var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});

var upload = multer({ storage: storage });

app.get('/images', (req, res) => {
    imgSchema.find({})
    .then((data, err)=>{
        if(err){
            console.log(err);
        }
        res.render('imagepage',{items: data})
    })
});
app.post('/images', upload.single('image'), (req, res, next) => {

    var obj = {
        name: req.body.name,
        desc: req.body.desc,
        img: {
            data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
            contentType: 'image/png'
        }
    }
    imgSchema.create(obj)
    .then ((err, item) => {
        if (err) {
            console.log(err);
        }
        else {
            // item.save();
            res.redirect('/');
        }
    });
});


app.listen(PORT, () => {

    console.log(`Server is running on http://localhost:${PORT}`);

});

 