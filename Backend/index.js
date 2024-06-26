const express=require('express')
const app=express()
require('dotenv').config()
const port=process.env.Port;
const mongoDB=require("./db");
// const mongoDB=require("./test");

mongoDB();
app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin",'https://gofood26.netlify.app')
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With , Content-Type, Accept"
    )
    next()
})
app.use(express.json())
app.use('/api',require('./routes/CreateUser'))
app.use('/api',require('./routes/LoginUser'))
app.use('/api',require('./routes/DisplayData'))
app.use('/api',require('./routes/OrderData'))
app.use('/api',require('./routes/MyOrders'))
app.get('/',(req,res)=>{
    res.send("Hello World!")
})

app.listen(port,()=>{
    console.log(`app listening on post ${port}`)
})
