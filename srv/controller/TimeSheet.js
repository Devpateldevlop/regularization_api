const express = require("express");
const TimeSheets = require("../model/times");
const app = express();
const getMethodTimeSheets =async (req,res)=>{
    try {
        const employeecode = req?.params?.employeecode;
        var getEmpData;
        if(employeecode){
         getEmpData = await TimeSheets.find({"employeecode":employeecode});
         if(getEmpData.length === 0){
             return res.status(404).json({error:"Certificate data is missing"});
         }
        }else{
            getEmpData = await TimeSheets.find();
        }
        if(getEmpData.length > 0){
                 res.status(200).json({message:"Success",Results:getEmpData,createdBy:"Dev Patel"}); 
        }
       } catch (error) {
         res.status(500).json({ error: "Error Getting employee for Get", error: error.message });
       }
     };
     

const putMethodTimeSheets =async (req,res)=>{
   
  try {
    const employeecode = req?.params?.employeecode;
    const data = req?.body;
 const updatedEmp = await TimeSheets.findOneAndUpdate({ employeecode: employeecode,_id:data._id }, data, { new: true });
 const  getEmpData = await TimeSheets.find({"employeecode":employeecode});
res.status(201).json({
         message: "Updated",
         Results: getEmpData,
         UpdatedData:updatedEmp
        });
   
  } catch (error) {
    res.status(404).json({ error: "Error Posting Employe for Updated"});
  }
    }
const postMethodTimeSheets =async (req,res)=>{
    var data = req?.body;
    try {
        var created = await TimeSheets.create(data);
        const  getEmpData = await TimeSheets.find({"employeecode":data.employeecode});
  res.status(201).json({
           message: "Created",
           createdBy:"Dev Patel",
           created:created,
           Results:getEmpData
          });
  
    } catch (error) {
      res.status(404).json({ error: "Error Posting Employee" });
    }
        }
const deleteMethodTimeSheets =async (req,res)=>{
    let main = req?.params?.employeecode;
    var [id,emp] =main.split("|");
    try {
      const deletedUser = await TimeSheets.deleteOne({ _id: id });
      if (deletedUser.deletedCount == 0) throw Error("User not found");
      const  getEmpData = await TimeSheets.find({"employeecode":emp});
      res.status(200).json({ message: "Employee deleted successfully", user: deletedUser,Results:getEmpData });
    } catch (error) {
      res.status(404).json({ error: "Error deleting Employee"});
    }
    
  }
module.exports={
    getMethodTimeSheets ,
    putMethodTimeSheets ,
    postMethodTimeSheets ,
    deleteMethodTimeSheets 
}