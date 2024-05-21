const express = require("express");
const Orders = require("../models/Orders");
const router = express.Router();

router.post('/myOrders',async(req,res)=>{
    try{
        let myData=await Orders.findOne({email:req.body.email})
        res.status(200).json({orderData:myData})
    }catch(error){
        res.status(500).send(error.message)
    }
})
module.exports=router