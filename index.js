const express = require("express")
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const usersRoutes = require("./routes/user-routes")


const app = express()


app.use(bodyParser.json());



app.get("/", (req, res) => {
   res.json({ message: "API Working" });
});
app.use("/api/users", usersRoutes );




mongoose
.connect('mongodb+srv://robin:hitman11@cluster0.dye5y.mongodb.net/ecommerce?retryWrites=true&w=majority',{useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
  console.log('connected')

})
.catch(error=>{
  console.log(error)
});

app.listen(5000)