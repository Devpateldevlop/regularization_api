const express = require("express");
const Regularizations = require("../model/Regularizations");
const app = express();
const getMethod =async (req,res)=>{
    try {
        const employeecode = req?.params?.employeecode;
        var getEmpData;
        if(employeecode){
         getEmpData = await Regularizations.find({"employeecode":employeecode});
        }else{
            getEmpData = await Regularizations.find();
        }
        if(getEmpData.length > 0){
                 res.status(200).json({message:"Success",Results:getEmpData,createdBy:"Dev Patel"}); 
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
    res.status(404).json({ error: "Error Posting Employe for Updated"});
  }
    }
const postMethod =async (req,res)=>{
    var data = req?.body;
    try {
      var created = await Regularizations.create(data);
  res.status(201).json({
           message: "Created",
           createdBy:"Dev Patel",
           created:created
          });
  
    } catch (error) {
      res.status(404).json({ error: "Error Posting Employee" });
    }
        }
const deleteMethod =async (req,res)=>{
    const employeecode = req?.params?.employeecode;
    try {
      const deletedUser = await Regularizations.deleteOne({ employeecode: employeecode });
      if (deletedUser.deletedCount == 0) throw Error("User not found");
      res.status(200).json({ message: "Employee deleted successfully", user: deletedUser });
    } catch (error) {
      res.status(404).json({ error: "Error deleting Employee"});
    }
            }
module.exports={
    getMethod,
    putMethod,
    postMethod,
    deleteMethod
}