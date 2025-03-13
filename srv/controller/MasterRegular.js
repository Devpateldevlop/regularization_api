const express = require("express");
const Regularizations = require("../model/Regularizations");
const app = express();
const getMethod =async (req,res)=>{
const id = req.params.id
const data = Regularizations.find();
res.send("welcome "+id);
}
const putMethod =async (req,res)=>{
    const id = req.params.id
    res.send("welcome "+id);
    }
const postMethod =async (req,res)=>{
        const id = req.params.id
        res.send("welcome "+id);
        }
const deleteMethod =async (req,res)=>{
            const id = req.params.id
            res.send("welcome "+id);
            }
module.exports={
    getMethod,
    putMethod,
    postMethod,
    deleteMethod
}