const express = require("express")
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const usersRoutes = require("./routes/user-routes")
const productsRoutes = require("./routes/product-routes")
const path = require('path')

const app = express()


app.use(bodyParser.json());
app.use('/uploads/images',express.static(path.join('uploads','images')));

app.get("/", (req, res) => {
   res.json({ message: "API Working" });
   
});

app.use("/api/users", usersRoutes );
app.use("/api/products", productsRoutes);




mongoose
.connect('mongodb+srv://robin:hitman11@cluster0.dye5y.mongodb.net/ecommerce?retryWrites=true&w=majority',{useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
  console.log('connected')

})
.catch(error=>{
  console.log(error)
});

app.listen(5000)