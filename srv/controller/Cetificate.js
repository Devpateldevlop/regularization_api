const express = require("express");
const Certificates = require("../model/cetificate");
const app = express();
const getMethodCertificate =async (req,res)=>{
    try {
        const employeecode = req?.params?.employeecode;
        var getEmpData;
        if(employeecode){
         getEmpData = await Certificates.find({"employeecode":employeecode});
         if(getEmpData.length === 0){
             return res.status(404).json({error:"Certificate data is missing"});
         }
        }else{
            getEmpData = await Certificates.find();
        }
        if(getEmpData.length > 0){
                 res.status(200).json({message:"Success",Results:getEmpData,createdBy:"Dev Patel"}); 
        }
       } catch (error) {
         res.status(500).json({ error: "Error Getting employee for Get", error: error.message });
       }
     };
     

const putMethodCertificate =async (req,res)=>{
   
  try {
    const employeecode = req?.params?.employeecode;
    const data = req?.body;
 const updatedEmp = await Certificates.findOneAndUpdate({ employeecode: employeecode,_id:data._id }, data, { new: true });
res.status(201).json({
         message: "Updated",
         Emp: updatedEmp
        });
   
  } catch (error) {
    res.status(404).json({ error: "Error Posting Employe for Updated"});
  }
    }
const postMethodCertificate =async (req,res)=>{
    var data = req?.body;
    try {
        var created = await Certificates.create(data);
  res.status(201).json({
           message: "Created",
           createdBy:"Dev Patel",
           created:created
          });
  
    } catch (error) {
      res.status(404).json({ error: "Error Posting Employee" });
    }
        }
const deleteMethodCertificate =async (req,res)=>{
    const employeecode = req?.params?.employeecode;
    try {
      const deletedUser = await Certificates.deleteOne({ employeecode: employeecode });
      if (deletedUser.deletedCount == 0) throw Error("User not found");
      res.status(200).json({ message: "Employee deleted successfully", user: deletedUser });
    } catch (error) {
      res.status(404).json({ error: "Error deleting Employee"});
    }
            }
module.exports={
    getMethodCertificate ,
    putMethodCertificate ,
    postMethodCertificate ,
    deleteMethodCertificate 
}