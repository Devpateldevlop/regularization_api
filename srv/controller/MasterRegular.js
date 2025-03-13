const express = require("express");
const Regularizations = require("../model/Regularizations");
const app = express();
const getMethod =async (req,res)=>{
    try {
        const employeecode = req?.params?.employeecode;
        const getEmpData = await Regularizations.find({"employeecode":employeecode});
        if(getEmpData.length > 0){
                 res.status(200).json({message:"Success",Results:getEmpData}); 
        }
       } catch (error) {
         res.status(500).json({ error: "Error Getting employee for Get", error: error.message });
       }
     };
     

const putMethod =async (req,res)=>{
   
  try {
    const employeecode = req?.params?.employeecode;
    const data = req?.body;
 const updatedEmp = await Regularizations.findOneAndUpdate({ employeecode: employeecode }, data, { new: true });
res.status(201).json({
         message: "Updated",
         Emp: updatedEmp
        });
   
  } catch (error) {
    res.status(500).json({ error: "Error Posting Employe for Updated"});
  }
    }
const postMethod =async (req,res)=>{
    var data = req?.body;
    try {
      var created = Regularizations.create(data);
  res.status(201).json({
           message: "Created",
           created:created
          });
     
  
    } catch (error) {
      res.status(404).json({ error: "Error Posting Employee" });
    }
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