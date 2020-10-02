const express = require("express")
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const usersRoutes = require("./routes/user-routes")
const productsRoutes = require("./routes/product-routes")
const cartRoutes = require("./routes/cart-routes");
const path = require('path')
const app = express()



app.use(bodyParser.json());
app.use('/uploads/images',express.static(path.join('uploads','images')));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');


  next();
});
app.get("/", (req, res) => {
   res.json({ message: "API Working" });
   
});

app.use("/api/users", usersRoutes );
app.use("/api/products", productsRoutes);
app.use("/api/cart",cartRoutes);




mongoose
.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.dye5y.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,{useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
  console.log('connected')

})
.catch(error=>{
  console.log(error)
});

app.listen(5000)