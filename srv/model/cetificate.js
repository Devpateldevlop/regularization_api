const mongoose = require('mongoose');


const Certificate = new mongoose.Schema({
    employeecode: { type: String, required: false },
    Url:{type: Buffer}
});



const Certificates= mongoose.model('Certificate',Certificate );
module.exports = Certificates;
