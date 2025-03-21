const mongoose = require('mongoose');
const { type } = require('os');

const TimeSheet = new mongoose.Schema({
    date:{type:String},
    startTime:{type:String},
    endTime:{type:String},
    totalHours:{type:String},
    taskName:{type:String},
    ClintName:{type:String},
    Comments:{type:String},
    status:{type:String},
    submissionDate:{type:String},
    submissionTime :{type:String}
});

const TimeSheets = mongoose.model('TimeSheet', TimeSheet);
module.exports = TimeSheets;
