const express = require("express");
const app = express();
const getMethod =async (req,res)=>{
const id = req.params.id
res.send("welcome "+id);
}
module.exports={
    getMethod
}