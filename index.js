const express = require("express")
const mongoose = require("mongoose");

const app = express()

app.get('/',(req,res)=>{
   res.send('hello world')
})



mongoose
.connect('mongodb+srv://robin:hitman11@cluster0.dye5y.mongodb.net/products?retryWrites=true&w=majority')
.then(()=>{
  app.listen(5000)
})
.catch(error=>{
  console.log(error)
});