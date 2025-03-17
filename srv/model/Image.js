var mongoose = require('mongoose');
var imageSchema = new mongoose.Schema({
    name: String,
    desc: String,
    img:{type: Buffer}
});

module.exports = mongoose.model('Image', imageSchema);
