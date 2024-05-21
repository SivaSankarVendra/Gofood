const express = require("express");
const Orders = require("../models/Orders");
const router = express.Router();

router.post('/orderData',async(req,res)=>{
    let data=req.body.order_data
    await data.splice(0,0,{Order_date:req.body.order_date})

    let eID=await Orders.findOne({email:req.body.email})
    console.log(eID)
    if(eID===null){
        try{
            await Orders.create({
                email:req.body.email,
                order_data:[data]
            }).then(()=>{
                res.status(200).json({success:true})
            })
        }catch(error){
            console.log(error.message)
            res.status(500).send("Server Error",error.message)
        }
    }
    else{
        try{
            await Orders.findOneAndUpdate({email:req.body.email},{$push:{order_data:data}}).then(()=>{
                res.status(200).json({success:true})
            })
        }catch(error){
            console.log(error.message)
            res.status(500).send("Server Error",error.message)
        }
    }
})
module.exports = router;