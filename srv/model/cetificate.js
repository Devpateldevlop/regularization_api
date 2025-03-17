const mongoose = require('mongoose');

const Certificate = new mongoose.Schema({
    employeecode: { type: String, required: false },
    FileName: { type: String },
    FileData: { type: String },
    UploadDate: { type: String },
    FileType:{type :String}
});

const Certificates = mongoose.model('Certificate', Certificate);
module.exports = Certificates;
