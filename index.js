const express = require("express")
const mongoose = require("mongoose");

const app = express()

app.get('/',(req,res)=>{
   res.send('hello world')
})



mongoose
.connect('mongodb+srv://robin:hitman11@cluster0.dye5y.mongodb.net/products?retryWrites=true&w=majority',{useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
  console.log('connected')

})
.catch(error=>{
  console.log(error)
});

app.listen(5000)